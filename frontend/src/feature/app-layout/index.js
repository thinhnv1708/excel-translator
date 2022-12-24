import React, { useEffect, useState } from 'react';
import './index.css';
import {
	DashboardOutlined,
	MenuFoldOutlined,
	FileExcelOutlined,
	MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Space, Button } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import FileManagement from '../file-management';
import { Switch, Route, Link } from 'react-router-dom';
import Dashboard from '../dashboard';
import StateEventEmiter from '../../state-event-emiter';
const stateEventEmiter = StateEventEmiter.getInstance();

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	useEffect(() => {
		const userInfoString = localStorage.getItem('userInfo');

		if (userInfoString) {
			setUserInfo(JSON.parse(userInfoString));
		}
	}, []);

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
					defaultSelectedKeys={['1']}
					// items={[
					// 	{
					// 		key: '1',
					// 		icon:  <DashboardOutlined />,
					// 		label: 'Bảng điều khiển',
					// 		// onClick: () => navRouter.push('/'),
					// 	},
					// 	{
					// 		key: '2',
					// 		icon: <FileExcelOutlined />,
					// 		label: 'Quản lý tệp',
					// 		// onClick: () => navRouter.push('/file-management'),
					// 	},
					// ]}
				>
					<Menu.Item key="1" icon={<DashboardOutlined />}>
						<Link to="/">
							<span className="nav-text">Bảng điều khiển</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="2" icon={<FileExcelOutlined />}>
						<Link to="/file-management">Quản lý tệp</Link>
					</Menu.Item>
				</Menu>
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
								<Space style={{ fontWeight: 600 }}>{userInfo?.username}</Space>{' '}
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
