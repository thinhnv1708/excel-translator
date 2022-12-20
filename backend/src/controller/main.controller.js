const { HTTP_CODE, EVENTS } = require('../common/constant')
const { mainMessage } = require('../common/message')
const MyEvent = require('../event')
const myEventInsatnce = MyEvent.getInstance()

const handleImportExcel = (req, res) => {

    if (req.filterErrorMessage) {
        return res.status(HTTP_CODE.BAD_REQUEST).json({
            message: mainMessage[req.filterErrorMessage]
        })
    }

    myEventInsatnce.emit(EVENTS.HANDLE_TRANSLATE_FILE, req.file)

    return res.json({
        message: mainMessage.IMPORT_EXCEL_SUSSESS
    })
}

module.exports = {
    handleImportExcel
}