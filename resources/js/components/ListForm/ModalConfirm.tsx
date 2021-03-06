import Button from 'antd/lib/button/index';
import Modal from 'antd/lib/modal/index';
import Switch from 'antd/lib/switch/index';
import React, { useState } from 'react';
import { ListFormProps } from '.';
import { parseValues } from '../../utils';
import FormEdit from './FormEdit';

export interface ModalConfirmProps extends ListFormProps {
	form: any;
	currentRecord: { [index: string]: any };
	modalVisible: boolean;
	handleCancel: () => void;
	handleOk: (value: object, callback: () => void) => void;
}

const ModalConfirm = (props: ModalConfirmProps) => {
	const { form, currentRecord, setFormValues, modalVisible, handleCancel, handleOk, modalWidth } = props;
	const [formSubmitting, setFormSubmitting] = useState(false);
	const [insertMore, setInsertMore] = useState(false);

	const onOk = () => {
		setFormSubmitting(true);
		form.validateFields()
			.then((value: any) => {
				handleOk(parseValues(value), () => setFormSubmitting(false));
				if (insertMore && currentRecord === undefined) {
					// Nếu form thêm mới thì reset field để thêm record mới
					form.resetFields();
				} else onCancel();
			})
			.catch((info: any) => console.log('Validate Failed: ', info))
			.then(() => setFormSubmitting(false));
	};

	const onCancel = () => {
		form.resetFields(); //  Xóa trắng form
		if (setFormValues !== undefined && setFormValues.resetFields !== undefined) setFormValues.resetFields();
		handleCancel(); // Tắt modal
	};

	const onChange = (checked: boolean) => setInsertMore(checked);

	return (
		<Modal
			width={modalWidth}
			visible={modalVisible}
			title={currentRecord !== undefined ? 'Chỉnh sửa' : 'Thêm mới'}
			onOk={onOk}
			onCancel={onCancel}
			footer={[
				<React.Fragment key="insert-more">
					<Switch checked={insertMore} onChange={onChange} />
					&nbsp;Thêm nữa
				</React.Fragment>,
				<Button key="back" onClick={onCancel}>
					Hủy
				</Button>,
				<Button key="submit" type="primary" loading={formSubmitting} onClick={onOk}>
					Đồng ý
				</Button>,
			]}
		>
			<FormEdit {...props} />
		</Modal>
	);
};

export default React.memo(ModalConfirm);
