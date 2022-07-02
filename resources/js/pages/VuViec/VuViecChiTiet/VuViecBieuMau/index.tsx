import Button from 'antd/lib/button';
import Collapse from 'antd/lib/collapse';
import Form from 'antd/lib/form/index';
import Modal from 'antd/lib/modal';
import React, { useEffect, useState } from 'react';
import { downloadApi } from '../../../../utils/downloadFile';
import FormBaoCao from './FormBaoCao';
import { ad } from './bieuMauAD';
import { ak } from './bieuMauAK';
import List from 'antd/lib/list';
import { Model } from '../../../../reducers/type';
import { getApi } from '../../../../utils/services';

const VuViecBieuMau = (props: { vuViec?: Model.VuViec }) => {
	const [formBaoCao] = Form.useForm();
	const [stateBaoCao, setStateBaoCao] = useState<{
		modalVisible: boolean;
		typeBaoCao?: BieuMau.Item;
		fullPath?: string;
	}>({ modalVisible: false });
	const { modalVisible, typeBaoCao, fullPath } = stateBaoCao;
	const [listNguoi, setListNguoi] = useState<any[]>();
	const { vuViec } = props;

	useEffect(() => {
		getApi('vu-viec-nguoi?vu_viec=' + vuViec?.id)
			.then((response) => {
				if (response.data.success) {
					// populate all field of Nguoi into VuViecNguoi
					const newData = response.data.data.map((item: any) => item.nguoi);
					setListNguoi(newData);
				}
			})
			.catch((error) => console.log(error));
	}, [vuViec]);

	const showBaoCao = (typeBaoCao: any, path: string) =>
		setStateBaoCao({ modalVisible: true, typeBaoCao, fullPath: path });

	const onCancel = () => setStateBaoCao({ modalVisible: false, typeBaoCao: undefined, fullPath: '' });

	/**
	 * Submit form download BIEU MAU
	 */
	const onSubmit = () => {
		formBaoCao.validateFields().then((values) => {
			downloadApi(
				'/api/bao-cao',
				{ vu_viec: vuViec?.id, full_path: fullPath?.replace(/\.[a-z]{3,4}$/g, ''), ...values },
				(typeBaoCao?.name ?? 'BaoCao') + '.docx'
			);
		});
		setStateBaoCao({ modalVisible: false, typeBaoCao: undefined, fullPath: '' });
	};

	return (
		<>
			<Collapse>
				{(vuViec?.loai_vu_viec === 'AĐ' ? ad : ak).map((item, index) => (
					<Collapse.Panel header={index + 1 + '. ' + item.name} key={item.path}>
						<List
							dataSource={item.childs}
							renderItem={(child, i) => (
								<List.Item
									style={{ cursor: 'pointer' }}
									onClick={() =>
										showBaoCao(
											child,
											(vuViec?.loai_vu_viec === 'AĐ' ? 'AD' : 'AK') +
												`.${item.path}.${child.path}`
										)
									}
								>
									{i + 1} - {child.name}
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
					<Button key="submit" type="primary" onClick={onSubmit}>
						Đồng ý
					</Button>,
				]}
			>
				<Form layout="vertical" form={formBaoCao}>
					<FormBaoCao listNguoi={listNguoi} typeBaoCao={typeBaoCao} />
				</Form>
			</Modal>
		</>
	);
};

export default VuViecBieuMau;
