<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CongViecKhoiTao extends Model
{
    use HasFactory;
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'loai_vu_viec', 'id_nhom_cong_viec',
        'ten_cong_viec', 'thoi_han',
    ];

    protected $appends = ['ten_nhom_cong_viec'];

    public function nhom_cong_viec()
    {
        return $this->belongsTo('App\Models\NhomCongViec', 'id_nhom_cong_viec');
    }

    public function getTenNhomCongViecAttribute()
    {
        return $this->nhom_cong_viec->nhom_cong_viec ?? 'Chưa phân loại';
    }
}
