<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'password',
        'ho_ten', 'sdt', 'dia_chi', 'so_ket_qua',
        'ngay_het_han', 'them_moi',
        'phan_quyen', 'actived',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'actived' => "boolean",
        'them_moi' => "boolean",
        'ngay_het_han' => 'datetime:d/m/Y',
        'created_at' => 'datetime:d/m/Y',
        'updated_at' => 'datetime:H:i d/m/Y',
        'phan_quyen' => 'integer'
    ];

    protected $appends = ['admin', 'quyen', 'roles', 'so_dinh_danh'];

    public function dinh_danhs()
    {
        return $this->hasMany('App\Models\DinhDanh', 'username', 'username');
    }

    public function getSoDinhDanhAttribute()
    {
        return $this->dinh_danhs()->count();
    }

    /**
     * Quyền admin
     */
    public function getAdminAttribute()
    {
        return $this->phan_quyen === 9;
    }

    public function getQuyenAttribute()
    {
        switch ($this->phan_quyen) {
            case '9':
                return 'Quản trị hệ thống';
                break;
            default:
                return 'Người dùng';
                break;
        }
    }

    public function getRolesAttribute()
    {
        $roles = [];
        $roles[] = "user";
        if ($this->admin)
            $roles[] = 'admin';
        return $roles;
    }


    /**
     * Find the user instance for the given username.
     *
     * @param  string  $username
     * @return \App\User
     */
    public function findForPassport($username)
    {
        return $this->where('username', $username)->first();
    }
}
