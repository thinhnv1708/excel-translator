import axios from 'axios';

const axiosRequest = async ({ url, method, body = {}, headers = {} }) => {
	try {
		const response = await axios({
			url,
			method,
			body,
			headers,
		});

		return { data: response.data };
	} catch (errorResponse) {
		const { status, data, message } = errorResponse;
		console.log('Toat:', data?.message || message);
		return { error: { status, data } };
	}
};

export { axiosRequest };
