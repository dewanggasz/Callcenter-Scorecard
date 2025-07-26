<?php

namespace App\Policies;

use App\Models\Scorecard;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ScorecardPolicy
{
    /**
    * Memberikan hak super-admin kepada SPV untuk melakukan apa saja.
    */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->role->name === 'SPV') {
            return true;
        }
        return null; // Lanjutkan ke pemeriksaan aturan lain
    }

    /**
    * Menentukan apakah pengguna bisa melihat daftar scorecard.
    */
    public function viewAny(User $user): bool
    {
        // Semua peran (SPV, TL, Agent) boleh melihat daftar scorecard (datanya akan difilter di controller).
        return true;
    }

    /**
    * Menentukan apakah pengguna bisa melihat satu scorecard spesifik.
    */
    public function view(User $user, Scorecard $scorecard): bool
    {
        // TL bisa melihat jika agent ada di timnya.
        if ($user->role->name === 'TL') {
            return $user->team_id === $scorecard->agent->team_id;
        }

        // Agent hanya bisa melihat scorecard miliknya sendiri.
        if ($user->role->name === 'Agent') {
            return $user->id === $scorecard->agent_id;
        }
        
        return false; // Jika bukan SPV, TL, atau Agent pemilik, maka tidak boleh.
    }

    /**
    * Menentukan apakah pengguna bisa membuat scorecard.
    */
    public function create(User $user): bool
    {
        // Hanya SPV dan TL yang boleh membuat scorecard.
        return in_array($user->role->name, ['SPV', 'TL']);
    }

    /**
    * Menentukan apakah pengguna bisa memperbarui scorecard.
    */
    public function update(User $user, Scorecard $scorecard): bool
    {
        // TL bisa mengedit jika agent ada di timnya.
        if ($user->role->name === 'TL') {
            return $user->team_id === $scorecard->agent->team_id;
        }
        return false;
    }

    /**
    * Menentukan apakah pengguna bisa menghapus scorecard.
    */
    public function delete(User $user, Scorecard $scorecard): bool
    {
        // TL bisa menghapus jika agent ada di timnya.
        if ($user->role->name === 'TL') {
            return $user->team_id === $scorecard->agent->team_id;
        }
        return false;
    }
}
