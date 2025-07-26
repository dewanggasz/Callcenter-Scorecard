<?php

namespace App\Models;
    
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    
    class ScorecardDetail extends Model
    {
        use HasFactory;
        protected $fillable = ['scorecard_id', 'kpi_id', 'value', 'score'];
    
        // Relasi: Detail ini milik satu KPI
        public function kpi()
        {
            return $this->belongsTo(Kpi::class);
        }
    }
