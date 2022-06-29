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

        // DB::table('cap_bacs')->truncate();

        foreach ($cap_bacs as $key => $value) {
            DB::table('cap_bacs')->insert([
                'id' => $key + 1,
                'cap_bac' => $value
            ]);
        }

        DB::table('can_bos')->insert([
            'ho_ten' => 'Ngô Nhận',
            'id_cap_bac' => 6,
            'chuc_vu' => 9,
            'id_don_vi' => 1,
            'ten_dang_nhap' => 'nhannv',
            'mat_khau' => '$2y$10$bBdq06TyrKWHworMe1ASSeVcQPyvsJeznnhItGULE70VMECL7WK5S',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}

// @D...0306
