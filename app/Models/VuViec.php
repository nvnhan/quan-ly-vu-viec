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
        'ngay_ca_phuong' => 'datetime:d/m/Y',
        'ngay_cqdt' => 'datetime:d/m/Y',
        'ngay_phan_cong' => 'datetime:d/m/Y',
        'ngay_keo_dai' => 'datetime:d/m/Y',
        'ngay_ket_thuc_1' => 'datetime:d/m/Y',
        'ngay_gia_han_xac_minh' => 'datetime:d/m/Y',
        'ngay_ket_thuc_2' => 'datetime:d/m/Y',
        'ngay_phuc_hoi' => 'datetime:d/m/Y',
        'ngay_ket_thuc_phuc_hoi' => 'datetime:d/m/Y',
        'ngay_khoi_to' => 'datetime:d/m/Y',
        'ngay_ket_thuc_dieu_tra' => 'datetime:d/m/Y',
        'ngay_ket_thuc_dieu_tra_1' => 'datetime:d/m/Y',
        'ngay_ket_thuc_dieu_tra_2' => 'datetime:d/m/Y',
        'ngay_ket_thuc_dieu_tra_3' => 'datetime:d/m/Y',
        'ngay_lap_ho_so' => 'datetime:d/m/Y',
        'ngay_dang_ky_ho_so' => 'datetime:d/m/Y',
        'created_at' => 'datetime:d/m/Y',
        'updated_at' => 'datetime:H:i d/m/Y',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'ngay_ca_phuong', 'ngay_cqdt', 'don_vi_chuyen_tin',
        'loai_vu_viec', 'phan_loai_tin',
        'thoi_diem_xay_ra', 'noi_xay_ra',  'noi_dung_tom_tat',
        'ngay_keo_dai', 'ket_qua_giai_quyet', 'ngay_ket_thuc_1', 'ngay_gia_han_xac_minh',
        'ngay_ket_thuc_2', 'ngay_phuc_hoi', 'ngay_ket_thuc_phuc_hoi',
        'ngay_khoi_to', 'ma_toi_danh', 'loai_toi_pham',
        'ngay_ket_thuc_dieu_tra', 'ngay_ket_thuc_dieu_tra_1', 'ngay_ket_thuc_dieu_tra_2', 'ngay_ket_thuc_dieu_tra_3',
        'ket_qua_an', 'phuong_thuc_pham_toi', 'noi_thuc_hien_pham_toi',
        'ngay_lap_ho_so', 'ngay_dang_ky_ho_so', 'so_ho_so',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'dp_xay_ra', 'toi_danh', 'can_bo', 'dtv_chinh', 'can_bo_chinh', 'cong_viecs',
        'tai_lieus', 'cong_vans', 'vu_viec_nguois', 'don_vi'
    ];

    protected $appends = ['sel_dp_xay_ra', 'sel_dtv_chinh', 'sel_can_bo_chinh', 'ten_nguoi_tao', 'ten_don_vi'];

    public function toi_danh()
    {
        return $this->belongsTo('App\Models\ToiDanh', 'ma_toi_danh', 'ma_toi_danh');
    }

    public function dtv_chinh()
    {
        return $this->belongsTo('App\Models\CanBo', 'id_dtv_chinh');
    }

    public function can_bo_chinh()
    {
        return $this->belongsTo('App\Models\CanBo', 'id_can_bo_chinh');
    }

    public function can_bo()
    {
        return $this->belongsTo('App\Models\CanBo', 'nguoi_tao');
    }

    public function cong_viecs()
    {
        return $this->hasMany('App\Models\CongViec', 'id_vu_viec');
    }

    public function tai_lieus()
    {
        return $this->hasMany('App\Models\TaiLieu', 'id_vu_viec');
    }

    public function cong_vans()
    {
        return $this->hasMany('App\Models\CongVan', 'id_vu_viec');
    }

    public function vu_viec_nguois()
    {
        return $this->hasMany('App\Models\VuViecNguoi', 'id_vu_viec');
    }

    /**
     * Đơn vị cấp tổ
     *
     * @return void
     */
    public function don_vi()
    {
        return $this->belongsTo('App\Models\DonVi', 'id_don_vi');
    }

    public function getTenDonViAttribute()
    {
        return $this->don_vi->ten_don_vi_day_du ?? '';
    }

    public function getTenNguoiTaoAttribute()
    {
        if ($this->can_bo)
            return $this->can_bo->ho_ten . ' - ' . $this->can_bo->ten_chuc_vu . ' ' . $this->can_bo->ten_don_vi;
        else return '';
    }

    public function getTenDpXayRaAttribute()
    {
        // $dv = $this->dp_xay_ra;
        // return ($dv->ten_don_vi ?? '') . ' - ' . ($dv->ten_dia_phuong ?? '');
        if (property_exists($this, 'ten_dp_xay_ra'))
            return $this->ten_dp_xay_ra;
        else return '';
    }

    public function setTenDpXayRaAttribute($value)
    {
        $this->ten_dp_xay_ra = $value;
    }

    public function getDpXayRasAttribute()
    {
        return explode(',', $this->dp_xay_ra);
    }

    public function getSelDpXayRaAttribute()
    {
        // $dv = $this->dp_xay_ra;
        // if ($dv) {
        //     $data = [
        //         'value' => $this->id_dp_xay_ra,
        //         'label' => $this->ten_dp_xay_ra,
        //     ];
        //     return (object)$data;
        // } else return null;
        if (property_exists($this, 'sel_dp_xay_ra'))
            return $this->sel_dp_xay_ra;
        else return [];
    }

    public function setSelDpXayRaAttribute($value)
    {
        $this->sel_dp_xay_ra = $value;
    }

    public function getSelDtvChinhAttribute()
    {
        $dv = $this->dtv_chinh;
        if ($dv) {
            $data = [
                'value' => $this->id_dtv_chinh,
                'label' => $dv->ho_ten . ' - ' . $dv->ten_chuc_vu . ' ' . $dv->ten_don_vi
            ];
            return (object)$data;
        } else return null;
    }

    public function getSelCanBoChinhAttribute()
    {
        $dv = $this->can_bo_chinh;
        if ($dv) {
            $data = [
                'value' => $this->id_can_bo_chinh,
                'label' => $dv->ho_ten . ' - ' . $dv->ten_chuc_vu . ' ' . $dv->ten_don_vi
            ];
            return (object)$data;
        } else return null;
    }
}
