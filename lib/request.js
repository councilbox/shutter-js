const { ApolloClient, ApolloLink, HttpLink, InMemoryCache } = require("@apollo/client");
const { onError } = require("@apollo/client/link/error");
const fetch = require('cross-fetch');

class Request {
	constructor({ email, password, uri }) {
		this.email = email;
		this.password = password;
		this.uri = uri;
		this.token = null;

		const httpLink = new HttpLink({fetch, uri});

		const errorLink = onError(function({ graphQLErrors, networkError })
		{
			graphQLErrors?.map(({message, locations, path}) =>
				console.log(
					'[GraphQL error]: Message: ', message, ', Location: ', locations,
					', Path: ', path)
			);

			if (networkError) {
				console.log(`[Network error]: ${networkError}`);
				console.log('[Network status error]: ', networkError.statusCode)
			}
		});

		const authLink = new ApolloLink((operation, forward) => {
			// Use the setContext method to set the HTTP headers.
			operation.setContext({
				headers: {
					Authorization: 'Basic ' + Buffer.from(this.email + ":" + this.password).toString('base64')
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
}


module.exports = Request;
