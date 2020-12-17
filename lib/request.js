const { ApolloClient, ApolloLink, HttpLink, InMemoryCache } = require("@apollo/client");
const { onError } = require("@apollo/client/link/error");
const fetch = require('cross-fetch');

class Request {
	constructor({ email, password, uri }) {
		this.shutterFetch = null;
		this.email = email;
		this.password = password;
        this.uri = uri;
		this.token = null;
	}

	async initialize(){
		const httpLink = new HttpLink({
			uri: this.uri,
			fetch
		});

		const errorLink = onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors) {
				graphQLErrors.map(({message, locations, path}) =>
					console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
					)
				);
			}
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

		const client = new ApolloClient({
			link: authLink.concat(errorLink.concat(httpLink)),
			cache: new InMemoryCache({ addTypename: false })
		});

		this.shutterFetch = client;

		return this.shutterFetch;
	}
}


module.exports = Request;