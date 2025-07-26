<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ExportImportController;
use App\Http\Controllers\Api\KpiController;
use App\Http\Controllers\Api\ScorecardController;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Di sinilah Anda dapat mendaftarkan rute API untuk aplikasi Anda. Rute-rute
| ini dimuat oleh RouteServiceProvider dan semuanya akan
| ditugaskan ke grup middleware "api". Buat sesuatu yang hebat!
|
*/

// Rute publik yang tidak memerlukan otentikasi
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rute yang dilindungi dan memerlukan otentikasi Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Rute Otentikasi
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rute Dashboard
    Route::get('/dashboard', [DashboardController::class, 'summary']);

    // Rute untuk mendapatkan data master (untuk form)
    Route::get('/kpis', [KpiController::class, 'index']);
    Route::get('/users/agents', [UserController::class, 'getAgents']);

    // Rute Resource untuk Scorecard (CRUD)
    Route::get('/scorecards', [ScorecardController::class, 'index']);
    Route::get('/scorecards/{scorecard}', [ScorecardController::class, 'show']);
    Route::post('/scorecards', [ScorecardController::class, 'store']);
    Route::put('/scorecards/{scorecard}', [ScorecardController::class, 'update']);
    Route::delete('/scorecards/{scorecard}', [ScorecardController::class, 'destroy']);

    // Rute untuk Export & Import
    Route::get('/export/excel', [ExportImportController::class, 'exportExcel']);
    Route::get('/export/pdf', [ExportImportController::class, 'exportPdf']);
    Route::post('/import/excel', [ExportImportController::class, 'importExcel']);
});
