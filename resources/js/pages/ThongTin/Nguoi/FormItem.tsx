import ImgCrop from 'antd-img-crop';
import Collapse from 'antd/lib/collapse';
import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import message from 'antd/lib/message';
import Select from 'antd/lib/select';
import Upload from 'antd/lib/upload';
import { RcFile, UploadFile, UploadProps } from 'antd/lib/upload/interface';
import React from 'react';
import MyDatePicker from '../../../components/Controls/MyDatePicker';
import MyDebounceSelect, { SelectValue } from '../../../components/Controls/MyDebounceSelect';
import { required } from '../../../utils/rules';
import { getSearchXaPhuong } from '../../../utils/services';

const form = (props: { fileList: UploadFile[]; setFileList: any }) => {
	const { fileList, setFileList } = props;

	const fetchUnitList = async (q: string): Promise<SelectValue[]> => {
		return getSearchXaPhuong({ q, l: 7 }).then((body) =>
			body?.data?.data.map((item: any) => ({
				label: `${item.loai_don_vi} ${item.ten_don_vi} - ${item.ten_dia_phuong}`,
				value: item.id,
			}))
		);
	};

	const onPreview = async (file: UploadFile) => {
		let src = file.url as string;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj as RcFile);
				reader.onload = () => resolve(reader.result as string);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};

	const beforeUpload = (file: RcFile) => {
		const isLt2M = file.size / 1024 / 1024 < 5;
		if (!isLt2M) {
			message.error('Tập tin tải lên không được quá 5MB!');
			setFileList([]);
		} else setFileList([file]);

		return isLt2M;
	};

	const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

	return (
		<Collapse defaultActiveKey={['ttnt', 'dcct', 'gd', 'ttk']}>
			<Collapse.Panel header="Thông tin nhân thân" key="ttnt">
				<Row gutter={[12, 5]}>
					<Col span={24} sm={6}>
						<ImgCrop rotate aspect={120 / 160} grid modalTitle="Chỉnh sửa">
							<Upload
								maxCount={1}
								listType="picture-card"
								multiple={false}
								onPreview={onPreview}
								fileList={fileList}
								onChange={onChange}
								beforeUpload={beforeUpload}
								action="/upload-dummy"
							>
								{fileList?.length !== 1 && 'Thêm ảnh'}
							</Upload>
						</ImgCrop>
					</Col>

					<Col span={24} sm={18}>
						<Row gutter={[12, 5]}>
							<Col span={12} sm={8}>
								<Form.Item name="ho_ten" label="Họ tên" rules={[required]}>
									<Input placeholder="Nhập họ tên..." />
								</Form.Item>
							</Col>
							<Col span={12} sm={4}>
								<Form.Item name="ten_khac" label="Tên khác">
									<Input />
								</Form.Item>
							</Col>
							<Col span={12} sm={4}>
								<Form.Item name="gioi_tinh" label="Giới tính">
									<Select allowClear>
										<Select.Option value="Nam">Nam</Select.Option>
										<Select.Option value="Nữ">Nữ</Select.Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={12} sm={8} style={{ display: 'flex' }}>
								<Form.Item name="ngay_sinh" label="Ngày sinh" style={{ flex: 1 }}>
									<Input placeholder="Ngày" />
								</Form.Item>
								<Form.Item name="thang_sinh" label=" " style={{ flex: 1 }}>
									<Input placeholder="tháng" />
								</Form.Item>
								<Form.Item name="nam_sinh" label=" " style={{ flex: 1 }}>
									<Input placeholder="năm" />
								</Form.Item>
							</Col>
							<Col span={12} sm={8}>
								<Form.Item name="sdt" label="SĐT">
									<Input />
								</Form.Item>
							</Col>
							<Col span={12} sm={8}>
								<Form.Item name="giay_dinh_danh" label="Giấy định danh">
									<Select>
										<Select.Option value="CMND">CMND</Select.Option>
										<Select.Option value="CCCD">CCCD</Select.Option>
										<Select.Option value="Hộ chiếu">Hộ chiếu</Select.Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={12} sm={8}>
								<Form.Item name="so_dinh_danh" label="Số định danh">
									<Input placeholder="Số CMND/CCCD/ĐDCN" />
								</Form.Item>
							</Col>
							<Col span={12} sm={8}>
								<Form.Item name="noi_cap" label="Nơi cấp">
									<Input />
								</Form.Item>
							</Col>
							<Col span={12} sm={8}>
								<Form.Item name="ngay_cap" label="Ngày cấp">
									<MyDatePicker format="DD/MM/YYYY" />
								</Form.Item>
							</Col>
							<Col span={12} sm={8}>
								<Form.Item name="quoc_tich" label="Quốc tịch">
									<Input />
								</Form.Item>
							</Col>
							<Col span={12} sm={4}>
								<Form.Item name="dan_toc" label="Dân tộc">
									<Input />
								</Form.Item>
							</Col>
							<Col span={12} sm={4}>
								<Form.Item name="ton_giao" label="Tôn giáo">
									<Input />
								</Form.Item>
							</Col>
							<Col span={12} sm={8}>
								<Form.Item name="nghe_nghiep" label="Nghề nghiệp">
									<Input />
								</Form.Item>
							</Col>
							<Col span={12} sm={8}>
								<Form.Item name="noi_lam_viec" label="Nơi làm việc">
									<Input />
								</Form.Item>
							</Col>
						</Row>
					</Col>
				</Row>
			</Collapse.Panel>

			<Collapse.Panel header="Địa chỉ cư trú" key="dcct">
				<Row gutter={[12, 5]}>
					<Col span={24} sm={12}>
						<Form.Item name="noi_sinh" label="Nơi sinh">
							<Input />
						</Form.Item>
					</Col>
					<Col span={24} sm={6}>
						<Form.Item name="thuong_tru" label="Thường trú">
							<Input />
						</Form.Item>
					</Col>
					<Col span={24} sm={6}>
						<Form.Item name="sel_dp_thuong_tru" label="Địa phương thường trú">
							<MyDebounceSelect
								placeholder="Chọn địa phương xã/phường..."
								fetchOptions={fetchUnitList}
								allowClear
							/>
						</Form.Item>
					</Col>
					<Col span={24} sm={6}>
						<Form.Item name="tam_tru" label="Tạm trú">
							<Input />
						</Form.Item>
					</Col>
					<Col span={24} sm={6}>
						<Form.Item name="sel_dp_tam_tru" label="Địa phương tạm trú">
							<MyDebounceSelect
								placeholder="Chọn địa phương xã/phường..."
								fetchOptions={fetchUnitList}
								allowClear
							/>
						</Form.Item>
					</Col>
					<Col span={24} sm={6}>
						<Form.Item name="noi_o_hien_nay" label="Nơi ở hiện nay">
							<Input />
						</Form.Item>
					</Col>
					<Col span={24} sm={6}>
						<Form.Item name="sel_dp_noi_o_hien_nay" label="Địa phương nơi ở hiện nay">
							<MyDebounceSelect
								placeholder="Chọn địa phương xã/phường..."
								fetchOptions={fetchUnitList}
								allowClear
							/>
						</Form.Item>
					</Col>
				</Row>
			</Collapse.Panel>

			<Collapse.Panel header="Gia đình" key="gd">
				<Row gutter={[12, 5]}>
					<Col span={12} sm={6}>
						<Form.Item name="ho_ten_bo" label="Họ tên bố">
							<Input />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="nam_sinh_bo" label="Năm sinh">
							<Input />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="ho_ten_me" label="Họ tên mẹ">
							<Input />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="nam_sinh_me" label="Năm sinh">
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[12, 5]}>
					<Col span={12} sm={6}>
						<Form.Item name="ho_ten_vo_chong" label="Họ tên vợ/chồng">
							<Input />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="nam_sinh_vo_chong" label="Năm sinh">
							<Input />
						</Form.Item>
					</Col>
				</Row>
			</Collapse.Panel>

			<Collapse.Panel header="Thông tin khác" key="ttk">
				<Row gutter={[12, 5]}>
					<Col span={24}>
						<Form.Item name="tats" label="Tiền án tiền sự">
							<Input.TextArea rows={5} />
						</Form.Item>
					</Col>

					<Col span={24} sm={12}>
						<Form.Item name="sel_dp_thong_bao" label="Địa phương gửi thông báo">
							<MyDebounceSelect
								placeholder="Chọn địa phương xã/phường..."
								fetchOptions={fetchUnitList}
								allowClear
							/>
						</Form.Item>
					</Col>
					<Col span={24} sm={12}>
						<Form.Item name="don_vi_tra_cuu" label="Đơn vị tra cứu">
							<Input placeholder="Nơi gửi yêu cầu tra cứu" />
						</Form.Item>
					</Col>
				</Row>
			</Collapse.Panel>
		</Collapse>
	);
};

export default form;
