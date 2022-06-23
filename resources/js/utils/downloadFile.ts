import Modal from 'antd/lib/modal/index';
import FormWaiting from '../components/Includes/FormWaiting';
import { getFile } from './services';

/**
 * Download file từ url
 * const url = window.URL.createObjectURL(new Blob([response.data]));
 *
 * @param {*} url
 * @param {*} name
 */
const downloadFile = (url: string, name: string) => {
	let a = document.createElement('a');
	a.href = url;
	a.download = name;
	a.click();

	window.URL.revokeObjectURL(url);
};

/**
 * Tạo và download file từ url
 */
export const downloadApi = (url: string, params: object, fileName: string) => {
	FormWaiting('Đang tải dữ liệu...');

	getFile(url, params)
		.then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			downloadFile(url, fileName);
		})
		.catch((error) => console.log(error))
		.then(() => Modal.destroyAll());
};

export default downloadFile;
