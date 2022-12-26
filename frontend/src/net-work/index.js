import axios from 'axios';
import FileDownload from 'js-file-download';
import { Buffer } from 'buffer';
import StateEventEmiter from '../state-event-emiter';
import { message } from 'antd';
const stateEventEmiter = StateEventEmiter.getInstance();

const host = 'http://123.30.235.187:5412';

const axiosRequest = async ({
	path,
	method,
	params,
	data,
	file,
	headers = {},
	responseType,
}) => {
	try {
		const token = localStorage.getItem('token');

		const response = await axios({
			url: `${host}${path}`,
			method,
			data,
			params,
			responseType,
			file,
			headers: {
				...headers,
				'x-access-token': token,
			},
		});

		const resMessage = response?.data?.message;

		if (resMessage) {
			message.success(resMessage);
		}

		return { data: response.data };
	} catch (errorResponse) {
		const { response } = errorResponse;

		if (response) {
			const { status, data } = response;

			if (response.status === 401) {
				stateEventEmiter.emit('logout');
			}

			const resMessage = data?.message || null;

			if (resMessage) {
				message.error(resMessage);
			}

			return { error: { status, data } };
		}
		message.error(errorResponse.message);
	}
};

const downloadFile = async ({ path, fileName, headers = {}, params }) => {
	try {
		const token = localStorage.getItem('token');

		const response = await axios({
			url: `${host}${path}`,
			method: 'get',
			params,
			responseType: 'blob',
			headers: {
				...headers,
				'x-access-token': token,
			},
		});

		const { data } = response;

		FileDownload(data, `${fileName}-translated.xlsx`);
		return true;
	} catch (errorResponse) {
		const { response } = errorResponse;

		if (response) {
			const arrayBuffer = await response.data.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer, 'binary');
			const responseData = JSON.parse(buffer.toString());

			if (response.status === 401) {
				stateEventEmiter.emit('logout');
			}

			const resMessage = responseData?.message || response?.message || null;

			if (resMessage) {
				message.error(resMessage);
			}

			return { error: responseData };
		}

		message.error(errorResponse.message);
	}
};

const getUploadProps = ({ path, name, onChange }) => {
	const token = localStorage.getItem('token');
	return {
		action: `${host}${path}`,
		name,
		headers: { 'x-access-token': token },
		onChange,
		multiple: false,
	};
};

export { axiosRequest, downloadFile, getUploadProps };
