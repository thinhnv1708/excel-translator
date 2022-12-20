const express = require('express')
const router = express.Router()
const { mainController } = require('../controller');
const upload = require('../multer');

router.post('/import-excel', upload.single('file'), mainController.handleImportExcel)

module.exports = router;