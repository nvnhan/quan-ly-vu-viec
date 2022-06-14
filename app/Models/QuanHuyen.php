<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuanHuyen extends Model
{
    use HasFactory;

    protected $appends = ['ten_huyen_tinh'];

    public function tinh()
    {
        return $this->belongsTo('App\Models\Tinh', 'id_tinh');
    }

    public function getTenTinhAttribute()
    {
        return $this->tinh->ten_tinh ?? '';
    }

    public function getTenHuyenTinhAttribute()
    {
        return $this->ten_huyen . ' - ' . $this->ten_tinh;
    }
}
