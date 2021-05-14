/* eslint-disable no-console */
const {
	ApolloClient, ApolloLink, HttpLink, InMemoryCache
} = require('@apollo/client');
// eslint-disable-next-line import/no-extraneous-dependencies
const { onError } = require('@apollo/client/link/error');
const fetch = require('cross-fetch');

module.exports = class Request {
	constructor({ email, password, uri }) {
		this.email = email;
		this.password = password;
		this.uri = uri;

		const httpLink = new HttpLink({ fetch, uri });

		const errorLink = onError(({ graphQLErrors, networkError }) => {
			graphQLErrors?.map(({ message, locations, path }) => console.error(
				'[GraphQL error]: Message: ', message, ', Location: ', locations,
				', Path: ', path
			));

			if (networkError) {
				console.error(`[Network error]: ${networkError}`);
				console.error('[Network status error]: ', networkError.statusCode);
			}
		});

		const authLink = new ApolloLink((operation, forward) => {
			// Use the setContext method to set the HTTP headers.
			operation.setContext({
				headers: {
					Authorization: `Basic ${Buffer.from(`${this.email}:${this.password}`).toString('base64')}`
				}
			});

			// Call the next link in the middleware chain.
			return forward(operation);
		});

		return new ApolloClient({
			link: authLink.concat(errorLink.concat(httpLink)),
			cache: new InMemoryCache({ addTypename: false })
		});
	}
};
