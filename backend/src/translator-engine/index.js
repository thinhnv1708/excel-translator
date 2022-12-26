const ExcelJS = require('exceljs');
const slug = require('slug');
const workbook = new ExcelJS.Workbook();
const translateManyRequest = require('./translate-request');

const specialCaseMap = {
	phaithutungvan: 'Receivables Tung Van',
	phaitratungvan: 'Payable Tung Van',
	phaitrathudo: 'Payable Thu Do',
	cvnoibottkd: 'Business center job',
	phaithuvtvcab: 'Receivables VTV CAB',
	phaitravtvcab: 'Payable VTV CAB',
};

const translatedRegex = new RegExp(/\([\w .,-_=!@#$%^&?<>"':;|\[\]{}]*\)*/g);
const percentRegex = new RegExp(/^\d*%$/g);
const numberRegex = new RegExp(/^\d*$/g);

module.exports = async ({ originalUrl, outputUrl }) => {
	try {
		const data = await workbook.xlsx.readFile(originalUrl);

		const sheetMapArray = {};

		data.eachSheet((workSheet, id) => {
			sheetMapArray[`${id}`] = [];

			workSheet.eachRow(row => {
				row.eachCell(cell => {
					const { address, value } = cell;

					const trimValue = `${value}`.trim();

					const specialCaseValue = specialCaseMap[slug(trimValue, '')];

					if (specialCaseValue) {
						workSheet.getCell(address).value = `${trimValue} (${specialCaseValue})`;
					} else {
						if (
							!(
								translatedRegex.test(trimValue) ||
								percentRegex.test(trimValue) ||
								numberRegex.test(trimValue)
							)
						) {
							sheetMapArray[`${id}`].push(`${address} | ${trimValue}`.trim());
						}
					}
				});
			});
		});

		const sheetMapString = {};

		Object.keys(sheetMapArray).forEach(key => {
			sheetMapString[key] = sheetMapArray[key].join('$');
		});

		const keySheetMapString = Object.keys(sheetMapString);

		const result = await translateManyRequest(keySheetMapString, sheetMapString);

		result.forEach((item, index) => {
			const { text } = item;
			const sheetId = Number(keySheetMapString[index]);
			const addressAndTranslatedValueArray = text.split('$');

			const worksheet = data.getWorksheet(sheetId);

			addressAndTranslatedValueArray.forEach(addressAndTranslatedValueString => {
				const addressAndTranslatedValue =
					addressAndTranslatedValueString.split('|');
				const address = addressAndTranslatedValue[0].trim();
				const translatedValue = addressAndTranslatedValue[1].trim();


				const cell = worksheet.getCell(address);

				if (cell) {
					const curentValue = `${cell.value}`.trim();

					const translated = translatedRegex.test(curentValue);

					if (!translated && curentValue.indexOf(`(${translatedValue})`) < 0) {
						cell.value = `${curentValue} (${translatedValue})`;
					}
				}

			});
		});

		await data.xlsx.writeFile(outputUrl);
		return true;
	} catch (error) {
		console.error('Translator engine:', error);
		return false;
	}
};
