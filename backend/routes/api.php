<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\KpiController; // Impor KpiController
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ScorecardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (membutuhkan autentikasi)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/dashboard', [DashboardController::class, 'summary']);

    // Route untuk mendapatkan data master
    Route::get('/kpis', [KpiController::class, 'index']);
    Route::get('/users/agents', [UserController::class, 'getAgents']);

    // Route scorecard 
    Route::get('/scorecards', [ScorecardController::class, 'index']);
    Route::post('/scorecards', [ScorecardController::class, 'store']);
    Route::delete('/scorecards/{scorecard}', [ScorecardController::class, 'destroy']);
    // Route lain yang terlindungi akan ditambahkan di sini
});

