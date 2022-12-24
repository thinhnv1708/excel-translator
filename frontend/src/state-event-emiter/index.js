const EventEmitter = require('events');

class StateEventEmiter extends EventEmitter {
	static getInstance() {
		if (!this._instance) {
			this._instance = new StateEventEmiter();
		}

		return this._instance;
	}
	constructor() {
		super();
	}
}
export default StateEventEmiter;
