<?php

namespace App\Models;
    
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    
    class Scorecard extends Model
    {
        use HasFactory;
        protected $fillable = ['agent_id', 'evaluator_id', 'scorecard_date', 'overall_score', 'notes'];
    
        // Relasi: Scorecard milik seorang Agent
        public function agent()
        {
            return $this->belongsTo(User::class, 'agent_id');
        }
    
        // Relasi: Scorecard dievaluasi oleh seorang Evaluator
        public function evaluator()
        {
            return $this->belongsTo(User::class, 'evaluator_id');
        }
    
        // Relasi: Scorecard memiliki banyak Detail
        public function details()
        {
            return $this->hasMany(ScorecardDetail::class);
        }
    }