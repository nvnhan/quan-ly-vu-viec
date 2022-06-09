<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DinhDanh extends Model
{
    use HasFactory;

    protected $fillable = ['ho_ten', 'gia_tien', 'gia_ban', 'hang_bay', 'f1', 'sdt', 'ghi_chu', 'dinh_danh'];
    // protected $dateFormat = 'd/m/Y';
    protected $casts = [
        'gia_tien' => 'float',
        'gia_ban' => 'float',
        'tinh_trang' => 'boolean',
        'created_at' => 'date:d/m/Y',
    ];
}
