<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaiLieu extends Model
{
    use HasFactory;

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime:d/m/Y',
        'updated_at' => 'datetime:H:i d/m/Y',
    ];

    public function can_bo()
    {
        return $this->belongsTo('App\CanBo', 'nguoi_tao');
    }

    public function vu_viec()
    {
        return $this->belongsTo('App\VuViec', 'id_vu_viec');
    }

    public function cong_viec()
    {
        return $this->belongsTo('App\CongViec', 'id_cong_viec');
    }
}
