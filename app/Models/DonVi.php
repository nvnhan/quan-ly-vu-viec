<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonVi extends Model
{
    use HasFactory;
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'ten_don_vi', 'loai_don_vi',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['id_tam', 'don_vi_truc_thuocs', 'don_vi_cha', 'quan_huyen'];

    protected $appends = ['ten_dia_phuong', 'ten_don_vi_day_du', 'ten_don_vi_cha', 'sel_don_vi_cha'];

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

    public function getSelDonViChaAttribute()
    {
        $data = [
            'value' => $this->id_don_vi_cha,
            'label' => $this->ten_don_vi_cha
        ];
        if (empty($this->don_vi_cha)) {
            $data['value'] = null;
            $data['label'] = '';
        }
        return (object)$data;
    }

    public function getTenDonViChaAttribute()
    {
        if (empty($this->don_vi_cha))
            return 'CA ' . $this->ten_dia_phuong;       // CA huyen
        else if (in_array($this->don_vi_cha->loai_don_vi, ['Xã', 'Phường', 'Thị trấn']))
            return 'CA ' . $this->don_vi_cha->ten_don_vi . ' - ' . $this->don_vi_cha->ten_dia_phuong;
        else return $this->don_vi_cha->ten_don_vi . ' - CA ' . $this->don_vi_cha->ten_dia_phuong;
    }

    public function getTenDonViDayDuAttribute()
    {
        if (in_array($this->loai_don_vi, ['Xã', 'Phường', 'Thị trấn']))
            return 'CA ' . $this->ten_don_vi . ' - ' . $this->ten_dia_phuong;
        else
            return $this->ten_don_vi . ' - ' . $this->ten_don_vi_cha;
    }

    public function getTenDiaPhuongAttribute()
    {
        return $this->quan_huyen->ten_huyen_tinh ?? '';
    }
}
