import { useEffect, useState } from 'react';
import './App.css';
import AppLayout from './feature/app-layout';
import Login from './feature/login';
import { axiosRequest } from './net-work';
import StateEventEmiter from './state-event-emiter';
const stateEventEmiter = StateEventEmiter.getInstance();

function App() {
	const [isLogin, setIsLogin] = useState(false);

	stateEventEmiter.on('login', () => {
		setIsLogin(true);
	});
	stateEventEmiter.on('logout', () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userInfo');
		setIsLogin(false);
	});

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (!token) {
			setIsLogin(false);
		}

		axiosRequest({
			path: '/auth/get-me-info',
			method: 'get',
		}).then(({ error, data }) => {
			if (!error) {
				setIsLogin(true);
			}
		});
	}, []);

	return <div className="app">{isLogin ? <AppLayout /> : <Login />}</div>;
}

export default App;
