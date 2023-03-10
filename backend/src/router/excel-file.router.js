const express = require('express');
const router = express.Router();
const { excelFileController } = require('../controller');
const { excelFileMiddleware, authMiddleware } = require('../middleware');
const upload = require('../multer');

router.get(
	'/',
	authMiddleware.authentication,
	excelFileController.getExcelFiles
);
router.get(
	'/get-number-of-docs',
	authMiddleware.authentication,
	excelFileController.getNumberOfDocs
);
router.get(
	'/download-original-file/:id',
	authMiddleware.authentication,
	excelFileMiddleware.excelFileExists,
	excelFileMiddleware.originalFileExist,
	excelFileController.dowloadOriginalFile
);
router.get(
	'/download-translated-file/:id',
	authMiddleware.authentication,
	excelFileMiddleware.excelFileExists,
	excelFileMiddleware.fileProcessed,
	excelFileMiddleware.translatedFileExist,
	excelFileController.dowloadTranslatedFile
);
router.post(
	'/import-excel',
	authMiddleware.authentication,
	upload.single('file'),
	excelFileController.handleImportExcel
);
router.post(
	'/retry/:id',
	excelFileMiddleware.excelFileExists,
	excelFileMiddleware.fileError,
	authMiddleware.authentication,
	excelFileController.retryTranslateFile
);

module.exports = router;
