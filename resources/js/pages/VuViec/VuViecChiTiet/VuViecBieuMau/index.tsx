import Button from 'antd/lib/button';
import Collapse from 'antd/lib/collapse';
import Form from 'antd/lib/form/index';
import Modal from 'antd/lib/modal';
import React, { useState } from 'react';
import { downloadApi } from '../../../../utils/downloadFile';
import FormBaoCao from './FormBaoCao';

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
	// Menu Report

	const phanCongToGiac = [
		{
			label: 'Thông báo tiếp nhận tố giác',
			type: 'PhanCongToGiac.TBTiepNhanToGiac',
			hasLanhDao: true,
		},
		{
			label: 'Báo cáo đề xuất phân công tố giác',
			type: 'PhanCongToGiac.BCDXPhanCongToGiac',
			hasLanhDao: true,
		},
		{
			label: 'Phân công PTT giải quyết tố giác',
			type: 'PhanCongToGiac.PCPTTGiaiQuyetToGiac',
			hasLanhDao: true,
		},
		{
			label: 'Phân công ĐTV giải quyết tố giác',
			type: 'PhanCongToGiac.QDPhanCongDTVGiaiQuyetToGiac',
			hasLanhDao: true,
		},
		{
			label: 'Kế hoạch xác minh tố giác',
			type: 'PhanCongToGiac.KHXMToGiac',
			hasLanhDao: true,
		},
		{
			label: 'Quyết định lập hồ sơ tố giác',
			type: 'PhanCongToGiac.LapHoSoADToGiac',
			hasLanhDao: true,
		},
	];

	return (
		<>
			<Collapse defaultActiveKey="ttbd">
				<Collapse.Panel key="ttdt" header="Thời hạn xác minh"></Collapse.Panel>
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
