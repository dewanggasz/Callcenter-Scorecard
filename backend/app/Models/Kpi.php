<?php

namespace App\Models;
    
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    
    class Kpi extends Model
    {
        use HasFactory;
        protected $fillable = ['name', 'description', 'target_type'];
    }