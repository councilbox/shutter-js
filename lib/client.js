const { version } = require('../package.json');
const Organizations = require('./organizations');
const Users = require('./users');
const Rooms = require('./rooms');
const Attendees = require('./attendees');
const Recordings = require('./recordings');
const Events = require('./events');
const Request = require('./request');


module.exports = class Client {
	#request

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

		this.#request = new Request({ email, password, uri });
		this.version = version;
		this.organizations = new Organizations(this.#request);
		this.users = new Users(this.#request);
		this.rooms = new Rooms(this.#request);
		this.attendees = new Attendees(this.#request);
		this.recordings = new Recordings(this.#request);
		this.events = new Events(this.#request);
	}
};
