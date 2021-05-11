const Organizations = require('./organizations');
const Users = require('./users');
const Events = require('./events');
const Request = require('./request');


class Client {
	constructor(config) {
		if (!config) {
			throw new Error('Parameter "email" is required');
		}

		const { email, password, uri } = config;

		if (!email) {
			throw new Error('Parameter "email" is required');
		}

		if (!password) {
			throw new Error('Parameter "password" is required');
		}

		if (!uri) {
			throw new Error('Parameter "uri" is required');
		}

		this.config = { email, password, uri };
		this.request = new Request({ email, password, uri });
		this.organizations = new Organizations(this.request);
		this.users = new Users(this.request);
		this.events = new Events(this.request);
	}
}

module.exports = Client;
