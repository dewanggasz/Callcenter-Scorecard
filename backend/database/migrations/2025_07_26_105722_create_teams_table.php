<?php

use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;
    
    return new class extends Migration
    {
        public function up(): void
        {
            Schema::create('teams', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                // Foreign key untuk supervisor akan ditambahkan di file migration users
                // untuk menghindari circular dependency issues saat migrasi.
                $table->unsignedBigInteger('supervisor_id')->nullable();
                $table->timestamps();
            });
        }
    
        public function down(): void
        {
            Schema::dropIfExists('teams');
        }
    };
