<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreScorecardRequest;
use App\Models\Scorecard;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ScorecardController extends Controller
{

    public function index()
    {
        // Ambil semua scorecard, diurutkan dari yang terbaru.
        // Gunakan `with()` untuk memuat relasi agent dan evaluator secara efisien.
        $scorecards = Scorecard::with(['agent:id,name', 'evaluator:id,name'])
                                ->latest('scorecard_date')
                                ->paginate(15); // Menggunakan paginasi

        return $scorecards;
    }
    public function store(StoreScorecardRequest $request)
    {
        $validated = $request->validated();

        try {
            // Gunakan transaksi database untuk memastikan integritas data
            $scorecard = DB::transaction(function () use ($validated) {
                // 1. Buat record Scorecard utama
                $scorecard = Scorecard::create([
                    'agent_id' => $validated['agent_id'],
                    'scorecard_date' => $validated['scorecard_date'],
                    'notes' => $validated['notes'] ?? null,
                    'evaluator_id' => Auth::id(),
                    // overall_score bisa dihitung di sini jika perlu
                ]);

                // 2. Buat record ScorecardDetail untuk setiap KPI
                $scorecard->details()->createMany($validated['details']);
                
                return $scorecard;
            });

            return response()->json([
                'message' => 'Scorecard created successfully.',
                'scorecard' => $scorecard->load('details') // Muat relasi untuk respons
            ], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            // Jika terjadi error, kembalikan respons error
            return response()->json([
                'message' => 'Failed to create scorecard.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Menampilkan satu data scorecard spesifik beserta detailnya.
     */
    public function show(Scorecard $scorecard)
    {
        // Muat relasi yang dibutuhkan oleh form edit
        return $scorecard->load(['details.kpi', 'agent']);
    }

    /**
     * Memperbarui data scorecard yang ada.
     */
    public function update(StoreScorecardRequest $request, Scorecard $scorecard)
    {
        $validated = $request->validated();

        try {
            DB::transaction(function () use ($validated, $scorecard) {
                // 1. Update record Scorecard utama
                $scorecard->update([
                    'agent_id' => $validated['agent_id'],
                    'scorecard_date' => $validated['scorecard_date'],
                    'notes' => $validated['notes'] ?? null,
                ]);

                // 2. Hapus detail lama dan buat yang baru (sinkronisasi)
                $scorecard->details()->delete();
                $scorecard->details()->createMany($validated['details']);
            });

            return response()->json([
                'message' => 'Scorecard updated successfully.',
                'scorecard' => $scorecard->load('details')
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update scorecard.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Scorecard $scorecard)
    {
        // Di masa depan, kita bisa menambahkan otorisasi di sini
        // untuk memastikan hanya user yang berhak yang bisa menghapus.
        // Contoh: if (Auth::user()->cannot('delete', $scorecard)) { abort(403); }

        $scorecard->delete();

        // Kembalikan respons 204 No Content yang menandakan sukses
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}