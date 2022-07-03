<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VuViecNguoi extends Model
{
    use HasFactory;

    const TU_CACH_TO_TUNG = [
        1 => 'Người bị tố giác',
        2 => 'Người bị kiến nghị khởi tố',
        3 => 'Người bị giữ trong trường hợp khẩn cấp',
        4 => 'Người bị bắt',
        5 => 'Người bị tạm giữ',
        6 => 'Bị can',
        7 => 'Người tố giác, báo tin về tội phạm, kiến nghị khởi tố',
        8 => 'Bị hại',
        9 => 'Người có quyền lợi, nghĩa vụ liên quan đến vụ án',
        10 => 'Người làm chứng',
        11 => 'Người chứng kiến',
        12 => 'Người liên quan khác',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'ngay_xay_ra_bc' => 'datetime:d/m/Y',
        'ngay_bat' => 'datetime:d/m/Y',
        'ngay_tam_giu' => 'datetime:d/m/Y',
        'ngay_tam_giam' => 'datetime:d/m/Y',
        'ngay_khoi_to_bc' => 'datetime:d/m/Y',
        'ngay_ket_thuc_tam_giam' => 'datetime:d/m/Y',
        'ngay_ket_thuc_tam_giam_1' => 'datetime:d/m/Y',
        'ngay_ket_thuc_tam_giam_2' => 'datetime:d/m/Y',
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
        'ngay_tam_giu',
        'ngay_tam_giam', 'ngay_khoi_to_bc',
        'so_ngay_tam_giu', 'so_ngay_tam_giu_1', 'so_ngay_tam_giu_2',
        'ngay_ket_thuc_tam_giam', 'ngay_ket_thuc_tam_giam_1', 'ngay_ket_thuc_tam_giam_2'
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

    public function getTenTuCachToTungAttribute()
    {
        return self::TU_CACH_TO_TUNG[$this->tu_cach_to_tung];
    }
}
