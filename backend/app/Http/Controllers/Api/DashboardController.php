<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Menyediakan ringkasan data untuk dashboard pengguna yang sedang login.
     */
    public function summary(Request $request)
    {
        $user = Auth::user();

        // Nanti, logika di sini akan menjadi lebih kompleks.
        // Kita akan mengambil data dari tabel scorecards berdasarkan role user.
        // - SPV bisa melihat agregat semua tim.
        // - TL bisa melihat agregat timnya.
        // - Agent hanya melihat datanya sendiri.

        // Untuk saat ini, kita kembalikan data dummy terstruktur.
        $data = [
            'kpis' => [
                ['title' => 'Handled Calls', 'value' => '87'],
                ['title' => 'Average Handling Time (AHT)', 'value' => '5:12'],
                ['title' => 'First Call Resolution (FCR)', 'value' => '85%'],
                ['title' => 'Quality Score', 'value' => '92.8%'],
                ['title' => 'CSAT', 'value' => '90%'],
                ['title' => 'Attendance', 'value' => '100%'],
            ],
            'performance_chart' => [
                'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                'data' => [88, 90, 95, 92, 94, 96],
            ]
        ];

        return response()->json($data);
    }
}
