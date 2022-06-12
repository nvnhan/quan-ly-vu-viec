<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nguoi extends Model
{
    use HasFactory;

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

    public function dp_thuong_tru()
    {
        return $this->belongsTo('App\DonVi', 'id_dp_thuong_tru');
    }

    public function dp_tam_tru()
    {
        return $this->belongsTo('App\DonVi', 'id_dp_tam_tru');
    }

    public function dp_noi_o_hien_nay()
    {
        return $this->belongsTo('App\DonVi', 'id_dp_noi_o_hien_nay');
    }

    public function dp_thuong_bao()
    {
        return $this->belongsTo('App\DonVi', 'id_dp_thong_bao');
    }
}
