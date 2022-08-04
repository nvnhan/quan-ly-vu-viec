<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CongVan extends Model
{
    use HasFactory;

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'han_tra_loi' => 'datetime:d/m/Y',
        'ngay_ban_hanh' => 'datetime:d/m/Y',
        'ngay_phan_hoi' => 'datetime:d/m/Y',
        'created_at' => 'datetime:d/m/Y',
        'updated_at' => 'datetime:H:i d/m/Y',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_cong_van_cha', 'tieu_de', 'mo_ta', 'so_hieu', 'ngay_ban_hanh',
        'id_vu_viec', 'co_quan_nhan', 'han_tra_loi',
        'so_cong_van_phan_hoi', 'noi_dung_phan_hoi', 'ngay_phan_hoi'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'can_bo_thu_ly', 'can_bo_tao', 'vu_viec', 'cong_van_cha'
    ];

    protected $appends = ['sel_can_bo', 'ten_nguoi_tao', 'ten_can_bo_thu_ly', 'ten_vu_viec', 'ten_cong_van_cha', 'children'];

    public function can_bo_thu_ly()
    {
        return $this->belongsTo('App\Models\CanBo', 'id_can_bo');
    }

    public function can_bo_tao()
    {
        return $this->belongsTo('App\Models\CanBo', 'nguoi_tao');
    }

    public function vu_viec()
    {
        return $this->belongsTo('App\Models\VuViec', 'id_vu_viec');
    }

    public function cong_van_cha()
    {
        return $this->belongsTo('App\Models\CongVan', 'id_cong_van_cha');
    }

    public function cong_van_don_doc()
    {
        return $this->hasMany('App\Models\CongVan', 'id_cong_van_cha');
    }

    public function getChildrenAttribute()
    {
        if ($this->cong_van_don_doc()->count())
            return $this->cong_van_don_doc;
        else return  null;
    }

    public function getSelCanBoAttribute()
    {
        $dv = $this->can_bo_thu_ly;
        if ($dv) {
            $data = [
                'value' => $dv->id,
                'label' => $dv->ho_ten . ' - ' . $dv->ten_chuc_vu . ' ' . $dv->ten_don_vi
            ];
            return (object)$data;
        } else return null;
    }

    public function getTenNguoiTaoAttribute()
    {
        return $this->can_bo_tao->ho_ten . " (" . $this->can_bo_tao->ten_dang_nhap . ")";
    }

    public function getTenCanBoThuLyAttribute()
    {
        $can_bo_thu_ly = $this->can_bo_thu_ly;
        if ($can_bo_thu_ly)
            return $can_bo_thu_ly->ho_ten . " (" . $can_bo_thu_ly->ten_dang_nhap . ")";
        else return null;
    }

    public function getTenVuViecAttribute()
    {
        return $this->vu_viec->ten_vu_viec ?? '';
    }

    public function getTenCongVanChaAttribute()
    {
        return $this->cong_van_cha->tieu_de ?? '';
    }
}
