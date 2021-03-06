import { getFormData } from '.';
import axios from './axios';

export const getUser = async () => {
	return axios.get(`/api/get-user`);
};

export const changePassword = async (payload: any) => {
	return axios.put(`/api/password`, payload);
};

export const updateProfile = async (payload: any) => {
	return axios.put(`/api/profile`, payload);
};

export const postRegister = async (payload: any) => {
	return axios.post(`/api/register`, payload);
};

export const postLogin = async (payload: any) => {
	return axios.post(`/api/login`, payload);
};

export const getLogout = async () => {
	return axios.get(`/api/logout`);
};

export const getCaiDat = async () => {
	return axios.get(`/api/cai-dat`);
};

export const getApi = async (url: string) => {
	return axios.get(`/api/${url}`);
};

export const putApi = async (url: string, payload: any) => {
	return axios.put(`/api/${url}`, payload);
};

export const checkName = async (name: string) => {
	return axios.get(`/api/can-bo/check/${name}`);
};

export const putCaiDat = async (payload: any) => {
	return axios.put(`/api/cai-dat`, payload);
};

export const getSearchQuanHuyen = async (payload: any) => {
	const { q, l } = payload;
	return axios.get(`/api/quan-huyen?q=${q}&l=${l}`);
};

export const getSearchDonVi = async (payload: any) => {
	const { q, l } = payload;
	return axios.get(`/api/tim-don-vi?q=${q}&l=${l}&type=${payload?.type ?? ''}`);
};

export const getSearchXaPhuong = async (payload: any) => {
	const { q, l } = payload;
	return axios.get(`/api/tim-xa-phuong?q=${q}&l=${l}`);
};

export const getSearchCanBo = async (payload: any) => {
	const { q, l } = payload;
	return axios.get(`/api/tim-can-bo?q=${q}&l=${l}`);
};

export const getSearchNguoi = async (payload: any) => {
	const { q, l, vv } = payload;
	return axios.get(`/api/tim-nguoi?q=${q}&l=${l}&vv=${vv}`);
};

export const getFile = async (url: string, params: object) => {
	return axios.get(url, {
		params,
		responseType: 'blob', // important
	});
};

export const postFormData = async (url: string, formValues: { [key: string]: any }) => {
	return axios.post(`/api/${url}`, getFormData(formValues), {
		headers: {
			'Content-Type': 'multipart/form-data; charset=utf-8; boundary=' + Math.random(),
		},
	});
};
