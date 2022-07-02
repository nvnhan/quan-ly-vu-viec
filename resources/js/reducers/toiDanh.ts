import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getApi } from '../utils/services';
import { Model } from './type';

export const fetchToiDanh = createAsyncThunk('toiDanh/fetch', async () => {
	const response = await getApi('toi-danh');
	return response.data;
});

const initialState = {
	status: 'idle' as 'idle' | 'done' | 'error',
	list: [] as Model.DanhMuc[],
};

const silce = createSlice({
	name: 'toidanh',
	initialState,
	reducers: {
		setToiDanh: (state, { payload }: PayloadAction<Model.DanhMuc[]>) => ({
			status: 'done',
			list: payload,
		}),
	},
	extraReducers: (builder) => {
		builder.addCase(fetchToiDanh.fulfilled, (state, { payload }) => {
			state.list = payload.data.map((item: any) => ({ id: item.ma_toi_danh, value: item.toi_danh }));
			state.status = 'done';
		});
	},
});

const toiDanh = silce.reducer;
export default toiDanh;

export const { setToiDanh } = silce.actions;
