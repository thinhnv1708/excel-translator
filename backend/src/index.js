require('dotenv').config();
const express = require('express');
const connectDataBase = require('./mongoose');
const { HTTP_CODE } = require('./common/constant');
const { commonMessage } = require('./common/message');
const { excelFileRouter, authRouter } = require('./router');
const bodyParser = require('body-parser');
const { initFolder } = require('./common/utils');
const cors = require('cors');
initFolder();

connectDataBase()
	.then(() => {
		const app = express();
		app.use(cors());
		app.use(express.static('assets'));
		app.use(
			bodyParser.urlencoded({
				limit: '50mb',
				extended: true,
				parameterLimit: 1000000,
			})
		);
		app.use(bodyParser.json({ limit: '50mb' }));

		app.use('/auth', authRouter);
		app.use('/excel-file', excelFileRouter);

		app.use((req, res, next) => {
			return res.status(HTTP_CODE.NOT_FOUND).json({
				message: commonMessage.NOT_FOUND,
			});
		});

		app.use((err, req, res, next) => {
			console.error(err.stack);
			return res.status(HTTP_CODE.INTERNAL_ERROR).json({
				message: commonMessage.INTERNAL_ERROR,
			});
		});

		const port = process.env.PORT;

		app.listen(port, () => {
			console.log('Server started on port:', port);
		});
	})
	.catch(err => {
		console.error(err);
	});
