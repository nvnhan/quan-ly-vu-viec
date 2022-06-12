<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VuViec extends Model
{
    use HasFactory;

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'ngay_ket_thuc_1' => 'datetime:d/m/Y',
        'ngay_gia_han_xac_minh' => 'datetime:d/m/Y',
        'ngay_ket_thuc_2' => 'datetime:d/m/Y',
        'ngay_phuc_hoi' => 'datetime:d/m/Y',
        'ngay_ket_thuc_phuc_hoi' => 'datetime:d/m/Y',
        'ngay_khoi_to' => 'datetime:d/m/Y',
        'ngay_gia_han' => 'datetime:d/m/Y',
        'ngay_ket_thuc_dieu_tra' => 'datetime:d/m/Y',
        'ngay_dang_ky_ho_so' => 'datetime:d/m/Y',
        'created_at' => 'datetime:d/m/Y',
        'updated_at' => 'datetime:H:i d/m/Y',
    ];

    public function dp_xay_ra()
    {
        return $this->belongsTo('App\DonVi', 'id_dp_xay_ra');
    }

    public function toi_danh()
    {
        return $this->belongsTo('App\ToiDanh', 'ma_toi_danh', 'ma_toi_danh');
    }

    public function dtv_chinh()
    {
        return $this->belongsTo('App\CanBo', 'id_dtv_chinh');
    }

    public function can_bo_chinh()
    {
        return $this->belongsTo('App\CanBo', 'id_can_bo_chinh');
    }

    public function can_bo()
    {
        return $this->belongsTo('App\CanBo', 'nguoi_tao');
    }

    public function cong_viecs()
    {
        return $this->hasMany('App\CongViec', 'id_vu_viec');
    }

    public function tai_lieus()
    {
        return $this->hasMany('App\TaiLieu', 'id_vu_viec');
    }

    public function cong_vans()
    {
        return $this->hasMany('App\CongVan', 'id_vu_viec');
    }

    public function vu_viec_nguois()
    {
        return $this->hasMany('App\VuViecNguoi', 'id_vu_viec');
    }
}
