const express = require('express')
const router = express.Router()
const { excelFileController } = require('../controller');
const { excelFileMiddleware } = require('../middleware');
const upload = require('../multer');

router.get('/', excelFileController.getExcelFiles)
router.get('/download-original-file/:id', excelFileMiddleware.excelFileExists, excelFileMiddleware.originalFileExist, excelFileController.dowloadOriginalFile)
router.get('/download-translated-file/:id', excelFileMiddleware.excelFileExists, excelFileMiddleware.fileProcessed, excelFileMiddleware.translatedFileExist, excelFileController.dowloadTranslatedFile)
router.post('/import-excel', upload.single('file'), excelFileController.handleImportExcel)

module.exports = router;