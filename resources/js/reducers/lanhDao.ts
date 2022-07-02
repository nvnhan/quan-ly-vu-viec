import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getApi } from '../utils/services';
import { Model } from './type';

export const fetchLanhDao = createAsyncThunk('lanhDao/fetch', async () => {
	const response = await getApi('lanh-dao');
	return response.data;
});

const initialState = {
	status: 'idle' as 'idle' | 'done' | 'error',
	list: [] as Model.DanhMuc[],
};

const silce = createSlice({
	name: 'lanhDao',
	initialState,
	reducers: {
		setLanhDao: (state, { payload }: PayloadAction<Model.DanhMuc[]>) => ({
			status: 'done',
			list: payload,
		}),
	},
	extraReducers: (builder) => {
		builder.addCase(fetchLanhDao.fulfilled, (state, { payload }) => {
			state.list = payload.data.map((item: any) => ({
				id: item.id,
				value: item.ten_cap_bac + ' ' + item.ho_ten + ' - ' + item.chuc_danh_lanh_dao,
			}));
			state.status = 'done';
		});
	},
});

const lanhDao = silce.reducer;
export default lanhDao;

export const { setLanhDao } = silce.actions;
