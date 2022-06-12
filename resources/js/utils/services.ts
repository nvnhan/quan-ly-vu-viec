import axios from 'axios';

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

export const getFile = async (url: string, params: object) => {
	return axios.get(url, {
		params,
		responseType: 'blob', // important
	});
};
