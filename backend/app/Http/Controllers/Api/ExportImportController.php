<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Exports\ScorecardsExport;
use App\Imports\ScorecardsImport;
use App\Models\Scorecard;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class ExportImportController extends Controller
{
    public function exportExcel()
    {
        // Nama file yang akan diunduh
        $fileName = 'scorecards-' . now()->format('Y-m-d') . '.xlsx';
        
        // Panggil kelas export kita dan unduh file
        return Excel::download(new ScorecardsExport, $fileName);
    }

    public function exportPdf()
    {
        // Ambil data yang sama seperti yang ditampilkan di halaman daftar
        $scorecards = Scorecard::with(['agent', 'evaluator'])->latest('scorecard_date')->get();

        // Muat view Blade dengan data, lalu buat PDF
        $pdf = Pdf::loadView('exports.scorecards', ['scorecards' => $scorecards]);

        // Unduh file PDF
        return $pdf->download('scorecards-' . now()->format('Y-m-d') . '.pdf');
    }

    public function importExcel(Request $request)
        {
            // Validasi diubah untuk hanya menerima file CSV
            $request->validate([
                'file' => 'required|mimes:csv,txt'
            ]);

            try {
                // Library Maatwebsite/excel bisa menangani CSV dengan kelas Import yang sama
                Excel::import(new ScorecardsImport, $request->file('file'));
                
                return response()->json(['message' => 'Data dari file CSV berhasil diimpor.'], Response::HTTP_OK);

            } catch (\Exception $e) {
                Log::error('Import CSV Gagal: ' . $e->getMessage() . ' di ' . $e->getFile() . ':' . $e->getLine());
                
                return response()->json([
                    'message' => 'Terjadi kesalahan saat memproses file CSV.', 
                    'error' => $e->getMessage()
                ], 500);
            }
        }
}
