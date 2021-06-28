const { version } = require('../package.json');

const Attendees = require('./attendees');
const Events = require('./events');
const Organizations = require('./organizations');
const Recordings = require('./recordings');
const Request = require('./request');
const Rooms = require('./rooms');
const Users = require('./users');


module.exports = class Client {
	version = version;

	constructor({ email, password, uri }) {
		if (!email) {
			throw new Error('Parameter "email" is required');
		}

		if (!password) {
			throw new Error('Parameter "password" is required');
		}

		if (!uri) {
			throw new Error('Parameter "uri" is required');
		}

		const request = Request({ email, password, uri });

		this.attendees = new Attendees(request);
		this.events = new Events(request);
		this.organizations = new Organizations(request);
		this.recordings = new Recordings(request);
		this.rooms = new Rooms(request);
		this.users = new Users(request);
	}
};
