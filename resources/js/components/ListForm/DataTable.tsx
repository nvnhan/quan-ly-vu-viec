import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Button from 'antd/lib/button/index';
import Dropdown from 'antd/lib/dropdown/index';
import Input from 'antd/lib/input/index';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import Menu from 'antd/lib/menu/index';
import Modal from 'antd/lib/modal';
import Table from 'antd/lib/table/index';
import isEmpty from 'lodash/isEmpty';
import type { ColumnType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
import { ListFormProps } from '.';
import { RootState } from '../../store';

export interface ColumnProps extends ColumnType<any> {
	title: string;
	dataIndex: string;
	width: number;
	optFind?: boolean;
	ellipsis?: boolean;
	optFilter?: boolean;
	fixedFilter?: object[];
	key?: string;
	render?: (text: any, record?: any, index?: number) => any;
	sorter?: (a: any, b: any) => number;
	roles?: string[];
}

export interface OtherActionProps {
	key: string;
	title: string;
	onClick: (props: any) => void;
	icon?: JSX.Element;
	color?: string;
}

interface DataTableProps extends ListFormProps {
	selectedRowKeys: string[];
	data: any[];
	isLoading: boolean;
	pagination: { [index: string]: any };
	onDelete: (props: any) => void;
	handleEdit: (props: any) => void;
	onChangeSelect: (props: any) => void;
	onChange: (pagination: any, filter: any, sort: any) => void;
}

const DataTable = (props: DataTableProps) => {
	const {
		selectedRowKeys,
		data,
		isLoading,
		columns,
		selectable,
		editable,
		deleteable,
		tableSize,
		onDelete,
		handleEdit,
		onChangeSelect,
		onChange,
		otherActions,
		expandedRowRender,
		renderFooter,
		renderSummary,
		checkUserDoAction,
		ajax,
		addStt,
	} = props;
	const [myColumns, setMyColumns] = useState<ColumnProps[]>([]);
	const authUser = useSelector((state: RootState) => state.authUserReducer);

	let searchText = '';
	let searchedColumn = '';
	let searchInput: any;
	let pagination = props.pagination;
	if (!ajax) delete pagination.total;

	// Chỉ chạy khi load lại data từ List Form:
	// + mở form (cho dù có dữ liệu hay ko)
	// + set filter
	// Ko áp dụng khi thêm mới hoặc chỉnh sửa data => Phần Lọc dữ liệu cột KHÔNG ĐƯỢC TÍNH LẠI
	useEffect(() => {
		// if (!isEmpty(data))
		setMyColumns(calColumns());
	}, [isLoading]);

	/**
	 * Tính các cột cần thiết
	 */
	const calColumns = (): ColumnProps[] => {
		let cols = columns.filter((column) => !column.roles || authUser.admin).map((column) => getColumn(column, data));

		if (addStt) cols.unshift(addSTTColumn());
		if (editable || deleteable || !isEmpty(otherActions)) cols.push(addActionColumn());
		return cols;
	};

	/**
	 * Create column for ant's table
	 */
	const getColumn = (column: ColumnProps, data: any): ColumnProps => {
		if (!data) return column;
		if (column.optFilter) {
			// Lọc dữ liệu và mô tả các cột dữ liệu
			const objs =
				column.fixedFilter !== undefined ? [] : [...new Set(data.map((x: any) => x[column.dataIndex]))];

			const filters =
				column.fixedFilter ??
				objs.map((el) => {
					return {
						text: el !== null ? el : '(không có)',
						value: el,
					};
				});
			Object.assign(column, {
				filters,
				// specify the condition of filtering result
				// here is that finding the name started with `value`
				onFilter: ajax
					? undefined
					: (value: string, record: { [index: string]: any }) =>
							record[column.dataIndex] === value ||
							(record[column.dataIndex] !== null && record[column.dataIndex].indexOf(value) === 0),
			});
		} else if (column.optFind) {
			Object.assign(column, {
				...getColumnSearchProps(column.dataIndex),
			});
		}
		return column;
	};

	/**
	 * Thêm cột STT cho table
	 */
	const addSTTColumn = (): any => ({
		title: 'TT',
		key: 'stt',
		align: 'center',
		width: 30,
		render: (text: string, record: any, index: number) =>
			index !== undefined && <b>{index + 1 + (ajax ? (pagination.current - 1) * pagination.pageSize : 0)}</b>,
	});
	/**
	 * Thêm cột chức năng cho table
	 */
	const addActionColumn = (): any => ({
		title: '',
		key: 'action',
		fixed: 'right',
		align: 'center',
		width: 60,
		render: (text: string, record: any) => {
			if (checkUserDoAction && record['nguoi_tao'] !== authUser.ten_dang_nhap && !authUser.admin) return <></>;
			else
				return (
					<Dropdown overlay={layAction(record)}>
						<Button>
							<MenuOutlined />
						</Button>
					</Dropdown>
				);
		},
	});

	const layAction = (record: any) => {
		let items: ItemType[] =
			otherActions?.map((act) => ({
				key: act.key,
				onClick: () => act.onClick(record),
				style: {
					color: act.color,
				},
				label: (
					<>
						{act.icon} {act.title}
					</>
				),
			})) ?? [];
		editable &&
			items.push({
				key: 'edit',
				onClick: () => handleEdit(record),
				className: 'color-link',
				label: (
					<>
						<EditOutlined /> Chỉnh sửa
					</>
				),
			});
		deleteable &&
			items.push({
				key: 'delete',
				onClick: () => {
					Modal.confirm({
						title: 'Đồng chí có chắc chắn xóa thông tin này?',
						icon: <ExclamationCircleOutlined />,
						content: 'Lưu ý: Thao tác không thể hoàn lại',
						okText: 'Xóa',
						okType: 'danger',
						cancelText: 'Hủy',
						onOk: () => onDelete(record),
					});
				},
				danger: true,
				label: (
					<>
						<DeleteOutlined /> Xóa
					</>
				),
			});
		return <Menu items={items} />;
	};

	/**
	 * Thao tác tìm kiếm trên cột
	 */
	const getColumnSearchProps = (dataIndex: string) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						searchInput = node;
					}}
					placeholder="Tìm kiếm..."
					value={selectedKeys ? selectedKeys[0] : ''}
					onChange={(e) => {
						setSelectedKeys(e.target.value ? [e.target.value] : []);
					}}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						width: 188,
						marginBottom: 8,
						display: 'block',
					}}
				/>
				<Button
					type="primary"
					onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
					icon={<SearchOutlined />}
					size="small"
					style={{
						width: 90,
						marginRight: 8,
					}}
				>
					Tìm
				</Button>
				<Button onClick={() => handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>
					Hủy
				</Button>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined
				style={{
					color: filtered ? '#731a2b' : undefined,
				}}
			/>
		),
		onFilter: (value: string, record: any) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible: boolean) => visible && setTimeout(() => searchInput.select()),
		render: (text: string) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: '#fdfa5f',
						padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text.toString()}
				/>
			) : (
				text
			),
	});

	const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: string) => {
		searchedColumn = dataIndex;
		searchText = selectedKeys[0];
		confirm();
	};

	const handleReset = (clearFilters: () => void, confirm: () => void) => {
		searchedColumn = '';
		searchText = '';
		clearFilters();
		confirm();
	};

	const rowSelection: any = {
		selectedRowKeys,
		onChange: onChangeSelect,
		hideDefaultSelections: true,
		columnWidth: 43,
		selections: [
			Table.SELECTION_ALL,
			Table.SELECTION_INVERT,
			{
				key: 'invert_all',
				text: 'Bỏ chọn tất cả',
				onSelect: () => onChangeSelect([]),
			},
		],
	};

	const getExpanded = (): any => {
		if (expandedRowRender)
			return {
				expandedRowRender: (record: any) => expandedRowRender(record),
			};
		return null;
	};

	return (
		<Table
			dataSource={data}
			columns={myColumns as any[]}
			loading={isLoading}
			rowKey={(row) => row[props.primaryKey as string]}
			rowSelection={selectable ? rowSelection : null}
			locale={{
				filterConfirm: 'Lọc',
				filterReset: 'Hủy',
				emptyText: 'Không có dữ liệu',
				cancelSort: 'Click để Bỏ sắp xếp',
				triggerAsc: 'Click để Sắp xếp tăng dần',
				triggerDesc: 'Click để Sắp xếp giảm dần',
				selectionAll: 'Chọn tất cả dữ liệu',
				selectInvert: 'Đảo chọn trang hiện tại',
			}}
			scroll={tableSize}
			expandable={getExpanded()}
			footer={renderFooter ? () => renderFooter(data) : undefined}
			summary={renderSummary ? () => renderSummary(data) : undefined}
			pagination={pagination}
			onChange={onChange}
		/>
	);
};

export default React.memo(DataTable);
