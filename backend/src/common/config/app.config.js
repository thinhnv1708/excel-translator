module.exports = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'jwt-secret',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '3d',
}