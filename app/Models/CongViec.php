<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CongViec extends Model
{
    use HasFactory;

    const TEN_TRANG_THAI = [
        'Mới tạo',
        'Mới giao',
        'Đã tiếp nhận',
        'Đang thực hiện',
        'Đã thực hiện',
        'Đã xác nhận',
        'Đã hoàn thành'
    ];

    const TEN_MUC_DO_UU_TIEN = [
        'Thấp',
        'Bình thường',
        'Cao',
        'Khẩn'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'ngay_giao' => 'datetime:d/m/Y',
        'ngay_het_han' => 'datetime:d/m/Y',
        'ngay_bat_dau' => 'datetime:d/m/Y',
        'ngay_ket_thuc' => 'datetime:d/m/Y',
        'ngay_xac_nhan' => 'datetime:d/m/Y',
        'ngay_hoan_thanh' => 'datetime:d/m/Y',
        'created_at' => 'datetime:d/m/Y',
        'updated_at' => 'datetime:H:i d/m/Y',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_vu_viec', 'id_nhom_cong_viec',
        'ten_cong_viec', 'noi_dung', 'muc_do_uu_tien',
        'ngay_het_han', 'trang_thai', 'ket_qua',  'phe_duyet',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'can_bo_thu_ly', 'nhom_cong_viec', 'can_bo_tao'
    ];

    protected $appends = ['ten_nguoi_tao', 'ten_can_bo_thu_ly', 'sel_can_bo', 'ten_nhom_cong_viec'];

    public function can_bo_thu_ly()
    {
        return $this->belongsTo('App\Models\CanBo', 'id_can_bo');
    }

    public function can_bo_tao()
    {
        return $this->belongsTo('App\Models\CanBo', 'nguoi_tao');
    }

    public function nhom_cong_viec()
    {
        return $this->belongsTo('App\Models\NhomCongViec', 'id_nhom_cong_viec');
    }

    public function getTenNhomCongViecAttribute()
    {
        return $this->nhom_cong_viec->nhom_cong_viec ?? 'Chưa phân loại';
    }

    public function getTenTrangThaiAttribute()
    {
        return self::TEN_TRANG_THAI[$this->trang_thai];
    }

    public function getTenMucDoUuTienAttribute()
    {
        return self::TEN_MUC_DO_UU_TIEN[$this->muc_do_uu_tien];
    }

    public function getSelCanBoAttribute()
    {
        $dv = $this->can_bo_thu_ly;
        if ($dv) {
            $data = [
                'value' => $this->id_can_bo,
                'label' => $dv->ho_ten . ' - ' . $dv->ten_chuc_vu . ' ' . $dv->ten_don_vi
            ];
            return (object)$data;
        } else return null;
    }

    public function getTenNguoiTaoAttribute()
    {
        return $this->can_bo_tao->ho_ten . ' (' . $this->can_bo_tao->ten_dang_nhap . ')';
    }

    public function getTenCanBoThuLyAttribute()
    {
        $dv = $this->can_bo_thu_ly;
        if ($dv) return $dv->ho_ten . ' (' . $dv->ten_dang_nhap . ')';
        else return null;
    }
}
