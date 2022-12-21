const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const { EXCEL_FILE } = require("../common/constant");
const { uuidGenerator } = require("../common/utils");

const excelFileSchema = mongoose.Schema(
    {
        _id: { type: String, default: uuidGenerator },
        title: String,
        originalFile: String,
        translatedFile: String,
        state: { type: String, enum: [EXCEL_FILE.STATE.PROCESSING, EXCEL_FILE.STATE.ERROR, EXCEL_FILE.STATE.SUCCESS], default: EXCEL_FILE.STATE.PROCESSING },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

excelFileSchema.plugin(mongoosePaginate);
excelFileSchema.index({ title: 1 });
excelFileSchema.index({ state: 1 });

module.exports = mongoose.model('ExcelFile', excelFileSchema)