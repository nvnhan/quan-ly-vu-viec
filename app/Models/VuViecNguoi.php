<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VuViecNguoi extends Model
{
    use HasFactory;

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'ngay_xay_ra' => 'datetime:d/m/Y',
        'ngay_bat' => 'datetime:d/m/Y',
        'ngay_tam_giu' => 'datetime:d/m/Y',
        'ngay_tam_giam' => 'datetime:d/m/Y',
        'ngay_gia_han_tam_giam_1' => 'datetime:d/m/Y',
        'ngay_gia_han_tam_giam_2' => 'datetime:d/m/Y',
        'ngay_khoi_to' => 'datetime:d/m/Y',
        'created_at' => 'datetime:d/m/Y',
        'updated_at' => 'datetime:H:i d/m/Y',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tu_cach_to_tung', 'hanh_vi', 'loi_khai',
        'ma_toi_danh_bc', 'ngay_xay_ra_bc', 'noi_xay_ra_bc',
        'ngay_bat', 'truong_hop_bat',
        'ngay_tam_giu', 'thoi_han_gia_han_tam_giu_1', 'thoi_han_gia_han_tam_giu_2',
        'ngay_tam_giam', 'thoi_han_giam', 'ngay_khoi_to_bc',
        'ngay_gia_han_tam_giam_1', 'thoi_han_gia_han_giam_1',
        'ngay_gia_han_tam_giam_2', 'thoi_han_gia_han_giam_2'
    ];

    public function toi_danh_bc()
    {
        return $this->belongsTo('App\Models\ToiDanh', 'ma_toi_danh_bc', 'ma_toi_danh');
    }

    public function nguoi()
    {
        return $this->belongsTo('App\Models\Nguoi', 'id_nguoi');
    }

    public function vu_viec()
    {
        return $this->belongsTo('App\Models\VuViec', 'id_vu_viec');
    }
}
