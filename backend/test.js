const ExcelJS = require('exceljs');
const { translate } = require('@vitalets/google-translate-api')
const workbook = new ExcelJS.Workbook();



const main = async () => {
    const data = await workbook.xlsx.readFile('./asset/test.xlsx');
    const worksheet = data.getWorksheet()


    const translateArr = []

    worksheet.eachRow((row) => {
        if (row.number > 2) {
            row.eachCell((cell) => {
                const address = cell.address


                translateArr.push(`${cell.address} ${cell.value}`.trim())
            })
        }
    })



    // console.log(translateArr.join(','));
    // const text = translateArr.join(',')
    // const x = await translate(text, { from: 'vi', to: 'en' })
    // console.log(x);
    const x = 'A3 me,B3 name,C3 is,D3 cat,E3 dog,F3 pig,G3 chicken,H3 goat,I3 electronic,J3 phone,K3 how is it,L3 house,M3 pagoda,N3 river,A4 advertisement, B4 okay, C4 happen, D4 milk'

    const y = x.split(',')

    // console.log(y);

    // console.log(worksheet.getCell('A2').value);

    y.forEach(item => {
        const arrayItem = item.trim().split(' ')
        const cellName = arrayItem.shift()
        const value = arrayItem.join(' ')
        if (cellName) {
            worksheet.getCell(cellName).value = value
        }
    })


    data.xlsx.writeFile('./asset/ok.xlsx')
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