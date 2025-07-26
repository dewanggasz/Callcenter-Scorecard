<?php

namespace App\Models;
    
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    
    class Team extends Model
    {
        use HasFactory;
        protected $fillable = ['name', 'supervisor_id'];
    
        // Relasi: Satu Team memiliki banyak User (anggota tim)
        public function members()
        {
            return $this->hasMany(User::class);
        }
    
        // Relasi: Satu Team diawasi oleh satu User (supervisor)
        public function supervisor()
        {
            return $this->belongsTo(User::class, 'supervisor_id');
        }
    }
