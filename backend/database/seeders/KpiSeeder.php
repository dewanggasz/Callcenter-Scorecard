<?php

namespace Database\Seeders;
    
    use Illuminate\Database\Seeder;
    use App\Models\Kpi;
    
    class KpiSeeder extends Seeder
    {
        public function run(): void
        {
            $kpis = [
                ['name' => 'Handled Calls', 'target_type' => 'numeric'],
                ['name' => 'Average Handling Time (AHT)', 'target_type' => 'time_seconds'],
                ['name' => 'After Call Work (ACW)', 'target_type' => 'time_seconds'],
                ['name' => 'First Call Resolution (FCR)', 'target_type' => 'percentage'],
                ['name' => 'Quality Assurance Score', 'target_type' => 'percentage'],
                ['name' => 'Customer Satisfaction (CSAT)', 'target_type' => 'percentage'],
                ['name' => 'Attendance', 'target_type' => 'percentage'],
                ['name' => 'Compliance', 'target_type' => 'percentage'],
            ];
    
            foreach ($kpis as $kpi) {
                Kpi::create($kpi);
            }
        }
    }
