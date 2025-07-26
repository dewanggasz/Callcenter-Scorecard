<?php

namespace App\Models;
    
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Foundation\Auth\User as Authenticatable;
    use Illuminate\Notifications\Notifiable;
    use Laravel\Sanctum\HasApiTokens;
    
    class User extends Authenticatable
    {
        use HasApiTokens, HasFactory, Notifiable;
    
        protected $fillable = [
            'name', 'email', 'password', 'role_id', 'team_id',
        ];
    
        protected $hidden = [
            'password', 'remember_token',
        ];
    
        protected $casts = [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    
        // Relasi: Seorang User memiliki satu Role
        public function role()
        {
            return $this->belongsTo(Role::class);
        }
    
        // Relasi: Seorang User (Agent/TL) milik satu Team
        public function team()
        {
            return $this->belongsTo(Team::class);
        }
    
        // Relasi: Seorang User (SPV) bisa mengepalai banyak Team
        public function supervisedTeams()
        {
            return $this->hasMany(Team::class, 'supervisor_id');
        }
    
        // Relasi: Seorang User (Agent) memiliki banyak Scorecard
        public function scorecards()
        {
            return $this->hasMany(Scorecard::class, 'agent_id');
        }
    }
