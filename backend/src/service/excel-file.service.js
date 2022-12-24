const { excelFileRepository } = require('../repository');
const { EVENTS, EXCEL_FILE } = require('../common/constant');
const MyEvent = require('../event');
const myEvent = MyEvent.getInstance();
const translatorEngine = require('../translator-engine');
const path = require('path');

const getExcelFileById = async id => {
	return await excelFileRepository.getExcelFileById(id);
};

const getExcelFiles = async query => {
	const { title, state, page, limit } = query;
	console.log(query);
	return await excelFileRepository.getExcelFiles(
		{ title, state },
		{ page, limit }
	);
};

const handleImportExcelFile = async body => {
	const { originalname, filename } = body;

	const newOriginalname = Buffer.from(originalname, 'latin1').toString('utf8');

	const excelFile = await excelFileRepository.createExcelFile({
		title: newOriginalname.replace('.xlsx', ''),
		originalFile: filename,
	});

	const { _id, originalFile } = excelFile;

	myEvent.emit(EVENTS.HANDLE_TRANSLATE_FILE, {
		id: _id,
		originalFile,
		handleTranslateFile,
	});

	return excelFile;
};

const handleRetryTranslateFile = async (id, originalFile) => {
	myEvent.emit(EVENTS.HANDLE_TRANSLATE_FILE, {
		id,
		originalFile,
		handleTranslateFile,
	});
};

const updateExcelFile = async (id, body) => {
	return await excelFileRepository.updateExcelFile(id, body);
};

const handleTranslateFile = async (id, originalFile) => {
	try {
		const originalUrl = path.resolve(
			__dirname,
			`../../../assets/uploads/${originalFile}`
		);

		const translatedFile = `translated-${originalFile}`;

		const outputUrl = path.resolve(
			__dirname,
			`../../../assets/translated/${translatedFile}`
		);

		const translateResult = await translatorEngine({ originalUrl, outputUrl });

		if (!translateResult) {
			await updateExcelFile(id, { state: EXCEL_FILE.STATE.ERROR });
		} else {
			await updateExcelFile(id, {
				translatedFile,
				state: EXCEL_FILE.STATE.SUCCESS,
			});
		}
	} catch (error) {
		console.error(error);
		await updateExcelFile(id, { state: EXCEL_FILE.STATE.ERROR });
	}
};

module.exports = {
	getExcelFileById,
	getExcelFiles,
	handleImportExcelFile,
	updateExcelFile,
	handleTranslateFile,
	handleRetryTranslateFile,
};
