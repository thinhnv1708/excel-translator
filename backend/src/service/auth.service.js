const { appConfig } = require('../common/config');
const jwt = require('jsonwebtoken');
const { authMessage } = require('../common/message');
const { JWT_SECRET, JWT_EXPIRES_IN } = appConfig;

const users = [
	{
		id: 1,
		name: 'Hà Minh Anh',
		username: 'haminhanh',
		password: 'comanhxinh',
	},
];

const login = (username, password) => {
	const user = users.find(u => u.username === username);

	if (!user) {
		return {
			error: authMessage.USER_NAME_DOES_NOT_EXIST,
		};
	}

	if (user.password !== password) {
		return {
			error: authMessage.PASSWORD_IS_NOT_CORRECT,
		};
	}

	return {
		data: {
			name: user.name,
			username,
			token: jwt.sign({ sub: user.id, username: user.username }, JWT_SECRET, {
				expiresIn: JWT_EXPIRES_IN,
			}),
			message: authMessage.LOGIN_SUSSCESS,
		},
	};
};

const authentication = token => {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch (error) {
		return null;
	}
};

module.exports = {
	login,
	authentication,
};
