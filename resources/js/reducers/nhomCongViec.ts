import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getApi } from '../utils/services';
import { Model } from './type';

export const fetchNhomCongViec = createAsyncThunk('nhomCongViec/fetch', async () => {
	const response = await getApi('nhom-cong-viec');
	return response.data;
});

const initialState = {
	status: 'idle' as 'idle' | 'done' | 'error',
	list: [] as Model.DanhMuc[],
};

const silce = createSlice({
	name: 'nhomcv',
	initialState,
	reducers: {
		setNhomCongViec: (state, { payload }: PayloadAction<Model.DanhMuc[]>) => ({
			status: 'done',
			list: payload,
		}),
	},
	extraReducers: (builder) => {
		builder.addCase(fetchNhomCongViec.fulfilled, (state, { payload }) => {
			state.list = payload.data.map((item: any) => ({ id: item.id, value: item.nhom_cong_viec }));
			state.status = 'done';
		});
	},
});

const nhomCongViecReducer = silce.reducer;
export default nhomCongViecReducer;

export const { setNhomCongViec } = silce.actions;
