const { HTTP_CODE } = require('../common/constant');
const { authMessage } = require('../common/message');
const { authService } = require('../service');

const loginValidation = (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(HTTP_CODE.BAD_REQUEST).json({
			message: authMessage.USERNAME_PASSWORD_REQUIRED,
		});
	}

	return next();
};

const authentication = (req, res, next) => {
	const token = req.headers['x-access-token'];

	if (!token) {
		return res.status(HTTP_CODE.UNAUTHORIZED).json({
			message: authMessage.TOKEN_REQUIRED,
		});
	}

	const decode = authService.authentication(token);

	if (!decode) {
		return res.status(HTTP_CODE.UNAUTHORIZED).json({
			message: authMessage.TOKEN_INVALID,
		});
	}

	req.user = decode;

	return next();
};

module.exports = {
	loginValidation,
	authentication,
};
