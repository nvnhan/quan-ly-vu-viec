<?php

namespace App\Http\Controllers;

use App\Models\CanBo;
use App\Models\CongViec;
use App\Models\DonVi;
use App\Models\ToiDanh;
use App\Models\VuViec;
use App\Models\VuViecNguoi;
use Illuminate\Http\Request;

class VuViecController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = VuViec::query();
        if ($request->bat_dau && $request->ket_thuc)
            $query->whereBetween('ngay_cqdt', [$request->bat_dau, $request->ket_thuc]);

        if (!empty($request->q)) {
            $query->where('ten_vu_viec', 'LIKE', "%$request->q%");
        }

        if (!empty($request->loai_vu_viec)) {
            $tt = explode(",", $request->loai_vu_viec);
            $query->whereIn('loai_vu_viec', $tt);
        }

        if (!empty($request->phan_loai_tin)) {
            $tt = explode(",", $request->phan_loai_tin);
            $query->whereIn('phan_loai_tin', $tt);
        }

        if (!empty($request->phuong_thuc_pham_toi)) {
            $tt = explode(",", $request->phuong_thuc_pham_toi);
            $query->whereIn('phuong_thuc_pham_toi', $tt);
        }

        $user = $request->user();
        if ($user->chuc_vu === 0)        // Neu la can bo
        {
            $vv = CongViec::where('id_can_bo', $user->id)->pluck('id_vu_viec');
            $query = $query->where(fn ($q) =>  $q
                ->where('id_dtv_chinh', $user->id)
                ->orWhere('id_can_bo_chinh', $user->id)
                ->orWhere('nguoi_tao', $user->id)
                ->orWhereIn('id', $vv));
        } else if ($user->chuc_vu === 1) {      // Doi pho
            $query = $query->where('id_don_vi', $user->id_don_vi);
        } else if ($user->chuc_vu <= 3) {      // Đội trưởng, tổng hợp đội
            $dv_con = DonVi::where('id_don_vi_cha', $user->id_don_vi)->pluck('id');
            $dv_con[] = $user->id_don_vi;
            $query = $query->whereIn('id_don_vi', $dv_con);
        }
        // Neu la lanh dao thi show het cua can bo

        $query->orderBy('ngay_cqdt', 'DESC');
        // For AJAX pagination loading
        $total = $query->count();
        $page = $request->p;
        $size = $request->s;
        if ($page > 0 && $size > 0)
            $query = $query->skip(($page - 1) * $size)->take($size);
        $objs = $query->get();

        return $this->sendResponse($objs, "VuViec retrieved successfully", $total);
    }

    public function setVuViecFields(&$vuViec, Request $request)
    {
        $dp = [];       // Xa, phuong
        if (!empty($request->sel_dp_xay_ra))
            foreach ($request->sel_dp_xay_ra as $key => $value)
                if ($value['value']) $dp[] = $value['value'];
        $vuViec->dp_xay_ra = implode(',', $dp);

        // Gen Khu vuc xay ra
        $don_vis = DonVi::whereIn('id', $dp)->select('dia_phuong')->distinct()->get();
        if (count($dp) === 1) {
            $dv = DonVi::whereIn('id', $dp)->get();
            $vuViec->khu_vuc_xay_ra = $dv[0]->loai_don_vi . ' ' . $dv[0]->ten_don_vi . ' - ' . $don_vis[0]->ten_dia_phuong;  //  Xa/Phuong Quan/Huyen - Tinh/Thanh pho
        } else if (count($don_vis) === 1)
            $vuViec->khu_vuc_xay_ra = $don_vis[0]->ten_dia_phuong;  // Quan/Huyen - Tinh/Thanh pho
        else {
            $tmp = explode(' - ', $don_vis[0]->ten_dia_phuong ?? '')[1] ?? '';        // Tinh/Thanh pho
            for ($i = 1; $i < count($don_vis); $i++) {
                $tmp1 = explode(' - ', $don_vis[$i]->ten_dia_phuong)[1] ?? '';
                if ($tmp !== $tmp1) {
                    $tmp = 'Toàn quốc';
                    break;
                }
            }
            $vuViec->khu_vuc_xay_ra = $tmp;
        }

        // Don Vi xay ra: Cấp Tổ
        $vuViec->id_dtv_chinh = $request->sel_dtv_chinh['value'] ?? null;
        $vuViec->id_can_bo_chinh = $request->sel_can_bo_chinh['value'] ?? null;
        $vuViec->id_don_vi = null;
        $cb = CanBo::whereIn('id', [$vuViec->id_can_bo_chinh, $vuViec->id_dtv_chinh])->with('don_vi')->get();
        foreach ($cb as $c) {
            // if (!empty($c->don_vi->id_don_vi_cha))
            //     $vuViec->id_don_vi = $c->don_vi->id_don_vi_cha;
            // else if (!empty($c->id_don_vi))
            $vuViec->id_don_vi = $c->id_don_vi;         // Đơn vị cấp tổ
            if (!empty($vuViec->id_don_vi))
                break;
        }
        if (empty($vuViec->id_don_vi)) {
            $tmp = CanBo::find($vuViec->nguoi_tao);
            $vuViec->id_don_vi = $tmp->id_don_vi ?? null;
        }

        if (str_contains($vuViec->thoi_diem_xay_ra, '00:00:00')) {
            $vuViec->thoi_diem_xay_ra = date('d/m/Y', strtotime($vuViec->thoi_diem_xay_ra));
        }
    }

    public static function calTenVuViec(VuViec $vuViec)
    {
        $ten = "$vuViec->noi_dung_tom_tat";
        $tmp = [];
        if (!empty($vuViec->thoi_diem_xay_ra))
            if (preg_match("/^[0-9]+\/[0-9]+\/[0-9]{2,4}$/i", $vuViec->thoi_diem_xay_ra))
                $tmp[] = "vào ngày $vuViec->thoi_diem_xay_ra";
            else $tmp[] = "vào $vuViec->thoi_diem_xay_ra";
        if (!empty($vuViec->noi_xay_ra))
            $tmp[] = "tại $vuViec->noi_xay_ra";
        if (!empty($tmp))
            $ten .= " xảy ra " . implode(', ', $tmp);

        if ($vuViec->loai_vu_viec === 'AK') {
            // $bc = VuViecNguoi::where('id_vu_viec', $vuViec->id)->whereIn('tu_cach_to_tung', [1, 2, 3, 4, 5, 6])->with('nguoi')->get();
            // $nguoi = [];
            // foreach ($bc as $key => $value)
            //     $nguoi[] = $value->nguoi->ho_ten ?? '';

            // if (!empty($nguoi))
            //     $ten = implode(', ', $nguoi) . ' ' . $ten;
            $ten = ucfirst(str_replace("Tội ", '', $vuViec->toi_danh->toi_danh ?? '')) . " xảy ra " . implode(', ', $tmp);
        } else {
            $bc = VuViecNguoi::where('id_vu_viec', $vuViec->id)->where('tu_cach_to_tung', 7)->with('nguoi')->get();
            $nguoi = [];
            foreach ($bc as $key => $value)
                $nguoi[] = $value->nguoi->ho_ten ?? '';
            $ten = implode(', ', $nguoi) . " $ten";

            if ($vuViec->phan_loai_tin === 'Tin báo về tội phạm')
                $ten = "Tin báo về tội phạm của $vuViec->don_vi_chuyen_tin về việc $ten";
            else if (!empty($nguoi))
                $ten = $vuViec->phan_loai_tin . " của $ten";
        }
        return $ten;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $obj = new VuViec();
        $obj->fill($data);

        if ($request->ngay_cqdt && $request->loai_vu_viec === 'AĐ') {
            $obj->ngay_keo_dai = date('Y-m-d H:i:s', strtotime($request->ngay_cqdt . ' +20 days'));
            $obj->ngay_ket_thuc_1 = date('Y-m-d H:i:s', strtotime($request->ngay_cqdt . ' +2 months'));
        }

        $obj->nguoi_tao = $request->user()->id;
        self::setVuViecFields($obj, $request);
        $obj->ten_vu_viec = self::calTenVuViec($obj);
        $obj->save();
        $obj->refresh();
        return $this->sendResponse($obj, "Thêm mới thành công");
    }

    public function chi_tiet_vu_viec(&$vuViec)
    {
        $result = [];
        $dvs = DonVi::whereIn('id', $vuViec->dp_xay_ras)->get();
        foreach ($dvs as $key => $dv)
            $result[] = (object)[
                'value' => $dv->id,
                'label' => ($dv->loai_don_vi ?? '') . ' ' . ($dv->ten_don_vi ?? '') . ' - ' . ($dv->ten_dia_phuong ?? '')
            ];

        if ($vuViec->loai_vu_viec === 'AĐ') {
            $nguoi_to_giac = $vuViec->vu_viec_nguois()->where('tu_cach_to_tung', 7)->count();
            if ($nguoi_to_giac <= 0)
                $vuViec->canh_bao = "Vụ việc này hiện chưa có thông tin người tố giác";
        } else if ($vuViec->loai_vu_viec === 'AK') {
            $bi_can = $vuViec->vu_viec_nguois()->where('tu_cach_to_tung', 6)->count();
            if ($bi_can <= 0)
                $vuViec->canh_bao = "Vụ án này hiện chưa có thông tin bị can";
        }
        $vuViec->sel_dp_xay_ra = $result;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\VuViec  $vuViec
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, VuViec $vuViec)
    {
        $user = $request->user();
        if ($user->chuc_vu === 0)        // Neu la can bo
        {
            $vv = CongViec::where('id_can_bo', $user->id)->where('id_vu_viec', $vuViec->id)->count();
            if ($vv <= 0 && $vuViec->id_dtv_chinh != $user->id && $vuViec->id_can_bo_chinh != $user->id && $vuViec->nguoi_tao != $user->id)
                return $this->sendError("Đồng chí không được phép truy cập nội dung này", [], 403);
        } else if ($user->chuc_vu <= 3) {      // Chi huy
            $dv = DonVi::where('id', $vuViec->id_don_vi)->first();
            // $don_vi_cha = $dv->id_don_vi_cha ?? $dv->id;
            if ($user->id_don_vi != $dv->id_don_vi_cha && $user->id_don_vi != $dv->id)
                return $this->sendError("Đồng chí không được phép truy cập nội dung này", [], 403);
        }
        self::chi_tiet_vu_viec($vuViec);

        return $this->sendResponse($vuViec, "VuViec retrieved successfully");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\VuViec  $vuViec
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VuViec $vuViec)
    {
        $user = $request->user();
        $data = $request->all();
        $model = VuViec::find($vuViec->id);
        if ($user->quan_tri || $user->id == $model->nguoi_tao || $user->id === $model->id_dtv_chinh || $user->id === $model->id_can_bo_chinh) {
            $model->fill($data);
            self::setVuViecFields($model, $request);
            $model->ten_vu_viec = self::calTenVuViec($model);
            $model->save();
            $model->refresh();
            self::chi_tiet_vu_viec($model);
            return $this->sendResponse($model, "Cập nhật thành công");
        } else return $this->sendError("Không thể sửa thông tin vụ việc");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\VuViec  $vuViec
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, VuViec $vuViec)
    {
        $user = $request->user();
        if ($user->quan_tri || $user->id == $vuViec->nguoi_tao) {
            $vuViec->delete();
            return $this->sendResponse('', "Xóa thành công vụ việc");
        } else return $this->sendError("Không thể xóa vụ việc");
    }
}
