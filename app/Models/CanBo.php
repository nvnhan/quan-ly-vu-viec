<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class CanBo extends Authenticatable
{
    use Notifiable, HasApiTokens;

    const TEN_CHUC_VU = [
        'Cán bộ',
        'Đội phó',
        'Tổng hợp đội',
        'Đội trưởng',
        'Giúp việc PTT',
        'Lãnh đạo',
        9 => 'Quản trị viên'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'ho_ten', 'ten_dang_nhap',
        'id_cap_bac', 'chuc_vu',
        'dieu_tra_vien', 'id_don_vi',
        'sdt', 'dia_chi',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'mat_khau',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'dieu_tra_vien' => "boolean",
        'dang_nhap_cuoi' => 'datetime:H:i d/m/Y',
        'created_at' => 'datetime:d/m/Y',
        'updated_at' => 'datetime:H:i d/m/Y',
    ];

    protected $appends = ['ten_chuc_vu', 'admin'];

    public function cap_bac()
    {
        return $this->belongsTo('App\Models\CapBac', 'id_cap_bac');
    }

    public function don_vi()
    {
        return $this->belongsTo('App\Models\DonVi', 'id_don_vi');
    }

    public function cong_viec_nhans()
    {
        return $this->hasMany('App\Models\CongViec', 'id_can_bo');
    }

    public function getAdminAttribute()
    {
        return $this->chuc_vu === 9;
    }

    public function getTenChucVuAttribute()
    {
        return self::TEN_CHUC_VU[$this->chuc_vu];
    }

    /**
     * Find the user instance for the given username.
     *
     * @param  string  $username
     * @return \App\User
     */
    public function findForPassport($username)
    {
        return $this->where('ten_dang_nhap', $username)->first();
    }
}
