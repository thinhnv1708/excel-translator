
const express = require('express')
const router = express.Router()
const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');

router.post('/login', authMiddleware.loginValidation, authController.login)
router.get('/get-me-info', authMiddleware.authentication, authController.getMeInfo)

module.exports = router;