<?php

namespace App\Exports;

use App\Models\Scorecard;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ScorecardsExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        // Ambil semua data yang dibutuhkan, sama seperti di controller
        return Scorecard::with(['agent', 'evaluator', 'details.kpi'])->get();
    }

    /**
     * Mendefinisikan judul untuk setiap kolom.
     */
    public function headings(): array
    {
        // Kolom dasar + semua nama KPI
        $kpiHeadings = \App\Models\Kpi::pluck('name')->toArray();
        return array_merge(
            ['Tanggal', 'Nama Agent', 'Evaluator', 'Catatan'],
            $kpiHeadings
        );
    }

    /**
     * Memetakan data dari setiap scorecard ke baris di Excel.
     */
    public function map($scorecard): array
    {
        // Buat array asosiatif dari detail untuk pencarian cepat
        $details = $scorecard->details->keyBy('kpi_id');
        $kpis = \App\Models\Kpi::all();

        $kpiValues = [];
        foreach ($kpis as $kpi) {
            // Jika ada detail untuk KPI ini, gunakan nilainya, jika tidak, kosongkan
            $kpiValues[] = $details->has($kpi->id) ? $details[$kpi->id]->value : '-';
        }

        return array_merge(
            [
                $scorecard->scorecard_date,
                $scorecard->agent->name,
                $scorecard->evaluator->name,
                $scorecard->notes,
            ],
            $kpiValues
        );
    }
}
