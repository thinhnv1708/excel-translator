const { translate } = require('@vitalets/google-translate-api')
const HttpProxyAgent = require('http-proxy-agent')

const proxys = [
    'local',
    "http://8.210.83.33:80",
    "http://103.118.40.119:80",
    "http://103.167.135.111:80",
    "http://210.6.223.207:80",
    "http://103.167.135.112:80",
    "http://58.152.47.105:80",
    "http://112.120.127.146:80",
    "http://112.120.41.71:80",
    "http://103.167.135.110:80",
    "http://103.167.135.113:80"
]


module.exports = translateRequest = async (keySheetMapString, sheetMapString, proxyIndex = 0) => {
    if (proxyIndex >= proxys.length) {
        throw new Error('Proxy out of index')
    }

    try {
        const proxy = proxys[proxyIndex]

        if (proxy === 'local') {
            const result = await Promise.all(
                keySheetMapString.map(key => {
                    return translate(sheetMapString[key], { from: 'vi', to: 'en' });
                })
            )

            console.log('Using proxy:', proxy);

            return result
        } else {
            const agent = new HttpProxyAgent(proxy);
            const result = await Promise.all(
                keySheetMapString.map(key => {
                    return translate(sheetMapString[key], { from: 'vi', to: 'en', fetchOptions: { agent } });
                })
            )

            console.log('Using proxy:', proxy);

            return result
        }
    } catch (error) {
        return translateRequest(keySheetMapString, sheetMapString, proxyIndex + 1)
    }
}