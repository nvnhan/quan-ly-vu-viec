import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getApi } from '../utils/services';
import { Model } from './type';

export const fetchCapBac = createAsyncThunk('capBac/fetch', async () => {
	const response = await getApi('cap-bac');
	return response.data;
});

const initialState = {
	status: 'idle' as 'idle' | 'done' | 'error',
	list: [] as Model.DanhMuc[],
};

const silce = createSlice({
	name: 'capbac',
	initialState,
	reducers: {
		setCapBac: (state, { payload }: PayloadAction<Model.DanhMuc[]>) => ({
			status: 'done',
			list: payload,
		}),
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCapBac.fulfilled, (state, { payload }) => {
			state.list = payload.data.map((item: any) => ({ id: item.id, value: item.cap_bac }));
			state.status = 'done';
		});
	},
});

const capBac = silce.reducer;
export default capBac;

export const { setCapBac } = silce.actions;
