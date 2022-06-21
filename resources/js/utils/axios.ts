// axios.js
import notification from 'antd/lib/notification';
import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(
	(config) => {
		if (!config.headers.Authorization) {
			const token = localStorage.getItem('token');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			}
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Add a response interceptor
axios.interceptors.response.use(undefined, (error) => {
	switch (error?.response?.status) {
		case 401:
			notification.error({
				message: 'Vui lòng đăng nhập lại',
				description: '',
			});
			localStorage.removeItem('token');
			break;

		case 404:
			notification.warning({
				message: 'Không tìm thấy dữ liệu',
				description: error?.response?.data?.message || error?.message,
			});
			break;
		case 403:
		case 405: {
			notification.warning({
				message: 'Thao tác không được phép',
				description: error?.response?.data?.message || error?.message,
			});
			break;
		}
		case 409: {
			notification.warning({
				message: 'Dữ liệu bị trùng lặp',
				description: error?.response?.data?.message || error?.message,
			});
			break;
		}
		case 500: {
			notification.error({
				message: 'Hệ thống gặp lỗi',
				description: error?.response?.data?.message || error.message,
			});
			break;
		}
		default:
			break;
	}
	// Do something with response error
	return Promise.reject(error);
});

export default axios;
