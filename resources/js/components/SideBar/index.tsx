import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader, SubMenu } from 'react-pro-sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toogleSideBar } from '../../reducers/sideBar';
import { RootState } from '../../store';
import items, { SideBarItem } from './SideBarItems';

const SideBar = () => {
	const dispatch = useDispatch();
	const authUser = useSelector((state: RootState) => state.authUserReducer);
	const menuActive = useSelector((state: RootState) => state.menuActiveReducer);
	const sideBarCollapsed = useSelector((state: RootState) => state.sideBarReducer.collapsed);
	const sideBarToggled = useSelector((state: RootState) => state.sideBarReducer.toggled);
	const [soLieuCongViec, setSoLieuCongViec] = useState<{ [key: string]: number }>();

	useEffect(() => {
		axios.get(`/api/so-lieu-cong-viec`).then((response) => setSoLieuCongViec(response.data?.data));
	}, []);

	const onToggle = (toggled: boolean) => dispatch(toogleSideBar({ toggled }));

	const selectedSubMenu = () => 'SUB_' + menuActive.split('_')[0];

	const genSuffix = (key: string) => {
		if (key === 'SUB_CV' && soLieuCongViec?.moi_giao !== 0) return <span className="badge badge-gray"></span>;
		if (key === 'CV_CUA_TOI' && soLieuCongViec?.moi_giao !== 0)
			return <span className="badge">{soLieuCongViec?.moi_giao ?? 0}</span>;
		return null;
	};

	const genMenuItem = (item: SideBarItem, index: number) => {
		if (item.role && !authUser[item.role]) return <React.Fragment key={item.key}></React.Fragment>;

		return (
			<MenuItem key={item.key} icon={item.icon} active={menuActive === item.key} suffix={genSuffix(item.key)}>
				{item.title}
				<Link to={item.href ?? '#'} />
			</MenuItem>
		);
	};

	const genMenu = (item: SideBarItem, index: number) => {
		if (item.role && !authUser[item.role]) return <React.Fragment key={item.key}></React.Fragment>;

		if (item.childs) {
			// Has childs
			return (
				<SubMenu
					key={item.key}
					icon={item.icon}
					title={item.title}
					suffix={genSuffix(item.key)}
					defaultOpen={item.key === selectedSubMenu()}
				>
					{item.childs.map(genMenuItem)}
				</SubMenu>
			);
		} else {
			return genMenuItem(item, index);
		}
	};

	const genSiderMenu = (items: any) => items.map(genMenu);

	return (
		<ProSidebar
			breakPoint="lg"
			image="/images/bg.webp"
			collapsed={sideBarCollapsed}
			toggled={sideBarToggled}
			onToggle={onToggle}
		>
			<SidebarHeader>
				<div className="logo">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							d="M5 1c-1.105 0-2 .9-2 2v19c0 1.1.895 2 2 2h14c1.105 0 2-.9 2-2V3c0-1.1-.895-2-2-2H5z"
							fill="#2b7014"
						></path>
						<path
							d="M6 1c-1.105 0-2 .9-2 2v18c0 1.1.895 2 2 2h12c1.105 0 2-.9 2-2V3c0-1.1-.895-2-2-2H6z"
							fill="#ecf0f1"
						></path>
						<path d="M15 22v-2h4v-4c1.105 0 2 .9 2 2v2c0 1.1-.895 2-2 2h-4z" fill="#2ecc71"></path>
						<path d="M15 11v2h4v4c1.105 0 2-.9 2-2v-2c0-1.1-.895-2-2-2h-4z" fill="#e74c3c"></path>
						<path d="M15 6v2h4v4c1.105 0 2-.9 2-2V8c0-1.1-.895-2-2-2h-4z" fill="#f1c40f"></path>
						<path d="M15 1v2h4v4c1.105 0 2-.9 2-2V3c0-1.1-.895-2-2-2h-4z" fill="#2980b9"></path>
						<path
							d="M5 1c-1.105 0-2 .9-2 2v17h1v4c0-1.1.895-2 2-2h11.281c.74 0 1.373-.4 1.719-1V3c0-1.1-.895-2-2-2H5z"
							fill="#518f3c"
						></path>
						<path
							d="M10.439 11.6c0 .5.108.9.323 1.2.22.3.516.5.889.5.368 0 .663-.2.882-.5.22-.3.329-.7.329-1.2s-.112-.9-.335-1.2c-.22-.3-.516-.4-.889-.4-.364 0-.656.1-.876.4-.215.3-.323.7-.323 1.2m2.548 1.9c-.125.3-.326.5-.603.7-.273.1-.594.2-.963.2-.712 0-1.292-.2-1.74-.8-.443-.5-.664-1.1-.664-2 0-.8.223-1.5.67-2s1.026-.8 1.734-.8c.369 0 .69.1.963.3.277.1.478.4.603.7V9h1.298v4.3c.514-.1.917-.4 1.211-.8s.441-.9.441-1.6c0-.4-.06-.8-.18-1.1-.12-.4-.302-.7-.546-1a4.37 4.37 0 0 0-1.479-1.2c-.588-.3-1.226-.4-1.913-.4-.481 0-.941 0-1.38.2-.439.1-.844.3-1.217.5-.613.4-1.091 1-1.435 1.6-.34.6-.51 1.3-.51 2.1 0 .6.11 1.2.33 1.7.223.6.544 1 .963 1.5.414.4.888.7 1.422.9.539.2 1.112.3 1.721.3.522 0 1.044-.1 1.566-.3.521-.2.967-.4 1.335-.8l.665 1c-.518.4-1.083.7-1.696 1-.609.2-1.228.3-1.858.3-.766 0-1.489-.2-2.168-.4-.679-.3-1.284-.7-1.814-1.2s-.934-1.1-1.211-1.8-.416-1.4-.416-2.2.14-1.5.422-2.2.683-1.3 1.205-1.8 1.129-.9 1.82-1.2c.696-.2 1.417-.4 2.162-.4.928 0 1.771.2 2.529.6.758.3 1.391.8 1.901 1.5.311.4.545.8.702 1.3.161.5.242 1 .242 1.5 0 1.1-.337 2-1.012 2.6-.676.6-1.628.9-2.858.9h-.242v-.9"
							fill="#2b7014"
						></path>
						<path
							d="M2 4v1h2V4H2zm0 3v1h2V7H2zm0 3v1h2v-1H2zm0 3v1h2v-1H2zm0 3v1h2v-1H2zm0 3v1h2v-1H2z"
							fill="#95a5a6"
						></path>
						<path
							d="M5 1c-1.105 0-2 .9-2 2v19c0 1.1.895 2 2 2h1c-1.105 0-2-.9-2-2V3c0-1.1.895-2 2-2H5z"
							fill="#518f3c"
						></path>
						<path
							d="M3 4v1h1V4H3zm0 3v1h1V7H3zm0 3v1h1v-1H3zm0 3v1h1v-1H3zm0 3v1h1v-1H3zm0 3v1h1v-1H3z"
							fill="#2b7014"
						></path>
						<g fill="#bdc3c7">
							<path d="M2 3v1h1V3H2zm0 3v1h1V6H2zm0 3v1h1V9H2zm0 3v1h1v-1H2zm0 3v1h1v-1H2zm0 3v1h1v-1H2zM2 3c-.552 0-1 .4-1 1 0 .5.448 1 1 1V3zM2 6c-.552 0-1 .4-1 1 0 .5.448 1 1 1V6zM2 9c-.552 0-1 .4-1 1 0 .5.448 1 1 1V9zM2 12c-.552 0-1 .4-1 1 0 .5.448 1 1 1v-2zM2 15c-.552 0-1 .4-1 1 0 .5.448 1 1 1v-2zM2 18c-.552 0-1 .4-1 1 0 .5.448 1 1 1v-2z"></path>
						</g>
						<path
							d="M3 3v1h1V3H3zm0 3v1h1V6H3zm0 3v1h1V9H3zm0 3v1h1v-1H3zm0 3v1h1v-1H3zm0 3v1h1v-1H3z"
							fill="#95a5a6"
						></path>
					</svg>
					<span>QUẢN LÝ VỤ VIỆC</span>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<Menu iconShape="circle">{genSiderMenu(items)}</Menu>
			</SidebarContent>
		</ProSidebar>
	);
};

export default React.memo(SideBar);
