const ExcelJS = require('exceljs');
const { translate } = require('@vitalets/google-translate-api')
const workbook = new ExcelJS.Workbook();



const main = async () => {
    const data = await workbook.xlsx.readFile('../assets/traslated/ok.xlsx');
    const worksheet = data.getWorksheet()


    const translateArr = []

    worksheet.eachRow((row) => {
        if (row.number > 2) {
            row.eachCell((cell) => {
                const address = cell.address


                translateArr.push(`${cell.address}- ${cell.value}`.trim())
            })
        }
    })

    const text = translateArr.join('$$')
    const x = await translate(text, { from: 'vi', to: 'en' })
    console.log(x);


    // const y = x.split(',')

    // // console.log(y);

    // // console.log(worksheet.getCell('A2').value);

    // y.forEach(item => {
    //     const arrayItem = item.trim().split(' ')
    //     const cellName = arrayItem.shift()
    //     const value = arrayItem.join(' ')
    //     if (cellName) {
    //         const curentValue = worksheet.getCell(cellName).value
    //         worksheet.getCell(cellName).value = `${curentValue} (${value})`
    //     }
    // })


    // data.xlsx.writeFile('../assets/traslated/ok.xlsx')
}

main()

// const { translate } = require('@vitalets/google-translate-api')

// const tunnel = require('tunnel');
// const translatePromise = (text) => new Promise((resolve, reject) => {
//     translate(text, { from: 'en', to: 'vi' }, {
//         agent: tunnel.httpsOverHttp({
//             proxy: {
//                 host: 'whateverhost',
//                 proxyAuth: 'user:pass',
//                 port: '8080',
//                 headers: {
//                     'User-Agent': 'Node'
//                 }
//             }
//         })
//     }).then(res => {
//         resolve(res.text)
//     }).catch(err => {
//         reject(err)
//     });
// })