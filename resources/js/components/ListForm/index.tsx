import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import Form from 'antd/lib/form/index';
import message from 'antd/lib/message/index';
import Modal from 'antd/lib/modal/index';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { isChangeData, queryString, unionDataBy, useMergeState } from '../../utils';
import { postFormData } from '../../utils/services';
import DataTable, { ColumnProps, OtherActionProps } from './DataTable';
import FilterBox, { FilterProps } from './FilterBox';
import ModalConfirm from './ModalConfirm';
import ToolsButton, { ToolsButtonProps } from './ToolsButton';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import type { ColumnType, TablePaginationConfig } from 'antd/lib/table';
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

	const { url, onChangeData, filter, otherParams, primaryKey, filterBox, ajax, formClass, hasUpload } = props;
	const [state, setState] = useMergeState({
		data: [],
		isLoading: true,
		pagination: {
			current: 1,
			pageSize: 10,
			showTotal: (total: number, range: number[]) => `Hiển thị ${range[0]}-${range[1]} / ${total} mục`,
		},
		modalVisible: false,
		selectedRowKeys: [],
		currentRecord: undefined,
	});
	const { data, isLoading, modalVisible, selectedRowKeys, currentRecord, pagination } = state;
	// Filter của filter-box
	const [ownFilter, setOwnFilter] = useState(filter);

	let isComponentMounted = false;
	//#endregion

	//#region  Sự kiện, hooks
	useEffect(() => {
		isComponentMounted = true;
		// Không Có filter hoặc có filter và đã load xong
		if (ownFilter === undefined || !isEmpty(ownFilter)) fetchData(ownFilter);
		return () => {
			// When Unmount component
			isComponentMounted = false;
		};
	}, [JSON.stringify(ownFilter)]); // Chỉ chạy 1 lần khi mount đến khi filter hoặc ownFilter thay đổi

	/**
	 * Create trigger for calling functions from other component
	 */
	useImperativeHandle(ref, () => ({
		/**
		 * Trả query string về form cha
		 */
		getCurrentQuery: () => queryString(ownFilter),
		/**
		 * Kích hoạt chức năng thêm hoặc chỉnh sửa 1 hoặc nhiều hàng
		 */
		triggerUpdate: (response: any) => doInsertOrUpdateRows(response),

		triggerInsert: () => handleAddNew(),
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

	const handleEdit = (record: any) => {
		setState({
			modalVisible: true,
			currentRecord: record,
		});
		props?.handleEdit && props?.handleEdit(record);
	};

	/**
	 * Click Lọc từ filter Box => set lại ownfilter => load lại data từ useEffect
	 */
	const handleFilterBox = (newFilter: object) =>
		isChangeData(newFilter, ownFilter) && setOwnFilter({ ...ownFilter, ...newFilter });

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

	const handleTableChange = (
		newPagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<any> | SorterResult<any>[]
	) => {
		if (ajax) {
			isComponentMounted = true;
			const objSort = Array.isArray(sorter) ? sorter.pop() : sorter;
			fetchData(
				{ ...ownFilter, ...filters, sort: objSort?.column?.dataIndex, order: objSort?.order?.slice(0, -3) },
				{
					pagination: newPagination,
				}
			);
		} else {
			setState({
				pagination: {
					...pagination,
					...newPagination,
				},
			});
		}
	};

	const onChangeSelect = (selectedRowKeys: string[]): void => setState({ selectedRowKeys });

	const doInsertOrUpdateRows = (response: any, callback?: () => void) => {
		if (response.data.success) {
			// Thêm object vào list lấy từ state
			// const newData = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
			const mergedData = unionDataBy(data, response.data.data, primaryKey ?? 'id'); // New data is first line
			// let mergedData = [...data];
			// newData.forEach((update: any) => {
			// 	mergedData = mergedData.map((item: any) =>
			// 		item[primaryKey ?? 'id'] === update[primaryKey ?? 'id'] ? update : item
			// 	);
			// });
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
		if (hasUpload) {
			postFormData(url, value)
				.then((response) => doInsertOrUpdateRows(response, callback))
				.catch((error) => console.log(error));
		} else
			axios
				.post(`/api/${url}`, value)
				.then((response) => doInsertOrUpdateRows(response, callback))
				.catch((error) => console.log(error));
	};

	const onUpdate = (value: { [index: string]: any }, callback?: () => void) => {
		if (hasUpload)
			postFormData(`${url}/${currentRecord[primaryKey as string]}`, value)
				.then((response) => doInsertOrUpdateRows(response, callback))
				.catch((error) => console.log(error));
		else
			axios
				.put(`/api/${url}/${currentRecord[primaryKey as string]}`, value)
				.then((response) => doInsertOrUpdateRows(response, callback))
				.catch((error) => console.log(error));
	};

	const onDelete = (record: any) => {
		record !== undefined &&
			axios
				.delete(`/api/${url}/${record[primaryKey as string]}`)
				.then((response) => {
					if (response.data.success) {
						const newData = data.filter(
							(item: any) => item[primaryKey as string] !== record[primaryKey as string]
						);
						setState({
							data: newData,
							currentRecord: undefined,
						});
						message.info(response.data.message);
						if (onChangeData) onChangeData(newData);
					} else message.error(response.data.message);
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
			title: 'Đồng chí muốn xóa những thông tin này?',
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
		<div className={formClass}>
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
				onDelete={onDelete}
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
	formClass: 'list-form',
	hasUpload: false,
	addStt: false,
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
	handleEdit?: any;
} & Partial<typeof defaultProps>;

ListForm.defaultProps = defaultProps;

export interface ListFormRef {
	getCurrentQuery: () => string;
	triggerUpdate: (response: any) => void;
	triggerInsert: () => void;
}
export default React.memo(ListForm);
