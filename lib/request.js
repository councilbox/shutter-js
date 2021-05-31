const fetch = require('cross-fetch');
const { createApolloFetch } = require('apollo-fetch');

module.exports = class Request {
	constructor({ email, password, uri }) {
		this.email = email;
		this.password = password;
		this.uri = uri;

		const apolloFetch = createApolloFetch({
			uri,
			customFetch: fetch
		});

		apolloFetch.use(({ options }, next) => {
			if (!options.headers) {
				// eslint-disable-next-line no-param-reassign
				options.headers = {}; // Create the headers object if needed.
			}
			// eslint-disable-next-line no-param-reassign
			options.headers.authorization = `Basic ${Buffer.from(`${this.email}:${this.password}`).toString('base64')}`;
			// options.headers.Authorization = `Basic ${Buffer.from(`${this.email}:${this.password}`).toString('base64')}`;

			next();
		});

		return apolloFetch;
	}
};
