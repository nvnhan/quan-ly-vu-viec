import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import items from './SideBarItems';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
// import * as image from '../../../asset/bg.webp';
import { toggleSidebar } from '../../actions';
import { User } from '../../utils';
import { AppState } from '../../reducers';

const SideBar = memo((props) => {
	const dispatch = useDispatch();
	const menuActive = useSelector<AppState>((state) => state.menuActive) as string;
	const authUser = useSelector<AppState>((state) => state.authUser) as User;
	const sideBarCollapsed = useSelector<AppState>((state) => state.sideBar.collapsed) as boolean;
	const sideBarToggled = useSelector<AppState>((state) => state.sideBar.toggled) as boolean;

	const onToggle = (toggled: boolean) => dispatch(toggleSidebar(toggled));

	const selectedSubMenu = () => 'SUB_' + menuActive.split('_')[0];

	const genMenuItem = (item: any, index: number) => {
		if (item.role && !authUser.roles[item.role]) return <React.Fragment key={item.key}></React.Fragment>;

		return (
			<MenuItem key={item.key} icon={item.icon} active={menuActive === item.key}>
				{item.title}
				<Link to={item.href} />
			</MenuItem>
		);
	};

	const genMenu = (item: any, index: number) => {
		if (item.role && !authUser.roles[item.role]) return <React.Fragment key={item.key}></React.Fragment>;

		if (item.childs) {
			// Has childs
			return (
				<SubMenu
					key={item.key}
					icon={item.icon}
					title={item.title}
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
			// image={image}
			collapsed={sideBarCollapsed}
			toggled={sideBarToggled}
			onToggle={onToggle}
		>
			<SidebarHeader>
				<div className="logo">
					<img src="/images/logo.png" />
					<span>QLVV</span>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<Menu iconShape="circle">{genSiderMenu(items)}</Menu>
			</SidebarContent>
		</ProSidebar>
	);
});

export default SideBar;
