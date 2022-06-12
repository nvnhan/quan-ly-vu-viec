<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonVi extends Model
{
    use HasFactory;

    public function don_vi_truc_thuocs()
    {
        return $this->hasMany('App\DonVi', 'id_don_vi_cha');
    }

    public function don_vi_cha()
    {
        return $this->belongsTo('App\DonVi', 'id_don_vi_cha');
    }

    public function quan_huyen()
    {
        return $this->belongsTo('App\QuanHuyen', 'dia_phuong');
    }
}