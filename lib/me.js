const { gql } = require("@apollo/client");


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


class Me {
	constructor(shutterFetch) {
		this.shutterFetch = shutterFetch;
	}

	async get(){
		const variables = {};

		const response = await this.shutterFetch.query({
			query,
			variables
		});

		if(response.errors) throw response.errors;

		return response.data.me;
	}
}

module.exports = Me;
