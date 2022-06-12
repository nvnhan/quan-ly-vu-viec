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
        'ngay_ban_hanh' => 'datetime:d/m/Y',
        'ngay_xu_ly' => 'datetime:d/m/Y',
        'created_at' => 'datetime:d/m/Y',
        'updated_at' => 'datetime:H:i d/m/Y',
    ];

    public function can_bo_thu_ly()
    {
        return $this->belongsTo('App\CanBo', 'id_can_bo');
    }

    public function can_bo_tao()
    {
        return $this->belongsTo('App\CanBo', 'id_nguoi_tao');
    }

    public function vu_viec()
    {
        return $this->belongsTo('App\VuViec', 'id_vu_viec');
    }
}
