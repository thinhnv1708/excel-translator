const { mongooseConfig } = require('../common/config');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

const connectDataBase = async () => {

    const {
        SERVERS: servers,
        USERNAME: user,
        PASSWORD: pass,
        AUTH_SOURCE: authSource,
        REPL: repl,
        DB: db,
    } = mongooseConfig

    let uri = ''
    const url = servers.reduce((prev, cur) => prev + cur + ',', '')

    if (user && pass) {
        uri =
            `mongodb://${user}:${pass}@${url.substring(
                0,
                url.length - 1,
            )}/${db}?authSource=` +
            (authSource ? authSource : 'admin') +
            (repl ? `&replicaSet=${repl}` : '')
    } else {
        uri =
            `mongodb://${url.substring(0, url.length - 1)}/${db}` +
            (repl ? `?replicaSet=${repl}` : '')
    }

    await mongoose.connect(uri);
    console.log('Connect database successfully', uri);
}

module.exports = connectDataBase