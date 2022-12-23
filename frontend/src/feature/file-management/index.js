import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import qs from 'qs';
import axios from 'axios';
import moment from 'moment';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { axiosRequest } from '../../net-work';

const STATE_MAP = {
	PROCESSING: 'Đang xử lý',
	SUCCESS: 'Đã dịch xong',
	ERROR: 'Xảy ra lỗi',
};

const onClickDowloadFile = url => {
	console.log(url);
	axios.get(url);
};

const columns = [
	{
		title: 'Tên tệp',
		dataIndex: 'title',
	},
	{
		title: 'Trạng thái',
		dataIndex: 'state',
		render: state => STATE_MAP[state],
	},
	{
		title: 'Tải tệp gốc',
		dataIndex: '_id',
		render: id => {
			return (
				<Button
					type="primary"
					icon={<DownloadOutlined />}
					size="small"
					onClick={() =>
						onClickDowloadFile(
							`http://localhost:3001/excel-file/download-original-file/${id}`
						)
					}
				>
					Tải tệp gốc
				</Button>
			);
		},
	},
	{
		title: 'Tải tệp đã dịch',
		dataIndex: '_id',
		render: id => {
			return (
				<Button type="primary" icon={<DownloadOutlined />} size="small">
					Tải tệp đã dịch
				</Button>
			);
		},
	},
	{
		title: 'Ngày nhập tệp',
		dataIndex: 'createdAt',
		render: createdAt => moment(createdAt).format('HH:MM:ss DD-MM-YYYY'),
	},
	{
		title: 'Ngày cập nhật tệp',
		dataIndex: 'updatedAt',
		render: updatedAt => moment(updatedAt).format('HH:MM:ss DD-MM-YYYY'),
	},
];

const getRandomuserParams = params => ({
	results: params.pagination?.pageSize,
	page: params.pagination?.current,
	...params,
});

const FileManagement = () => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	});

	const fetchData = async () => {
		setLoading(true);

		const { data = {}, error } = await axiosRequest({
			url: `http://localhost:3001/excel-file?${qs.stringify(
				getRandomuserParams(tableParams)
			)}`,
			method: 'get',
		});

		const { docs = [], totalDocs = 0 } = data;

		setData(docs);
		setLoading(false);
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				total: totalDocs,
			},
		});
	};

	useEffect(() => {
		fetchData();
	}, [JSON.stringify(tableParams)]);

	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});

		// `dataSource` is useless since `pageSize` changed
		if (pagination.pageSize !== tableParams.pagination?.pageSize) {
			setData([]);
		}
	};

	return (
		<Table
			columns={columns}
			rowKey={record => record._id}
			dataSource={data}
			pagination={tableParams.pagination}
			loading={loading}
			onChange={handleTableChange}
			scroll={{ x: true }}
		/>
	);
};

export default FileManagement;
