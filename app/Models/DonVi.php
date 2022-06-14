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
    protected $hidden = ['id_tam'];

    protected $appends = ['ten_dia_phuong'];

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

    public function getTenDiaPhuongAttribute()
    {
        $qh = $this->quan_huyen()->first();
        return $qh->ten_huyen_tinh ?? '';
    }
}
