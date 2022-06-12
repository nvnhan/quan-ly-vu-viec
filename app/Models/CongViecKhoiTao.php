<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CongViecKhoiTao extends Model
{
    use HasFactory;

    public function nhom_cong_viec()
    {
        return $this->belongsTo('App\NhomCongViec', 'id_nhom_cong_viec');
    }
}
