<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreScorecardRequest;
use App\Models\Scorecard;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;

class ScorecardController extends Controller
{
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
}