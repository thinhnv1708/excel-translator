const { excelFileRepository } = require("../repository")
const { EVENTS, EXCEL_FILE } = require("../common/constant")
const MyEvent = require('../event')
const myEvent = MyEvent.getInstance()

const getExcelFileById = async (id) => {
    return await excelFileRepository.getExcelFileById(id)
}

const getExcelFiles = async (query) => {

    const { title, state, page, limit } = query
    return await excelFileRepository.getExcelFiles({ title, state }, { page, limit })
}

const handleImportExcelFile = async (body) => {
    const { originalname, filename, } = body

    const excelFile = await excelFileRepository.createExcelFile({
        title: originalname.replace('.xlsx', ''),
        originalFile: filename
    })

    const { _id, originalFile } = excelFile

    myEvent.emit(EVENTS.HANDLE_TRANSLATE_FILE, { id: _id, originalFile, handleTranslateFile })

    return excelFile
}

const handleRetryTranslateFile = async (id, originalFile) => {
    myEvent.emit(EVENTS.HANDLE_TRANSLATE_FILE, { id, originalFile, handleTranslateFile })
    return
}

const updateExcelFile = async (id, body) => {
    return await excelFileRepository.updateExcelFile(id, body)
}

const handleTranslateFile = async (id, originalFile) => {
    try {
        await updateExcelFile(id, { state: EXCEL_FILE.STATE.SUCCESS })
    } catch (error) {
        console.error(error);
        await updateExcelFile(id, { state: EXCEL_FILE.STATE.ERROR })
    }

}



module.exports = {
    getExcelFileById,
    getExcelFiles,
    handleImportExcelFile,
    updateExcelFile,
    handleTranslateFile,
    handleRetryTranslateFile
}