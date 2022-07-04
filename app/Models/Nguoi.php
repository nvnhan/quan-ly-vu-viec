<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nguoi extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'ho_ten', 'ten_khac', 'gioi_tinh', 'ngay_sinh', 'thang_sinh', 'nam_sinh',
        'noi_sinh', 'thuong_tru', 'tam_tru', 'noi_o_hien_nay',
        'sdt', 'giay_dinh_danh', 'so_dinh_danh', 'noi_cap', 'ngay_cap',
        'quoc_tich', 'dan_toc', 'ton_giao', 'nghe_nghiep', 'noi_lam_viec',
        'ho_ten_bo', 'nam_sinh_bo',   'ho_ten_me', 'nam_sinh_me', 'ho_ten_vo_chong', 'nam_sinh_vo_chong',
        'don_vi_tra_cuu',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'dp_thuong_tru', 'dp_tam_tru', 'dp_noi_o_hien_nay', 'dp_thong_bao'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'ngay_cap' => 'datetime:d/m/Y',
        'created_at' => 'datetime:d/m/Y',
        'updated_at' => 'datetime:H:i d/m/Y',
    ];

    protected $appends = [
        'ngay_sinh_day_du', 'ten_thuong_tru', 'ten_noi_o_hien_nay',
        'sel_dp_thuong_tru', 'sel_dp_tam_tru', 'sel_dp_noi_o_hien_nay', 'sel_dp_thong_bao',
    ];

    public function dp_thuong_tru()
    {
        return $this->belongsTo('App\Models\DonVi', 'id_dp_thuong_tru');
    }

    public function dp_tam_tru()
    {
        return $this->belongsTo('App\Models\DonVi', 'id_dp_tam_tru');
    }

    public function dp_noi_o_hien_nay()
    {
        return $this->belongsTo('App\Models\DonVi', 'id_dp_noi_o_hien_nay');
    }

    public function dp_thong_bao()
    {
        return $this->belongsTo('App\Models\DonVi', 'id_dp_thong_bao');
    }

    public function getNgaySinhDayDuAttribute()
    {
        if (!empty($this->ngay_sinh) && !empty($this->thang_sinh))
            return "$this->ngay_sinh/$this->thang_sinh/$this->nam_sinh";
        else
            return $this->nam_sinh;
    }

    public function getTenThuongTruAttribute()
    {
        if ($this->dp_thuong_tru)
            return $this->thuong_tru . ' - ' . $this->dp_thuong_tru->loai_don_vi . ' ' . $this->dp_thuong_tru->ten_don_vi . ' - ' . $this->dp_thuong_tru->ten_dia_phuong;
        else return $this->thuong_tru;
    }

    public function getTenTamTruAttribute()
    {
        if ($this->dp_tam_tru)
            return $this->tam_tru . ' - ' . $this->dp_tam_tru->loai_don_vi . ' ' . $this->dp_tam_tru->ten_don_vi . ' - ' . $this->dp_tam_tru->ten_dia_phuong;
        else return $this->tam_tru;
    }

    public function getTenNoiOHienNayAttribute()
    {
        if ($this->dp_noi_o_hien_nay)
            return $this->noi_o_hien_nay . ' - ' . $this->dp_noi_o_hien_nay->loai_don_vi . ' ' . $this->dp_noi_o_hien_nay->ten_don_vi . ' - ' . $this->dp_noi_o_hien_nay->ten_dia_phuong;
        else return $this->noi_o_hien_nay;
    }

    public function getSelDpThuongTruAttribute()
    {
        if ($this->dp_thuong_tru)
            return (object)[
                'value' => $this->id_dp_thuong_tru,
                'label' => $this->dp_thuong_tru->loai_don_vi . ' ' . $this->dp_thuong_tru->ten_don_vi . ' - ' . $this->dp_thuong_tru->ten_dia_phuong
            ];
        else
            return null;
    }

    public function getSelDpTamTruAttribute()
    {
        if ($this->dp_tam_tru)
            return (object)[
                'value' => $this->id_dp_tam_tru,
                'label' => $this->dp_tam_tru->loai_don_vi . ' ' . $this->dp_tam_tru->ten_don_vi . ' - ' . $this->dp_tam_tru->ten_dia_phuong
            ];
        else return null;
    }

    public function getSelDpNoiOHienNayAttribute()
    {
        if ($this->dp_noi_o_hien_nay)
            return (object)[
                'value' => $this->id_dp_noi_o_hien_nay,
                'label' => $this->dp_noi_o_hien_nay->loai_don_vi . ' ' . $this->dp_noi_o_hien_nay->ten_don_vi . ' - ' . $this->dp_noi_o_hien_nay->ten_dia_phuong
            ];
        else return null;
    }

    public function getSelDpThongBaoAttribute()
    {
        if ($this->dp_thong_bao)
            return (object)[
                'value' => $this->id_dp_thong_bao,
                'label' => $this->dp_thong_bao->loai_don_vi . ' ' . $this->dp_thong_bao->ten_don_vi . ' - ' . $this->dp_thong_bao->ten_dia_phuong
            ];
        else return null;
    }

    public function getNhanXungAttribute()
    {
        return $this->gioi_tinh === 'Nam' ? 'Ông' : 'Bà';
    }
}
