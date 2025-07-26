<?php

use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;
    
    return new class extends Migration
    {
        public function up(): void
        {
            Schema::create('kpis', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->text('description')->nullable();
                $table->enum('target_type', ['numeric', 'percentage', 'time_seconds'])->default('numeric');
                $table->timestamps();
            });
        }
    
        public function down(): void
        {
            Schema::dropIfExists('kpis');
        }
    };
