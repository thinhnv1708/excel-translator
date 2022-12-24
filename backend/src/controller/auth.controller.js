const { HTTP_CODE } = require('../common/constant');
const { authService } = require('../service');

const login = (req, res) => {
	const { username, password } = req.body;
	const { error, data } = authService.login(username, password);

	if (error) {
		return res.status(HTTP_CODE.BAD_REQUEST).json({ message: error });
	}

	return res.json(data);
};

const getMeInfo = (req, res) => {
	const { user } = req;
	return res.json(user);
};

module.exports = {
	login,
	getMeInfo,
};
