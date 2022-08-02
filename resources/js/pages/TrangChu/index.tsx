import FilterOutlined from '@ant-design/icons/FilterOutlined';
import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Spin from 'antd/lib/spin';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MyDebounceSelect, { SelectValue } from '../../components/Controls/MyDebounceSelect';
import MyRangePicker from '../../components/Controls/MyRangePicker';
import { RootState } from '../../store';
import { parseValues, queryString } from '../../utils';
import { getApi, getSearchCanBo, getSearchDonVi } from '../../utils/services';
import CardCanBo, { CanBoXuatSac } from './CardCanBo';
import CardCongViec from './CardCongViec';
import CardTitle from './CardTitle';

const TrangChu = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<{
		vu_viec: number;
		can_bo: number;
		cong_viec: number;
		tai_lieu: number;
		cong_van: number;
		cong_viec_chi_tiet: any;
		can_bo_xuat_sac: CanBoXuatSac[];
	}>();
	const authUser = useSelector((state: RootState) => state.authUserReducer);

	useEffect(() => {
		// form.setFieldsValue({
		// 	thoiGian: [moment().clone().weekday(0).startOf('day'), moment().clone().weekday(6).endOf('day')],
		// });
		onFilter({});
	}, []);

	const fetchDonViList = async (q: string): Promise<SelectValue[]> => {
		return getSearchDonVi({ q, l: 7 }).then((body) =>
			body?.data?.data.map((item: any) => ({
				label: item.ten_don_vi_day_du,
				value: item.id,
			}))
		);
	};

	const fetchCanBoList = async (q: string): Promise<SelectValue[]> => {
		return getSearchCanBo({ q, l: 7 }).then((body) =>
			body?.data?.data.map((item: any) => ({
				label: `${item.ho_ten} - ${item.ten_chuc_vu} ${item.ten_don_vi}`,
				value: item.id,
			}))
		);
	};

	const onFilter = (values: any) => {
		setLoading(true);
		const query = { ...values, id_don_vi: values.sel_don_vi?.key, id_can_bo: values.sel_can_bo?.key };
		delete query.sel_don_vi;
		delete query.sel_can_bo;
		getApi('tong-quan?' + queryString(parseValues(query)))
			.then((response) => {
				if (response.data.success) setData(response.data.data);
			})
			.catch((error) => console.log(error))
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			<div className="">
				<div className="filter-box">
					<Form form={form} onFinish={onFilter}>
						<Row gutter={[12, 12]}>
							<Col span={24} md={16} lg={12} xl={10}>
								<Form.Item
									name="thoiGian"
									label="Thời gian"
									labelCol={{ span: 4, xl: 6 }}
									wrapperCol={{ span: 20, xl: 18 }}
								>
									<MyRangePicker />
								</Form.Item>
							</Col>
							{authUser?.quan_tri && (
								<Col span={24} md={16} lg={12} xl={10}>
									<Form.Item
										name="sel_don_vi"
										label="Đơn vị"
										labelCol={{ span: 4, xl: 6 }}
										wrapperCol={{ span: 20, xl: 18 }}
									>
										<MyDebounceSelect
											placeholder="Chọn đơn vị..."
											allowClear
											fetchOptions={fetchDonViList}
										/>
									</Form.Item>
								</Col>
							)}
							{authUser?.chi_huy && (
								<Col span={24} md={16} lg={12} xl={10}>
									<Form.Item
										name="sel_can_bo"
										label="Cán bộ"
										labelCol={{ span: 4, xl: 6 }}
										wrapperCol={{ span: 20, xl: 18 }}
									>
										<MyDebounceSelect
											placeholder="Chọn cán bộ..."
											allowClear
											fetchOptions={fetchCanBoList}
										/>
									</Form.Item>
								</Col>
							)}
							<Col span={12} md={8} lg={6} xl={4}>
								<Button htmlType="submit" icon={<FilterOutlined />}>
									Lọc
								</Button>
							</Col>
						</Row>
					</Form>
				</div>
			</div>
			<div className="dashboard">
				<Spin spinning={loading}>
					<Row>
						<Col>
							<span className="title-report">Tổng quan toàn đơn vị</span>
						</Col>
					</Row>

					<Row gutter={[12, 12]}>
						<Col span={24} sm={12} md={8} xl={6} onClick={() => navigate('/vu-viec')}>
							<CardTitle title="Vụ việc" subTitle="Tổng số vụ việc" amount={data?.vu_viec ?? 0} />
						</Col>
						<Col
							span={24}
							sm={12}
							md={8}
							xl={6}
							onClick={() => navigate(authUser?.chi_huy ? '/tat-ca-cong-viec' : '/cong-viec-cua-toi')}
						>
							<CardTitle title="Công việc" subTitle="Tổng số công việc" amount={data?.cong_viec ?? 0} />
						</Col>
						<Col span={24} sm={12} md={8} xl={6} onClick={() => navigate('/kho-tai-lieu')}>
							<CardTitle title="Tài liệu" subTitle="Tài liệu, báo cáo" amount={data?.tai_lieu ?? 0} />
						</Col>
						<Col span={24} sm={12} md={8} xl={6} onClick={() => navigate('/van-ban-to-tung')}>
							<CardTitle
								title="Văn bản"
								subTitle="Tổng số văn bản tố tụng"
								amount={data?.cong_van ?? 0}
							/>
						</Col>
						<Col span={24} sm={12} md={8} xl={6} onClick={() => navigate('/can-bo')}>
							<CardTitle title="Cán bộ" subTitle="Số cán bộ trong đơn vị" amount={data?.can_bo ?? 0} />
						</Col>
					</Row>
					<Row>
						<Col>
							<span className="title-report">Số liệu cụ thể</span>
						</Col>
					</Row>
					<Row gutter={[12, 12]}>
						<Col span={24} sm={12} md={16}>
							<CardCongViec {...data?.cong_viec_chi_tiet} tong_so={data?.cong_viec} />
						</Col>
						<Col span={24} sm={12} md={8}>
							<CardCanBo nhan_vien={data?.can_bo_xuat_sac} />
						</Col>
					</Row>
				</Spin>
			</div>
		</>
	);
};

export default React.memo(TrangChu);
