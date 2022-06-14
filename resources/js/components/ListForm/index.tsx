import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import Form from 'antd/lib/form/index';
import message from 'antd/lib/message/index';
import Modal from 'antd/lib/modal/index';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import unionBy from 'lodash/unionBy';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { isChangeData, queryString, useMergeState } from '../../utils';
import DataTable, { ColumnProps, OtherActionProps } from './DataTable';
import FilterBox, { FilterProps } from './FilterBox';
import ModalConfirm from './ModalConfirm';
import ToolsButton, { ToolsButtonProps } from './ToolsButton';

const { confirm } = Modal;

/**
 * Form base for other components
 *
 * @param {*} props
 * @returns
 */
const ListForm = React.forwardRef<ListFormRef, ListFormProps>((props, ref) => {
	//#region  Khai báo biến
	const [form] = Form.useForm();
	const authUser = useSelector((state: RootState) => state.authUserReducer);

	const { url, onChangeData, filter, otherParams, primaryKey, filterBox, ajax } = props;
	const [state, setState] = useMergeState({
		data: [],
		isLoading: true,
		pagination: {
			current: 1,
			pageSize: 10,
			showTotal: (total: number, range: number[]) => `Hiển thị ${range[0]}-${range[1]} / ${total} mục`,
		},
		modalVisible: false,
		modalDeleteVisible: false,
		selectedRowKeys: [],
		currentRecord: undefined,
	});
	const { data, isLoading, modalVisible, modalDeleteVisible, selectedRowKeys, currentRecord, pagination } = state;
	// Filter của filter-box
	const [ownFilter, setOwnFilter] = useState(filter);

	let isComponentMounted = false;
	// Final filter: Filter <= props, OwnFilter <= FilterBox
	const finalFilter = { ...(filter ?? {}), ...ownFilter };
	//#endregion

	//#region  Sự kiện, hooks
	useEffect(() => {
		isComponentMounted = true;
		// Không Có filter hoặc có filter và đã load xong
		if (finalFilter === undefined || !isEmpty(finalFilter)) fetchData(finalFilter);
		return () => {
			// When Unmount component
			isComponentMounted = false;
		};
	}, [JSON.stringify(finalFilter)]); // Chỉ chạy 1 lần khi mount đến khi filter hoặc ownFilter thay đổi

	/**
	 * Create trigger for calling functions from other component
	 */
	useImperativeHandle(ref, () => ({
		/**
		 * Trả query string về form cha
		 */
		getCurrentQuery: () => queryString(finalFilter),
		/**
		 * Kích hoạt chức năng thêm hoặc chỉnh sửa 1 hoặc nhiều hàng
		 */
		triggerUpdate: (response: any) => doInsertOrUpdateRows(response),
	}));
	//#endregion

	//#region  Triggers from components
	/**
	 * Show modal Thêm mới, Sửa
	 */
	const handleOkModal = (value: object, callback: () => void): void => {
		if (currentRecord === undefined) {
			onAdd(value, callback); // Thêm mới
		} else if (isChangeData(value, currentRecord)) {
			onUpdate(value, callback); // Chỉnh sửa
		} else message.info('Dữ liệu không đổi');
	};

	const handleCancelModal = () =>
		setState({
			modalVisible: false,
			modalDeleteVisible: false,
			currentRecord: undefined,
		});
	/**
	 * Xử lý sự kiện người dùng
	 */
	const handleAddNew = () =>
		setState({
			currentRecord: undefined,
			modalVisible: true,
		});

	const handleEdit = (record: any) =>
		setState({
			modalVisible: true,
			currentRecord: record,
		});

	/**
	 * Click Lọc từ filter Box => set lại ownfilter => load lại data từ useEffect
	 */
	const handleFilterBox = (newFilter: object) => isChangeData(newFilter, ownFilter) && setOwnFilter(newFilter);

	const handleDelete = (record: any) =>
		setState({
			modalDeleteVisible: true,
			currentRecord: record,
		});

	//#endregion

	//#region  Thực thi các sự kiện
	const fetchData = (query?: { [index: string]: any }, params?: any) => {
		const newPagination = ajax ? (params ? params.pagination : pagination) : {};
		console.log('♦ Load data from server in ListForm, query, pagination => ', query, newPagination);
		// Set lại data và loading cho các Component con
		setState({ data: [], isLoading: true });

		axios
			.get(`/api/${url}?` + queryString({ ...query, ...{ p: newPagination.current, s: newPagination.pageSize } }))
			.then((response) => {
				if (isComponentMounted && response.data.success) {
					//  Tính lại AutoComplete (nhúng trong Modal form) & columns cho 1 số form
					onChangeData && onChangeData(response.data.data, query);
					setState({
						data: response.data.data,
						isLoading: false,
						pagination: {
							...pagination,
							...newPagination,
							total: ajax ? response.data.total : response.data.data.length,
						},
					});
				}
			})
			.catch((error) => console.log(error));
	};

	const handleTableChange = (newPagination: object, filters: object, sorter: object) => {
		if (ajax) {
			isComponentMounted = true;
			fetchData(
				{ ...finalFilter, ...filters },
				{
					pagination: newPagination,
				}
			);
		} else
			setState({
				pagination: {
					...pagination,
					...newPagination,
				},
			});
	};

	const onChangeSelect = (selectedRowKeys: string[]): void => setState({ selectedRowKeys });

	const doInsertOrUpdateRows = (response: any, callback?: () => void) => {
		if (response.data.success) {
			// Thêm object vào list lấy từ state
			const newData = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
			// const mergedData = unionBy(newData, data, primaryKey); // New data is first line
			let mergedData = [...data];
			newData.forEach((update: any) => {
				mergedData = mergedData.map((item: any) =>
					item[primaryKey ?? 'id'] === update[primaryKey ?? 'id'] ? update : item
				);
			});
			setState({
				data: mergedData,
				selectedRowKeys: [],
			});
			message.info(response.data.message);
			callback && callback(); // Callback from ModalConfirm to change loading button state
			onChangeData && onChangeData(mergedData); // Callback from main form to recalc data
		} else message.error(response.data.message);
	};

	const onAdd = (value: { [index: string]: any }, callback?: () => void) => {
		if (otherParams !== undefined) value = Object.assign(value, otherParams);
		axios
			.post(`/api/${url}`, value)
			.then((response) => doInsertOrUpdateRows(response, callback))
			.catch((error) => console.log(error));
	};

	const onUpdate = (value: { [index: string]: any }, callback?: () => void) => {
		axios
			.put(`/api/${url}/${currentRecord[primaryKey as string]}`, value)
			.then((response) => doInsertOrUpdateRows(response, callback))
			.catch((error) => console.log(error));
	};

	const onDelete = () => {
		currentRecord !== undefined &&
			axios
				.delete(`/api/${url}/${currentRecord[primaryKey as string]}`)
				.then((response) => {
					if (response.data.success) {
						const newData = data.filter(
							(item: { [index: string]: any }) =>
								item[primaryKey as string] !== currentRecord[primaryKey as string]
						);
						setState({
							data: newData,
							modalDeleteVisible: false,
							currentRecord: undefined,
						});
						message.info(response.data.message);
						if (onChangeData) onChangeData(newData);
					}
				})
				.catch((error) => console.log(error));
	};

	const doDeletes = () => {
		axios
			.delete(`/api/${url}/deletes`, {
				params: {
					objects: selectedRowKeys.join('|'),
				},
			})
			.then((response) => {
				if (response.data.success) {
					const newData = data.filter(
						(item: { [index: string]: any }) => selectedRowKeys.indexOf(item[primaryKey as string]) === -1
					);
					setState({
						data: newData,
						selectedRowKeys: [],
					});
					onChangeData && onChangeData(newData);
					message.info(response.data.message);
				}
			})
			.catch((error) => console.log(error));
	};

	const onMultiDelete = () => {
		confirm({
			title: 'Bạn muốn xóa những mục này?',
			icon: <ExclamationCircleOutlined />,
			content: 'Tất cả ' + selectedRowKeys.length + ' mục',
			okText: 'Đồng ý',
			okType: 'danger',
			cancelText: 'Không',
			onOk: doDeletes,
		});
	};
	//#endregion

	return (
		<div className="list-form">
			{filterBox && <FilterBox {...props} onFilter={handleFilterBox} />}
			<ToolsButton
				{...props}
				data={data}
				selectedRowKeys={selectedRowKeys}
				handleAddNew={handleAddNew}
				onMultiDelete={onMultiDelete}
			/>
			<DataTable
				{...props}
				data={data}
				isLoading={isLoading}
				pagination={pagination}
				onChange={handleTableChange}
				selectedRowKeys={selectedRowKeys}
				onChangeSelect={onChangeSelect}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
			{props.formTemplate !== undefined && (
				<ModalConfirm
					{...props}
					form={form}
					modalVisible={modalVisible}
					currentRecord={currentRecord}
					handleOk={handleOkModal}
					handleCancel={handleCancelModal}
				/>
			)}
			<Modal
				visible={modalDeleteVisible}
				onOk={onDelete}
				onCancel={handleCancelModal}
				title="Bạn muốn xóa mục này?"
				okText="Xóa"
				cancelText="Hủy"
				okType="danger"
			>
				<p>Lưu ý: Thao tác không thể hoàn tác</p>
			</Modal>
		</div>
	);
});

const defaultProps = {
	selectable: true,
	insertable: true,
	editable: true,
	deleteable: true,
	primaryKey: 'id',
	ajax: false,
	tableSize: {
		x: 500,
	},
	filterBox: false,
	tuNgayDenNgay: true,
};

export type ListFormProps = {
	url: string;
	columns: ColumnProps[];
	onChangeData?: (data: any[], query?: object) => void;
	otherActions?: OtherActionProps[];

	formTemplate?: React.ReactNode;
	modalWidth?: string | number;
	formInitialValues?: object;
	otherButtons?: ToolsButtonProps[];

	filter?: { [index: string]: any };
	otherFilter?: FilterProps[];
	filterInitialValue?: object;
	otherParams?: object;

	renderFooter?: (data: any[]) => any;
	renderSummary?: (data: any[]) => any;
	expandedRowRender?: (props: any) => void;

	setFormValues?: { [index: string]: any };
	ref?: any;
	checkUserDoAction?: boolean;
} & Partial<typeof defaultProps>;

ListForm.defaultProps = defaultProps;

export interface ListFormRef {
	getCurrentQuery: () => string;
	triggerUpdate: (response: any) => void;
}
export default React.memo(ListForm);
