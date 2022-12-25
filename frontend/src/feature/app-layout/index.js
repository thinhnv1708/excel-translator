import {
	DashboardOutlined,
	FileExcelOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Space, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import StateEventEmiter from '../../state-event-emiter';
import Dashboard from '../dashboard';
import FileManagement from '../file-management';
import './index.css';

const stateEventEmiter = StateEventEmiter.getInstance();

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
	const [collapsed, setCollapsed] = useState(false);

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const userInfoString = localStorage.getItem('userInfo');

	const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

	const onClickLogout = () => {
		stateEventEmiter.emit('logout');
	};

	return (
		<Layout className="layout" style={{ minHeight: '100vh' }}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="logo"></div>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={[useLocation().pathname]}
					items={[
						{
							key: '/',
							icon: (
								<Link to="/">
									<DashboardOutlined />
								</Link>
							),
							label: 'Bảng điều khiển',
						},
						{
							key: '/file-management',
							icon: (
								<Link to="/file-management">
									<FileExcelOutlined />
								</Link>
							),
							label: 'Quản lý tệp',
						},
					]}
				/>
			</Sider>
			<Layout className="site-layout">
				<Header
					style={{
						padding: '16px',
						background: colorBgContainer,
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Space direction="vertical">
						{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
							className: 'trigger',
							onClick: () => setCollapsed(!collapsed),
							style: { margin: '0 8px' },
						})}
					</Space>

					<Space direction="vertical">
						{userInfo ? (
							<Space>
								<Space style={{ fontWeight: 600 }}>{userInfo?.name}</Space>{' '}
								<Button
									type="ghost"
									style={{ color: 'red', fontWeight: 600 }}
									onClick={onClickLogout}
								>
									Đăng xuất
								</Button>
							</Space>
						) : (
							''
						)}
					</Space>
				</Header>
				<Content
					style={{
						minHeight: 280,
						background: colorBgContainer,
						padding: '16px',
					}}
				>
					<Switch>
						<Route exact path="/">
							<Dashboard />
						</Route>
						<Route path="/file-management">
							<FileManagement />
						</Route>
					</Switch>
					{/* <FileManagement /> */}
					{/* <Dashboard></Dashboard> */}
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©2018 Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
};

export default AppLayout;
