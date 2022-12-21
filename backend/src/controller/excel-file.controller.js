const { HTTP_CODE } = require('../common/constant')
const { excelFileMessage } = require('../common/message')
const { excelFileService } = require('../service')
const path = require('path')
const getExcelFiles = async (req, res) => {

    const excelFiles = await excelFileService.getExcelFiles(req.query)

    return res.json(excelFiles)
}

const handleImportExcel = async (req, res) => {

    if (req.filterErrorMessage) {
        return res.status(HTTP_CODE.BAD_REQUEST).json({
            message: excelFileMessage[req.filterErrorMessage]
        })
    }
    const { originalname, filename, } = req.file


    const body = {
        originalname,
        filename
    }

    await excelFileService.handleImportExcelFile(body)

    return res.json({
        message: excelFileMessage.IMPORT_EXCEL_SUSSESS
    })
}

const dowloadOriginalFile = async (req, res) => {
    const { originalFile, title } = req.excelFile
    const fileUrl = path.resolve(__dirname, `../../../assets/uploads/${originalFile}`)
    return res.download(fileUrl, title + '.xlsx')
}

const dowloadTranslatedFile = async (req, res) => {
    const { translattedFile, title } = req.excelFile
    const fileUrl = path.resolve(__dirname, `../../../assets/translated/${translattedFile}`)

    return res.download(fileUrl, title + '.xlsx')
}

const retryTranslateFile = async (req, res) => {
    const { _id, originalFile } = req.excelFile
    await excelFileService.retryTranslateFile(_id, originalFile)
    return res.json({
        message: excelFileMessage.RETRY_TRANSLATE_FILE_PROCESSING
    })
}

module.exports = {
    getExcelFiles,
    handleImportExcel,
    dowloadOriginalFile,
    dowloadTranslatedFile,
    retryTranslateFile
}