const { ApolloClient, ApolloLink, HttpLink, InMemoryCache, gql } = require("@apollo/client");
const { onError } = require("@apollo/client/link/error");
const fetch = require('cross-fetch');
const TOKEN_EXPIRE_TIME = 7 * 60 * 60;

class Request {
	constructor({email, password}) {
		this.shutterFetch = null;
		this.email = email;
		this.password = password;
		this.token = null;
	}

	async initialize(){
		const httpLink = new HttpLink({
			uri: "https://shutter-api.dev.councilbox.com/graphql",
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
					authorization: this.token ? `Bearer ${this.token}` : "",
					"x-shutter-token": this.token
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

		const getShutterToken = async () => {
			const response = await this.shutterFetch.mutate({
				mutation: gql`
						mutation login($credentials: Credentials!){
					  		login(credentials: $credentials)
						}
					`,
				variables: {
					credentials: {
						email: this.email,
						password: this.password
					}
				}
			});

			this.token = response.data.login;
		}

		const getNewToken = async () => {
			await getShutterToken();
			setTimeout(() => getNewToken(), TOKEN_EXPIRE_TIME);
		}

		if (!this.token) {
			await getShutterToken();
		}

		setTimeout(() => getNewToken(), TOKEN_EXPIRE_TIME);

		return this.shutterFetch;
	}
}


module.exports = Request;