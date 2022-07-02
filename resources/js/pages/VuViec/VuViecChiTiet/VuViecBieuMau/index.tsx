import Button from 'antd/lib/button';
import Collapse from 'antd/lib/collapse';
import Form from 'antd/lib/form/index';
import Modal from 'antd/lib/modal';
import React, { useState } from 'react';
import { downloadApi } from '../../../../utils/downloadFile';
import FormBaoCao from './FormBaoCao';
import { ad } from './bieuMauAD';
import { ak } from './bieuMauAK';
import List from 'antd/lib/list';

const VuViecBieuMau = (props: { vuViec?: Model.VuViec }) => {
	const [formBaoCao] = Form.useForm();
	const [formSubmitting, setFormSubmitting] = useState(false);
	const [stateBaoCao, setStateBaoCao] = useState({
		modalVisible: false,
		typeBaoCao: {} as { type: string; label: string } | undefined,
	});
	const { modalVisible, typeBaoCao } = stateBaoCao;
	const { vuViec } = props;

	const showBaoCao = (bc: any) => setStateBaoCao({ modalVisible: true, typeBaoCao: bc });

	const onCancel = () => setStateBaoCao({ modalVisible: false, typeBaoCao: undefined });

	/**
	 * Submit form download BIEU MAU
	 */
	const onSubmit = () => {
		formBaoCao.validateFields().then((values) => {
			downloadApi(
				'/api/bao-cao',
				{ vu_viec: vuViec?.id, type: typeBaoCao?.type, lanh_dao: values.lanh_dao },
				(typeBaoCao?.label ?? 'BaoCao') + '.docx'
			);
		});
		setStateBaoCao({ modalVisible: false, typeBaoCao: undefined });
	};

	return (
		<>
			<Collapse>
				{(vuViec?.loai_vu_viec === 'AĐ' ? ad : ak).map((item, index) => (
					<Collapse.Panel header={index + 1 + '. ' + item.name} key={item.path}>
						<List
							dataSource={item.childs}
							renderItem={(item, index) => (
								<List.Item style={{ cursor: 'pointer' }} onClick={() => showBaoCao(item)}>
									{index + 1} - {item.name}
								</List.Item>
							)}
						/>
					</Collapse.Panel>
				))}
			</Collapse>

			<Modal
				visible={modalVisible}
				title="Trích xuất biểu mẫu"
				onCancel={onCancel}
				footer={[
					<Button key="back" onClick={onCancel}>
						Hủy
					</Button>,
					<Button key="submit" type="primary" loading={formSubmitting} onClick={onSubmit}>
						Đồng ý
					</Button>,
				]}
			>
				<Form layout="vertical" form={formBaoCao}>
					<FormBaoCao />
				</Form>
			</Modal>
		</>
	);
};

export default VuViecBieuMau;
