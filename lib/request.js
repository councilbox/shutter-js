const { createApolloFetch } = require('apollo-fetch');
const customFetch = require('cross-fetch');


module.exports = function ({ email, password, uri }) {
	const apolloFetch = createApolloFetch({ customFetch, uri });

	apolloFetch.use(({ options }, next) => {
		let { headers } = options;

		if (!headers) {
			// eslint-disable-next-line
			options.headers = headers = {}; // Create the headers object if needed.
		}

		// eslint-disable-next-line no-param-reassign
		const basic = Buffer.from(`${email}:${password}`).toString('base64');

		headers.authorization = `Basic ${basic}`;

		next();
	});

	return apolloFetch;
};
