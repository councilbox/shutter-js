const createApolloFetch = require('apollo-fetch').createApolloFetch;
const TOKEN_EXPIRE_TIME = 7 * 60 * 60;

class Request {
	constructor({email, password}) {
		this.shutterFetch = null;
		this.email = email;
		this.password = password;
		this.token = null;
	}

	async initialize(){
		this.shutterFetch = createApolloFetch({
			uri: "https://shutter-api.dev.councilbox.com/graphql"
		});

		this.shutterFetch.use(({request, options}, next) => {
			if (!options.headers) {
				options.headers = {};
			}
			options.headers['authorization'] = this.token ? `Bearer ${this.token}` : "";
			options.headers['x-shutter-token'] = this.token;
			next();
		});

		const getShutterToken = async () => {
			const response = await this.shutterFetch({
				query: `
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