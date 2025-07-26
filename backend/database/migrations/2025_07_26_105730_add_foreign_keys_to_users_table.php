<?php

use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;
    
    return new class extends Migration
    {
        public function up(): void
        {
            Schema::table('users', function (Blueprint $table) {
                $table->foreignId('role_id')->after('password')->constrained('roles');
                $table->foreignId('team_id')->after('role_id')->nullable()->constrained('teams')->onDelete('set null');
            });
    
            Schema::table('teams', function (Blueprint $table) {
                // Sekarang aman untuk menambahkan foreign key supervisor_id
                $table->foreign('supervisor_id')->references('id')->on('users')->onDelete('set null');
            });
        }
    
        public function down(): void
        {
            Schema::table('users', function (Blueprint $table) {
                $table->dropForeign(['role_id']);
                $table->dropForeign(['team_id']);
                $table->dropColumn(['role_id', 'team_id']);
            });
    
            Schema::table('teams', function (Blueprint $table) {
                $table->dropForeign(['supervisor_id']);
                $table->dropColumn('supervisor_id');
            });
        }
    };