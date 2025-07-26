<?php

use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;
    
    return new class extends Migration
    {
        public function up(): void
        {
            Schema::create('scorecards', function (Blueprint $table) {
                $table->id();
                $table->foreignId('agent_id')->constrained('users')->onDelete('cascade');
                $table->foreignId('evaluator_id')->constrained('users')->onDelete('cascade');
                $table->date('scorecard_date');
                $table->decimal('overall_score', 5, 2)->nullable();
                $table->text('notes')->nullable();
                $table->timestamps();
    
                $table->unique(['agent_id', 'scorecard_date']);
            });
        }
    
        public function down(): void
        {
            Schema::dropIfExists('scorecards');
        }
    };