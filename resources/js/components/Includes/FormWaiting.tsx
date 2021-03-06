import Modal from 'antd/lib/modal/index';
import Progress from 'antd/lib/progress/index';
import React from 'react';

const FormWaiting = (s = 'Đang xử lý dữ liệu...') => {
	Modal.info({
		title: 'Thông báo',
		centered: true,
		icon: null,
		okButtonProps: { hidden: true },
		content: (
			<div style={{ textAlign: 'center' }}>
				<Progress percent={100} status="active" showInfo={false} strokeColor="#731A2B" />
				<span>{s}</span>
				<br />
				<small>
					<i>(Vui lòng chờ đến khi tiến trình kết thúc!)</i>
				</small>
			</div>
		),
	});
};

export default FormWaiting;
