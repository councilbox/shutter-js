const Request = require('./request');
const EventsClient = require('./events');
const MeClient = require('./me');

class Client {
	constructor(options = {}) {
		if (!options.email) {
			throw new Error('Parameter "email" is required');
		} else if (!options.password) {
			throw new Error('Parameter "password" is required');
		}

		this.config = options;
		this.request = null;
		this.events = new EventsClient();
		this.me = new MeClient();
	}

	async initialize(){
		this.request = new Request(this.config);
		await this.request.initialize();
		const shutterFetch = this.request.shutterFetch;
		this.events = new EventsClient(shutterFetch);
		this.me = new MeClient(shutterFetch);
		return this;
	}
}

module.exports = Client;