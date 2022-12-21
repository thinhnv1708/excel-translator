const { HTTP_CODE, EXCEL_FILE } = require('../common/constant')
const { commonMessage, excelFileMessage } = require('../common/message')
const excelFileService = require('../service/excel-file.service')
const path = require('path')
const fs = require('fs')

const checkFileExistsSync = (filepath) => {
    let flag = true;
    try {
        fs.accessSync(filepath, fs.constants.F_OK);
    } catch (e) {
        flag = false;
    }
    return flag;
}

const excelFileExists = async (req, res, next) => {
    const { id } = req.params
    const excelFile = await excelFileService.getExcelFileById(id)

    if (!excelFile) {
        return res.status(HTTP_CODE.NOT_FOUND).json({ message: commonMessage.RECORD_DOES_NOT_EXIST })
    }

    req.excelFile = excelFile

    return next()
}


const fileProcessed = async (req, res, next) => {
    let excelFile = req.excelFile || await excelFileService.getExcelFileById(id)

    const { state } = excelFile

    if (state !== EXCEL_FILE.STATE.SUCCESS) {
        return res.status(HTTP_CODE.BAD_REQUEST).json({
            message: excelFileMessage.FILE_NOT_YET_PROCESSING
        })
    }

    return next()
}

const fileError = async (req, res, next) => {
    let excelFile = req.excelFile || await excelFileService.getExcelFileById(id)

    const { state } = excelFile

    if (state !== EXCEL_FILE.STATE.ERROR) {
        return res.status(HTTP_CODE.BAD_REQUEST).json({
            message: excelFileMessage.FILE_IS_NOT_ERROR
        })
    }

    return next()
}

const originalFileExist = async (req, res, next) => {
    const excelFile = req.excelFile

    const { originalFile } = excelFile

    const fileUrl = path.resolve(__dirname, `../../../assets/uploads/${originalFile}`)

    if (!checkFileExistsSync(fileUrl)) {
        return res.status(HTTP_CODE.BAD_REQUEST).json({
            message: excelFileMessage.FILE_DOES_NOT_EXIST
        })
    }

    return next()
}

const translatedFileExist = async (req, res, next) => {
    const excelFile = req.excelFile

    const { translatedFile } = excelFile

    const fileUrl = path.resolve(__dirname, `../../../assets/translated/${translatedFile}`)

    if (!checkFileExistsSync(fileUrl)) {
        return res.status(HTTP_CODE.BAD_REQUEST).json({
            message: excelFileMessage.FILE_DOES_NOT_EXIST
        })
    }

    return next()
}

module.exports = {
    excelFileExists,
    fileProcessed,
    fileError,
    originalFileExist,
    translatedFileExist
}