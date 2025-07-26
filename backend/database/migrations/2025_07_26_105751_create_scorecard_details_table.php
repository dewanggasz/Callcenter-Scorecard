<?php

use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;
    
    return new class extends Migration
    {
        public function up(): void
        {
            Schema::create('scorecard_details', function (Blueprint $table) {
                $table->id();
                $table->foreignId('scorecard_id')->constrained('scorecards')->onDelete('cascade');
                $table->foreignId('kpi_id')->constrained('kpis')->onDelete('cascade');
                $table->string('value');
                $table->decimal('score', 5, 2);
                $table->timestamps();
            });
        }
    
        public function down(): void
        {
            Schema::dropIfExists('scorecard_details');
        }
    };
