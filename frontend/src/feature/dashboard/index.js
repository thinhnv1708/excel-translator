import { Col, Row, Space, Card } from 'antd';
import { useEffect, useState } from 'react';
import { axiosRequest } from '../../net-work';

const numberOfDocMap = {
	total: {
		title: 'Tổng số tệp',
		color: '#001529',
	},
	processing: {
		title: 'Đang xử lý',
		color: '#1677ff',
	},
	success: {
		title: 'Dịch thành công',
		color: '#52c41a',
	},
	error: {
		title: 'Xảy ra lỗi',
		color: '#f5222d',
	},
};

function Dashboard() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));

	const fetchData = async () => {
		setLoading(true);

		const { data = [] } = await axiosRequest({
			path: '/excel-file/get-number-of-docs',
			method: 'get',
		});

		setData(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<h2>{`Xin chào ${userInfo.name || userInfo.username}`}</h2>
			<Row gutter={[16, 16]}>
				{data.map((item, index) => {
					const { state, value } = item;

					return (
						<Col key={index} span={6}>
							<Card
								loading={loading}
								title={numberOfDocMap[state].title}
								key={state}
								bordered={false}
								headStyle={{ background: numberOfDocMap[state].color, color: 'white' }}
							>
								<h2>{value}</h2>
							</Card>
						</Col>
					);
				})}
			</Row>
		</Space>
	);
}

export default Dashboard;
