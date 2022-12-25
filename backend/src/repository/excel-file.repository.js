const { ExcelFileModel } = require('../model');

const getExcelFileById = async id => {
	return await ExcelFileModel.findById(id);
};

const getExcelFiles = async (query, options) => {
	const { title, state } = query;
	const { page, limit = 20 } = options;

	const newQuery = {};

	if (title) {
		newQuery.title = {
			$regex: title,
			$options: 'gim',
		};
	}

	if (state) {
		newQuery.state = state;
	}

	return await ExcelFileModel.paginate(newQuery, {
		page,
		limit,
		sort: { createdAt: -1 },
	});
};

const createExcelFile = async body => {
	return await ExcelFileModel.create(body);
};

const updateExcelFile = async (id, body) => {
	return await ExcelFileModel.findOneAndUpdate({ _id: id }, body);
};

const countDocs = async state => {
	if (!state) {
		return await ExcelFileModel.countDocuments();
	}

	return await ExcelFileModel.countDocuments({ state });
};
module.exports = {
	getExcelFileById,
	getExcelFiles,
	createExcelFile,
	updateExcelFile,
	countDocs,
};
