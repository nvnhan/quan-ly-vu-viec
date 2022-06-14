<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonVi extends Model
{
    use HasFactory;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['id_tam', 'don_vi_truc_thuocs', 'don_vi_cha', 'quan_huyen'];

    protected $appends = ['ten_dia_phuong', 'ten_don_vi_day_du'];

    public function don_vi_truc_thuocs()
    {
        return $this->hasMany('App\Models\DonVi', 'id_don_vi_cha');
    }

    public function don_vi_cha()
    {
        return $this->belongsTo('App\Models\DonVi', 'id_don_vi_cha');
    }

    public function quan_huyen()
    {
        return $this->belongsTo('App\Models\QuanHuyen', 'dia_phuong');
    }

    public function getTenDonViDayDuAttribute()
    {
        if (!empty($this->don_vi_cha))
            return $this->ten_don_vi . ' - CA ' . $this->don_vi_cha->ten_don_vi ?? '';
        else
            return 'CA ' . $this->ten_don_vi;
    }

    public function getTenDiaPhuongAttribute()
    {
        return $this->quan_huyen->ten_huyen_tinh ?? '';
    }
}
