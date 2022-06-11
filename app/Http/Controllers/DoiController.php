<?php

namespace App\Http\Controllers;

use App\Models\Doi;
use Illuminate\Http\Request;

class DoiController extends Controller
{
    public static function getDinhDanh(Request $request, $page = -1, $size = -1, $tinh_trang = "")
    {
        $query = DinhDanh::query();
        if ($request->u)
            $query = $query->where('username', $request->u);

        if ($request->dd)
            $query = $query->where('dinh_danh', $request->dd);

        if (!empty($request->q)) {
            $q = Classes::slugify($request->q, false);
            $q = str_replace("-", "%", $q);
            $query = $query->where('slug', 'LIKE', "%$q%");
        }

        if (!empty($request->tinh_trang)) {
            $tt = explode(",", str_replace("-1", "0", $request->tinh_trang));
            $query = $query->whereIn('tinh_trang', $tt);
        }

        $total = $query->count();
        if ($page > 0 && $size > 0)
            $query = $query->skip(($page - 1) * $size)->take($size);
        $objs = $query->get();

        return [$objs, $total];
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        [$objs, $total] = $this->getDinhDanh($request, $request->p, $request->s);

        return $this->sendResponse($objs, "DinhDanh retrieved successfully", $total);
    }

    public function xuatdinhdanh(Request $request)
    {
        [$objs] = $this->getDinhDanh($request);
        Report::export_dinh_danh($objs);
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
        $obj = new DinhDanh();
        $obj->fill($data);

        $obj->username = $request->user()->username;
        $obj->slug = Classes::slugify($obj->ho_ten);
        $obj->ho_ten = mb_strtoupper($obj->ho_ten);
        $obj->save();
        return $this->sendResponse($obj, "Thêm mới thành công");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DinhDanh  $model
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = $request->user();
        $data = $request->all();
        $model = DinhDanh::find($id);
        if ($user->admin || $user->username == $model->username) {
            $model->fill($data);
            $model->slug = Classes::slugify($model->ho_ten);
            $model->ho_ten = mb_strtoupper($model->ho_ten);
            $model->save();
            return $this->sendResponse($model, "Cập nhật thành công");
        } else return $this->sendError("Không thể sửa định danh");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function themfile(Request $request)
    {
        $cnt = 0;
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $ext = strtolower($file->getClientOriginalExtension());
            $dinh_danh = $file->getClientOriginalName() . time();
            $file->storeAs('upload', "$dinh_danh.$ext"); // Upload file to storage/app/upload

            if ($ext === 'xls' || $ext === 'xlsx')
                $cnt = ThemFile::parse_excel($request, $dinh_danh, $ext);

            Storage::delete("upload/$dinh_danh.$ext");
        }

        if ($cnt > 0)
            return $this->sendResponse($dinh_danh, "Thêm mới thành công $cnt mục");
        else return $this->sendError("Không xử lý được");
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DinhDanh  $model
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        $model = DinhDanh::find($id);
        if ($user->admin || $user->username == $model->username) {
            $model->delete();
            return $this->sendResponse('', "Xóa thành công định danh");
        } else return $this->sendError("Không thể xóa định danh");
    }

    /**
     * Remove multiple resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function deletes(Request $request)
    {
        $objs = explode('|', $request['objects']);
        if (\is_array($objs)) {
            $cnt = count($objs);
            DinhDanh::destroy($objs);
            return $this->sendResponse('', "Xóa thành công $cnt mục");
        } else if ($request['dd']) {
            $objs = DinhDanh::where('dinh_danh', $request['dd'])->delete();
            return $this->sendResponse('', "Đã loại bỏ dữ liệu");
        } else return $this->sendError('Không xóa được');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $model
     * @return \Illuminate\Http\Response
     */
    public function change_status(Request $request, $id)
    {
        $dinh_danh = DinhDanh::find($id);
        if ($dinh_danh) {
            $dinh_danh->tinh_trang = $request->check;
            $dinh_danh->save();
            return $this->sendResponse($dinh_danh, "Cập nhật thành công");
        } else return $this->sendError("Có lỗi");
    }
}
