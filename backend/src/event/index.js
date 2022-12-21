
const EventEmitter = require('events');
const { EVENTS } = require('../common/constant');

module.exports = class MyEvent extends EventEmitter {
    _instance = null;
    services = null

    static getInstance() {
        if (!this.instance) {
            this._instance = new MyEvent();
        }

        return this._instance
    }

    static clear() {
        if (this._instance) {
            this._instance.destroy();
            delete this._instance;
        }
    }

    constructor() {
        super();
        this._init()
    }

    _init() {
        this.on(EVENTS.HANDLE_TRANSLATE_FILE, (payload) => {
            const { id, originalFile, handleTranslateFile } = payload
            handleTranslateFile(id, originalFile)
        });
    }
}