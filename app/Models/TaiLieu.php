<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaiLieu extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_vu_viec', 'id_cong_viec', 'ten_tai_lieu', 'noi_dung'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['vu_viec', 'cong_viec', 'can_bo'];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime:d/m/Y',
        'updated_at' => 'datetime:H:i d/m/Y',
    ];

    protected $appends = ['ten_cong_viec', 'ten_vu_viec', 'ten_nguoi_tao',];

    public function can_bo()
    {
        return $this->belongsTo('App\Models\CanBo', 'nguoi_tao');
    }

    public function vu_viec()
    {
        return $this->belongsTo('App\Models\VuViec', 'id_vu_viec');
    }

    public function cong_viec()
    {
        return $this->belongsTo('App\Models\CongViec', 'id_cong_viec');
    }

    public function getTenNguoiTaoAttribute()
    {
        return $this->can_bo->ho_ten . " (" . $this->can_bo->ten_dang_nhap . ")";
    }

    public function getTenVuViecAttribute()
    {
        return $this->vu_viec->ten_vu_viec ?? '';
    }

    public function getTenCongViecAttribute()
    {
        return $this->cong_viec->ten_cong_viec ?? '';
    }
}
