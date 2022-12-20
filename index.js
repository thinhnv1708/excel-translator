const ExcelJS = require('exceljs');
const { translate } = require('@vitalets/google-translate-api')
const workbook = new ExcelJS.Workbook();



const main = async () => {
    const data = await workbook.xlsx.readFile('./report.xlsx');
    // const worksheet = data.getWorksheet()



    data.eachSheet(function (worksheet, sheetId) {
        console.log(sheetId);
        console.log(worksheet.name);
    });


    // console.log(worksheet);

    // const translateArr = []

    // worksheet.eachRow((row) => {

    //     row.eachCell((cell) => {
    //         translateArr.push(`${cell.address}| ${cell.value}`.trim())
    //     })

    // })



    // const text = translateArr.join('$')
    // // console.log(text);
    // const x = await translate(text, { from: 'vi', to: 'en' })
    // // console.log(x);
    // // const x = 'A2- Title,B2- Title,C2- hehe,D2- hehe,E2- Lol,F2- Lol,G2- Yasuo,H2- Yasuo,I2- ha anh thuan,J2- ha anh thuan,K2- Ádfsdf, L2- Ádfsdf,M2- sdfsdf,N2- sdfsdf,A3- me,B3- name,C3- is,D3- cat,E3- dog,F3- pig,G3- chicken,H3- goat,I3- electronic,J3 - phone, K3- is that so, L3- house, M3- pagoda, N3- river, A4- advertisement, B4- okay, C4- happen, D4- milk'

    // const y = x.text.split('$')

    // console.log(y);

    // y.forEach(item => {
    //     const arrayItem = item.trim().split(' ')
    //     const cellName = arrayItem.shift()
    //     const value = arrayItem.join(' ')
    //     if (cellName) {
    //         const curentValue = worksheet.getCell(cellName).value
    //         try {
    //             if (curentValue && curentValue.indexOf(`(${value})`) < 0) {
    //                 console.log('vao day', cellName, `${curentValue} (${value})`);
    //                 worksheet.getCell(cellName).value = `${curentValue} (${value})`
    //             }
    //         } catch (error) {
    //             console.log(item);
    //         }


    //     }
    // })


    // const cell = worksheet.getCell('A2')
    // console.log(cell.value);
    // cell.value = 'hello'

    // console.log('xuong day luu file');
    // data.xlsx.writeFile('./okkk.xlsx')
}

main()

