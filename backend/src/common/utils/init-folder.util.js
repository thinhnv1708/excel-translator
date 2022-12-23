const fs = require('fs')
const path = require('path')



module.exports = () => {

    const assetsFolderUrl = path.resolve(__dirname, `../../../../assets`)
    const translatedFolderUrl = path.resolve(__dirname, `../../../../assets/translated`)
    const uploadsFolderUrl = path.resolve(__dirname, `../../../../assets/uploads`)


    if (!fs.existsSync(assetsFolderUrl)) {
        fs.mkdirSync(assetsFolderUrl)
    }

    if (!fs.existsSync(translatedFolderUrl)) {
        fs.mkdirSync(translatedFolderUrl)
    }

    if (!fs.existsSync(uploadsFolderUrl)) {
        fs.mkdirSync(uploadsFolderUrl)
    }

}