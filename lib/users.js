const { gql } = require('@apollo/client');


const ME = gql`
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

const CREATE = gql`
	mutation createUser($user: UserInfo!) {
		createUser(user: $user) {
			id
			name
			surname
			email
			type
			language
			state
			created
			organizations{
				id
				name
				logo
				created
			}
		}
	}
`;

const DELETE = gql`
	mutation removeUser($id: String!) {
		removeUser(id: $id) {
			id
			name
			surname
			email
			type
			language
			state
			created
			organizations{
				id
				name
				logo
				created
			}
		}
	}
`;


module.exports = class Users {
	constructor(shutterFetch) {
		this.shutterFetch = shutterFetch;
	}

	async me() {
		const variables = {};

		const response = await this.shutterFetch.query({
			query: ME,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.me;
	}

	async create({ user }) {
		const variables = { user };

		const response = await this.shutterFetch.mutate({
			mutation: CREATE,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.createUser;
	}

	async delete({ id }) {
		const variables = { id };

		const response = await this.shutterFetch.mutate({
			mutation: DELETE,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.removeUser;
	}
};
