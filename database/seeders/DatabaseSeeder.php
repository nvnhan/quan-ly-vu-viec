<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $cap_bacs = [
            'Hạ sĩ', 'Trung sĩ', 'Thượng sĩ',
            'Thiếu úy', 'Trung úy', 'Thượng úy', 'Đại úy',
            'Thiếu tá', 'Trung tá', 'Thượng tá', 'Đại tá',
            'Thiếu tướng', 'Trung tướng', 'Thượng tướng', 'Đại tướng'
        ];

        foreach ($cap_bacs as $key => $value) {
            DB::table('cap_bacs')->insert(['cap_bac' => $value]);
        }
    }
}
