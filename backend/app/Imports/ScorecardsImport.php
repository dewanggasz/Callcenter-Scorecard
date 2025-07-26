<?php

namespace App\Imports;

use App\Models\Scorecard;
use App\Models\User;
use App\Models\Kpi;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ScorecardsImport implements ToCollection, WithHeadingRow
{
    private $kpis;
    private $agents;

    public function __construct()
    {
        // Ambil data master sekali saja untuk efisiensi
        $this->kpis = Kpi::all()->keyBy('name');
        $this->agents = User::whereHas('role', function ($q) {
            $q->where('name', 'Agent');
        })->get()->keyBy('name');
    }

    public function collection(Collection $rows)
    {
        foreach ($rows as $row) 
        {
            // Validasi data dasar per baris
            $validator = Validator::make($row->toArray(), [
                'tanggal' => 'required|date_format:Y-m-d',
                'nama_agent' => 'required|string',
            ]);

            if ($validator->fails()) {
                // Lewati baris ini jika data dasar tidak valid
                continue;
            }

            // Cari agent berdasarkan nama
            $agent = $this->agents->get($row['nama_agent']);
            if (!$agent) {
                // Lewati jika agent tidak ditemukan
                continue;
            }

            // Buat scorecard utama
            $scorecard = Scorecard::create([
                'agent_id' => $agent->id,
                'scorecard_date' => $row['tanggal'],
                'notes' => $row['catatan'] ?? null,
                'evaluator_id' => Auth::id(),
            ]);

            // Proses setiap detail KPI
            foreach ($this->kpis as $kpiName => $kpi) {
                // Ubah nama KPI menjadi format heading (lowercase, underscore)
                $heading = str_replace(' ', '_', strtolower($kpiName));
                
                if (isset($row[$heading]) && $row[$heading] !== null) {
                    $scorecard->details()->create([
                        'kpi_id' => $kpi->id,
                        'value' => $row[$heading],
                        // Asumsikan kolom skor juga ada dengan format 'skor_nama_kpi'
                        'score' => $row['skor_' . $heading] ?? 0,
                    ]);
                }
            }
        }
    }
}
