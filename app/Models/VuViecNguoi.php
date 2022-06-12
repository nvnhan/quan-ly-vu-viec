<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VuViecNguoi extends Model
{
    use HasFactory;

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'ngay_xay_ra' => 'datetime:d/m/Y',
        'ngay_bat' => 'datetime:d/m/Y',
        'ngay_tam_giu' => 'datetime:d/m/Y',
        'ngay_tam_giam' => 'datetime:d/m/Y',
        'ngay_gia_han_tam_giam_1' => 'datetime:d/m/Y',
        'ngay_gia_han_tam_giam_2' => 'datetime:d/m/Y',
        'ngay_khoi_to' => 'datetime:d/m/Y',
        'created_at' => 'datetime:d/m/Y',
        'updated_at' => 'datetime:H:i d/m/Y',
    ];

    public function toi_danh()
    {
        return $this->belongsTo('App\ToiDanh', 'ma_toi_danh', 'ma_toi_danh');
    }
}
