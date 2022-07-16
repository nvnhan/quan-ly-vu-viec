import Button from 'antd/lib/button';
import Collapse from 'antd/lib/collapse';
import Form from 'antd/lib/form/index';
import Modal from 'antd/lib/modal';
import React, { useEffect, useState } from 'react';
import { downloadApi } from '../../../../utils/downloadFile';
import FormBaoCao from './FormBaoCao';
import { ad } from './bieuMauAD';
import { ak } from './bieuMauAK';
import { adCaNhan } from './bieuMauADCaNhan';
import { akCaNhan } from './bieuMauAKCaNhan';
import List from 'antd/lib/list';
import { Model } from '../../../../reducers/type';
import { getApi } from '../../../../utils/services';
import Divider from 'antd/lib/divider';
import { danhChoGiupViecVaPTT } from './DanhChoGiupViecPTT';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const VuViecBieuMau = (props: { vuViec?: Model.VuViec }) => {
	const [formBaoCao] = Form.useForm();
	const authUser = useSelector((state: RootState) => state.authUserReducer);
	const [stateBaoCao, setStateBaoCao] = useState<{
		modalVisible: boolean;
		typeBaoCao?: BieuMau.Item;
		fullPath?: string;
		caNhan?: boolean;
	}>({ modalVisible: false });
	const { modalVisible, typeBaoCao, fullPath, caNhan } = stateBaoCao;
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

	const showBaoCao = (typeBaoCao: any, path: string, caNhan?: boolean) =>
		setStateBaoCao({ modalVisible: true, typeBaoCao, fullPath: path, caNhan });

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
			<Divider orientation="left">Biểu mẫu chung</Divider>
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
			<Divider orientation="left">Biểu mẫu cá nhân</Divider>
			<Collapse>
				{(vuViec?.loai_vu_viec === 'AĐ' ? adCaNhan : akCaNhan).map((item, index) => (
					<Collapse.Panel header={index + 1 + '. ' + item.name} key={item.path}>
						<List
							dataSource={item.childs}
							renderItem={(child, i) => (
								<List.Item
									style={{ cursor: 'pointer' }}
									onClick={() =>
										showBaoCao(
											child,
											(vuViec?.loai_vu_viec === 'AĐ' ? 'CaNhanVuViec' : 'CaNhanVuAn') +
												`.${item.path}.${child.path}`,
											true
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
			{authUser.quan_tri && (
				<>
					<Divider orientation="left">Biểu mẫu khác</Divider>
					<Collapse>
						{danhChoGiupViecVaPTT.map((item, index) => (
							<Collapse.Panel header={index + 1 + '. ' + item.name} key={item.path}>
								<List
									dataSource={item.childs}
									renderItem={(child, i) => (
										<List.Item
											style={{ cursor: 'pointer' }}
											onClick={() => showBaoCao(child, `${item.path}.${child.path}`)}
										>
											{i + 1} - {child.name}
										</List.Item>
									)}
								/>
							</Collapse.Panel>
						))}
					</Collapse>
				</>
			)}
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
					<FormBaoCao listNguoi={listNguoi} typeBaoCao={typeBaoCao} caNhan={caNhan} />
				</Form>
			</Modal>
		</>
	);
};

export default VuViecBieuMau;
