const { gql } = require("@apollo/client");

class Me {
	constructor(shutterFetch) {
		this.shutterFetch = shutterFetch;
	}

	async get(){
		const variables = {};
		const query = gql`
			query {
				me {
					id
					name
					surname
					email
					type
					organizations {
						id
						name
						logo
						created
					}
					language
					state
					created
				}
			}
		`;

		const response = await this.shutterFetch.query({
			query,
			variables
		});

		if(response.errors) throw response.errors;
		return response.data.me;
	}
}

module.exports = Me;