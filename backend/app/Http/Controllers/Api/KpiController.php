<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kpi;

class KpiController extends Controller
{
    public function index()
    {
        return Kpi::all();
    }
}
