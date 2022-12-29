import React, { useEffect, useState } from 'react';
import './index.css';
import { Table, Badge } from 'antd';
import moment from 'moment';
import { Button, Space, Form, Input, Select, Upload, message } from 'antd';
import {
	DownloadOutlined,
	ReloadOutlined,
	SearchOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import { axiosRequest, downloadFile, getUploadProps } from '../../net-work';
import StateEventEmiter from '../../state-event-emiter';
const stateEventEmiter = StateEventEmiter.getInstance();

const STATE_MAP = {
	processing: { status: 'processing', text: 'Đang xử lý' },
	success: { status: 'success', text: 'Dịch thành công' },
	error: { status: 'error', text: 'Xảy ra lỗi' },
};

const stateOptions = [
	{ value: 'processing', label: 'Đang xử lý' },
	{ value: 'success', label: 'Dịch thành công' },
	{ value: 'error', label: 'Xảy ra lỗi' },
];

const onClickDowloadFile = ({ path, fileName }) => {
	downloadFile({ path, fileName });
};

const columns = [
	{
		title: 'Tên tệp',
		dataIndex: 'title',
		filteredValue: {},
	},
	{
		title: 'Trạng thái',
		dataIndex: 'state',
		render: state => {
			const { status, text } = STATE_MAP[state];
			return <Badge status={status} text={text} />;
		},
	},
	{
		title: 'Tải tệp gốc',
		dataIndex: '_id',
		render: (id, record) => {
			return (
				<Button
					type="primary"
					icon={<DownloadOutlined />}
					size="small"
					onClick={() =>
						onClickDowloadFile({
							path: `/excel-file/download-original-file/${id}`,
							fileName: record.title,
						})
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
		render: (id, record) => {
			return (
				<Button
					type="primary"
					icon={<DownloadOutlined />}
					size="small"
					onClick={() =>
						onClickDowloadFile({
							path: `/excel-file/download-translated-file/${id}`,
							fileName: record.title,
						})
					}
				>
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
	{
		title: 'Thử lại',
		dataIndex: '_id',
		render: (id, record) => {
			const { state } = record;
			return (
				<Button
					disabled={state === STATE_MAP.error.status ? false : true}
					type="primary"
					icon={<ReloadOutlined />}
					size="small"
					onClick={() =>
						axiosRequest({
							path: `/excel-file/retry/${id}`,
							method: 'post',
						})
					}
				>
					Thử lại
				</Button>
			);
		},
	},
];

const FileManagement = () => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [params, setParams] = useState({
		title: '',
		state: '',
		page: 1,
		limit: 20,
	});
	const [totalDocs, setTotalDocs] = useState(0);

	const fetchData = async () => {
		setLoading(true);

		const { data = {} } = await axiosRequest({
			path: `/excel-file`,
			method: 'get',
			params,
		});

		const { docs = [], totalDocs = 0 } = data;

		setData(docs);
		setTotalDocs(totalDocs);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, [params]);

	useEffect(() => {
		const intervalFetchData = setInterval(() => {
			fetchData();
		}, 30000);
		return () => {
			clearInterval(intervalFetchData);
		};
	}, []);

	const handleTableChange = pagination => {
		const { current, pageSize } = pagination;

		setParams({ ...params, page: current, limit: pageSize });

		// `dataSource` is useless since `pageSize` changed
		if (pageSize !== params.limit) {
			setData([]);
		}
	};

	const onFinish = values => {
		setParams({ ...params, ...values });
	};

	const onValuesChange = values => {
		const { state } = values;
		setParams({ ...params, state });
	};

	const uploadOnChange = result => {
		const response = result.file.response;
		const error = result.file.error;

		const resMessage = response?.message;

		if (error) {
			const { status } = error;

			if (status === 401) {
				stateEventEmiter.emit('logout');
			}

			if (resMessage) {
				message.error(resMessage);
			}
		} else {
			if (resMessage) {
				message.success(resMessage);
			}

			fetchData();
		}
	};

	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<Form
				layout="inline"
				style={{ margin: '8px' }}
				onFinish={onFinish}
				onValuesChange={onValuesChange}
			>
				<Form.Item name="title" label="Tên tệp" defaultValue="" style={{ margin: "8px" }} >
					<Input allowClear placeholder="" />
				</Form.Item>
				<Form.Item name="state" label="Trạng thái" defaultValue="" style={{ margin: "8px" }}>
					<Select style={{ minWidth: '150px' }} allowClear options={stateOptions} />
				</Form.Item>
				<Form.Item style={{ margin: "8px" }}>
					<Button htmlType="submit" type="primary" icon={<SearchOutlined />}>
						Tìm kiếm
					</Button>
				</Form.Item>
				<Button type="primary" icon={<ReloadOutlined />} onClick={fetchData} style={{ margin: "8px" }} />
				<Upload
					{...getUploadProps({
						path: '/excel-file/import-excel',
						name: 'file',
						onChange: uploadOnChange,
					})}
					style={{ margin: "8px" }}
				>
					<Button
						type="primary"
						style={{ margin: '8px', background: '#0c7a4c', color: 'white' }}
						icon={<UploadOutlined />}
					>
						Tải tệp
					</Button>
				</Upload>
			</Form>
			<Table
				columns={columns}
				rowKey={record => record._id}
				dataSource={data}
				pagination={{
					current: params.page,
					pageSize: params.limit,
					total: totalDocs,
				}}
				loading={loading}
				onChange={handleTableChange}
				scroll={{ x: true }}
			/>
		</Space>
	);
};

export default FileManagement;
