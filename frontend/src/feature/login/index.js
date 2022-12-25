import { Button, Form, Input } from 'antd';
import './index.css';
import StateEventEmiter from '../../state-event-emiter';
import { axiosRequest } from '../../net-work';
const stateEventEmiter = StateEventEmiter.getInstance();

const initialValues = {
	username: '',
	password: '',
	// remember: true
};

const LoginForm = () => {
	const onFinished = async form => {
		const { username, password } = form;

		const { data } = await axiosRequest({
			path: '/auth/login',
			method: 'post',
			data: {
				username,
				password,
			},
		});

		if (data) {
			const { token, username, name } = data;
			localStorage.setItem('token', token);
			localStorage.setItem('userInfo', JSON.stringify({ name, username }));
			stateEventEmiter.emit('login');
		}
	};

	return (
		<div className="login-page">
			<div className="cover-form">
				<div className="app-user-form-header">
					<h1 className="login-page-title">Đăng nhập</h1>
				</div>
				<Form
					onFinish={onFinished}
					className="login-page-form"
					initialValues={initialValues}
				>
					<div className="cover-field">
						<label className="login-page-form_title">Tài khoản</label>
						<Form.Item
							name="username"
							rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
						>
							<Input placeholder="Tài khoản" />
						</Form.Item>
					</div>
					<div className="cover-field">
						<label className="login-page-form_title">Mật khẩu</label>
						<Form.Item
							name="password"
							rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
						>
							<Input type="password" placeholder="Mật khẩu" />
						</Form.Item>
					</div>
					<Form.Item>
						<Button htmlType="submit">Đăng nhập</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default LoginForm;
