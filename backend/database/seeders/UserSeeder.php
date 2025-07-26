<?php

 namespace Database\Seeders;
    
    use Illuminate\Database\Seeder;
    use App\Models\User;
    use App\Models\Role;
    use Illuminate\Support\Facades\Hash;
    
    class UserSeeder extends Seeder
    {
        public function run(): void
        {
            // Cari ID role SPV
            $spvRole = Role::where('name', 'SPV')->first();
    
            // Buat user SPV default
            if ($spvRole) {
                User::create([
                    'name' => 'Supervisor Admin',
                    'email' => 'spv@example.com',
                    'password' => Hash::make('password'), // Ganti dengan password yang aman
                    'role_id' => $spvRole->id,
                ]);
            }
        }
    }
