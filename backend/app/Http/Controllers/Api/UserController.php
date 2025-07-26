<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;

class UserController extends Controller
{
    public function getAgents()
    {
        $agentRole = Role::where('name', 'Agent')->first();
        if (!$agentRole) {
            return response()->json([]);
        }
        return User::where('role_id', $agentRole->id)->select('id', 'name')->get();
    }
}
