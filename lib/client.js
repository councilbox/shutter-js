const EventsClient = require('./events');
const MeClient = require('./me');
const Request = require('./request');


class Client {
	constructor(options) {
		if (!options.email) {
			throw new Error('Parameter "email" is required');
		}

		if (!options.password) {
			throw new Error('Parameter "password" is required');
		}

		if (!options.uri) {
			throw new Error('Parameter "uri" is required');
		}

		this.config = options;
		this.request = new Request(options);
		this.events = new EventsClient(this.request);
		this.me = new MeClient(this.request);
	}
}

module.exports = Client;
