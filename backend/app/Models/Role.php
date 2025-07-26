<?php

namespace App\Models;
    
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    
    class Role extends Model
    {
        use HasFactory;
        protected $fillable = ['name'];
    
        // Relasi: Satu Role bisa dimiliki banyak User
        public function users()
        {
            return $this->hasMany(User::class);
        }
    }
