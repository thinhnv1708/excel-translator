const { appConfig } = require('../common/config')
const jwt = require('jsonwebtoken');
const { authMessage } = require('../common/message');
const { JWT_SECRET, JWT_EXPIRES_IN } = appConfig

const users = [
    {
        id: 1,
        username: 'admin',
        password: 'admin',
    }
]

const login = (username, password) => {
    const user = users.find(u => u.username === username);

    if (!user) {
        return {
            error: authMessage.USER_NAME_DOES_NOT_EXIST
        }
    }

    if (user.password !== password) {
        return {
            error: authMessage.PASSWORD_IS_NOT_CORRECT
        }
    }

    return {
        token: jwt.sign({ sub: user.id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
    }
}

const authentication = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

module.exports = {
    login,
    authentication
}