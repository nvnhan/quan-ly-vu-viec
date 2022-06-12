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

    protected $appends = ['ten_trang_thai', 'ten_muc_do_uu_tien'];

    public function can_bo_thu_ly()
    {
        return $this->belongsTo('App\CanBo', 'id_can_bo');
    }

    public function can_bo_tao()
    {
        return $this->belongsTo('App\CanBo', 'nguoi_tao');
    }

    public function getTenTrangThaiAttribute()
    {
        return self::TEN_TRANG_THAI[$this->trang_thai];
    }

    public function getTenMucDoUuTienAttribute()
    {
        return self::TEN_MUC_DO_UU_TIEN[$this->muc_do_uu_tien];
    }
}
