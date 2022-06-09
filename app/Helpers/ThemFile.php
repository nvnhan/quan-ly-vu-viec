<?php

namespace App\Helpers;

use App\Models\DinhDanh;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;
use stdClass;

class ThemFile
{
    public static function parse_money(string $tt = '')
    {
        return (float) (trim(str_replace([',', '.', '-', '$'], '', $tt)));
    }

    public static function parse_date(string $t)
    {
        $s = '';
        $t = strtoupper($t);
        if (is_numeric($t)) {        // Excel date 
            $linux_time = ($t - 25569) * 86400;
            $s = date("Y-m-d", $linux_time);
        } else if (preg_match("/(\d+)\/(\d+)\/(\d+)/", $t, $matches))
            if (strpos($t, "AM") !== false || strpos($t, "PM") !== false)         // Jets: 4/17/2019 12:14:57 AM
                $s = "$matches[3]-$matches[1]-$matches[2]";
            else $s = "$matches[3]-$matches[2]-$matches[1]"; // 17/04/2019 Wed
        else if (preg_match("/(\d+)-([A-Z]+)-(\d+)/", $t, $matches)) { //  03-Apr-2019	
            $mon = array_search($matches[2], Util::$thang);
            if ($mon !== false) {
                $mon++;
                $s = "$matches[3]-$mon-$matches[1]";
            }
        }
        return $s;
    }

    public static function insert_into_db($parse, Request $request)
    {
        // filter data 
        $cnt = 0;
        foreach ($parse as $item) {
            $dv = new DinhDanh((array) $item);
            $dv->username = $item->username;
            $dv->slug = Classes::slugify($dv->ho_ten);

            try {
                $dv->save();
                $cnt++;
            } catch (\Exception $e) {
                \Log::debug($e);
            }
        }

        return $cnt;
    }

    /**
     * Parse data from Excel
     */
    public static function parse_excel(Request $request, string $dinh_danh, string $extension)
    {
        $path = storage_path('app/upload') . "/$dinh_danh.$extension";

        if ($extension === 'xlsx')
            $reader = IOFactory::createReader("Xlsx");
        else
            $reader = IOFactory::createReader("Xls");
        $spreadSheet = $reader->load($path);
        $sheet = $spreadSheet->getSheet(0);

        $ind = $request->xu_ly_tu_hang;
        $user = $request->user();
        $parse = [];
        // Parse data from file
        while (true) {
            $tmp = new stdClass;
            $tmp->username = $user->username;
            $tmp->dinh_danh = $dinh_danh;

            $tmp->ho_ten = $sheet->getCell($request->cot_ho_ten . $ind)->getValue();
            $tmp->ho_ten = mb_strtoupper($tmp->ho_ten);
            if (empty($tmp->ho_ten))
                break;

            // Hãng bay
            if (!empty($request->cot_hang_bay))
                $tmp->hang_bay = trim($sheet->getCell($request->cot_hang_bay . $ind)->getValue());

            // F1
            if (!empty($request->cot_f1))
                $tmp->f1 = trim($sheet->getCell($request->cot_f1 . $ind)->getValue());

            // SĐT 
            if (!empty($request->cot_sdt))
                $tmp->sdt = trim($sheet->getCell($request->cot_sdt . $ind)->getValue());

            // Ghi chú
            if (!empty($request->cot_ghi_chu))
                $tmp->ghi_chu = trim($sheet->getCell($request->cot_ghi_chu . $ind)->getValue());

            // Giá tiền
            if (!empty($request->cot_gia_tien)) {
                $value = $sheet->getCell($request->cot_gia_tien . $ind)->getValue();
                if (!empty($value))
                    $tmp->gia_tien = self::parse_money($value);
            }
            // thu khách
            if (!empty($request->cot_gia_ban)) {
                $value = $sheet->getCell($request->cot_gia_ban . $ind)->getValue();
                if (!empty($value))
                    $tmp->gia_ban = self::parse_money($value);
            }
            $parse[] = $tmp;
            $ind++;
        }

        // insert rows to db
        $cnt = self::insert_into_db($parse, $request);

        return $cnt;
    }
}
