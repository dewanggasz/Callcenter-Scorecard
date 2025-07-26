<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreScorecardRequest;
use App\Models\Scorecard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; // <-- TAMBAHKAN BARIS INI

class ScorecardController extends Controller
{
    use AuthorizesRequests; // <-- DAN TAMBAHKAN BARIS INI

    /**
     * Menampilkan daftar scorecard dengan filter berdasarkan peran.
     */
    public function index()
    {
        $this->authorize('viewAny', Scorecard::class);

        $user = Auth::user();
        $query = Scorecard::with(['agent:id,name', 'evaluator:id,name'])->latest('scorecard_date');

        // Terapkan filter berdasarkan peran pengguna
        if ($user->role->name === 'TL') {
            // Team Leader hanya melihat agent di dalam timnya
            $query->whereHas('agent', function ($q) use ($user) {
                $q->where('team_id', $user->team_id);
            });
        } elseif ($user->role->name === 'Agent') {
            // Agent hanya melihat datanya sendiri
            $query->where('agent_id', $user->id);
        }
        // SPV tidak perlu filter, bisa melihat semua

        return $query->paginate(15);
    }

    /**
     * Menampilkan satu data scorecard spesifik beserta detailnya.
     */
    public function show(Scorecard $scorecard)
    {
        $this->authorize('view', $scorecard);
        return $scorecard->load(['details.kpi', 'agent']);
    }

    /**
     * Menyimpan scorecard baru ke database.
     */
    public function store(StoreScorecardRequest $request)
    {
        $this->authorize('create', Scorecard::class);
        
        $validated = $request->validated();

        try {
            $scorecard = DB::transaction(function () use ($validated) {
                $scorecard = Scorecard::create([
                    'agent_id' => $validated['agent_id'],
                    'scorecard_date' => $validated['scorecard_date'],
                    'notes' => $validated['notes'] ?? null,
                    'evaluator_id' => Auth::id(),
                ]);
                $scorecard->details()->createMany($validated['details']);
                return $scorecard;
            });

            return response()->json([
                'message' => 'Scorecard created successfully.',
                'scorecard' => $scorecard->load('details')
            ], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create scorecard.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Memperbarui data scorecard yang ada.
     */
    public function update(StoreScorecardRequest $request, Scorecard $scorecard)
    {
        $this->authorize('update', $scorecard);
        
        $validated = $request->validated();

        try {
            DB::transaction(function () use ($validated, $scorecard) {
                $scorecard->update([
                    'agent_id' => $validated['agent_id'],
                    'scorecard_date' => $validated['scorecard_date'],
                    'notes' => $validated['notes'] ?? null,
                ]);
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

    /**
     * Menghapus scorecard dari database.
     */
    public function destroy(Scorecard $scorecard)
    {
        $this->authorize('delete', $scorecard);
        
        $scorecard->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
