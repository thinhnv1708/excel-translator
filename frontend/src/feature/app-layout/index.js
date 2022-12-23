import React, { useState } from 'react';
import './index.css';
import {
	DashboardOutlined,
	MenuFoldOutlined,
	FileExcelOutlined,
	MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import FileManagement from '../file-management';

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout className="layout" style={{minHeight: '100vh'}}>
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
			>
				<div className="logo" />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['1']}
					items={[
						{
							key: '1',
							icon: <DashboardOutlined />,
							label: 'Bảng điều khiển',
							onClick: () => console.log('click Bảng điều khiển'),
						},
						{
							key: '2',
							icon: <FileExcelOutlined />,
							label: 'Quản lý tệp',
							onClick: () => console.log('click Quản lý tệp'),
						},
					]}
				/>
			</Sider>
			<Layout className="site-layout">
				<Header style={{ padding: '16px', background: colorBgContainer, position: 'fixed', width: '100%', zIndex: 999 }}>
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: 'trigger',
						onClick: () => setCollapsed(!collapsed),
						style: { margin: '0 8px' },
					})}
				</Header>
				<Content
					style={{
						margin: '70px 0px 24px 16px',
						minHeight: 280,
						background: colorBgContainer,
					}}
				>
					<FileManagement />
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©2018 Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
};

export default AppLayout;
