const { MIMETYPE } = require('../common/constant');
const multer = require('multer');
const validMitype = [
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../assets/uploads/');
	},

	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const { fieldname, mimetype } = file;

		cb(null, `${fieldname}-${uniqueSuffix}${MIMETYPE[mimetype]}`);
	},
});

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		const { mimetype } = file;
		if (validMitype.includes(mimetype)) {
			cb(null, true);
		} else {
			req.filterErrorMessage = 'FILE_TYPE_NOT_SUPPORT';
			cb(null, false);
		}
	},
});

module.exports = upload;
