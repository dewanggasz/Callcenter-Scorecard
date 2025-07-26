<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Handle user registration.
     */
    public function register(RegisterRequest $request)
    {
        // Ambil data yang sudah divalidasi
        $validatedData = $request->validated();

        // Buat user baru
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role_id' => $validatedData['role_id'],
            'team_id' => $validatedData['team_id'] ?? null,
        ]);

        // Berikan respons
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], Response::HTTP_CREATED);
    }

    /**
     * Handle user login.
     */
    public function login(LoginRequest $request)
    {
        // Coba otentikasi user
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Dapatkan user yang berhasil login
        $user = User::where('email', $request['email'])->firstOrFail();

        // Buat token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Sertakan informasi peran dalam respons
        $user->load('role');

        // Berikan respons dengan token dan data user
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    /**
     * Handle user logout.
     */
    public function logout(Request $request)
    {
        // Hapus token saat ini
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get authenticated user data.
     */
    public function user(Request $request)
    {
        // Mengambil user yang sedang terotentikasi beserta rolenya
        return $request->user()->load('role');
    }
}
