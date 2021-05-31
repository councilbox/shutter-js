const { getOperationName } = require('./utils');

const ME = `
	query me {
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

const CREATE = `
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

const DELETE = `
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
	#shutterFetch

	constructor(shutterFetch) {
		this.#shutterFetch = shutterFetch;
	}

	async me() {
		const variables = {};

		const response = await this.#shutterFetch({
			query: ME,
			variables,
			operationName: `${getOperationName(ME)}`
		});

		if (response.errors) throw response.errors;

		return response.data.me;
	}

	async create({ user }) {
		const variables = { user };

		const response = await this.#shutterFetch({
			query: CREATE,
			variables,
			operationName: getOperationName(CREATE)
		});

		if (response.errors) throw response.errors;

		return response.data.createUser;
	}

	async delete({ id }) {
		const variables = { id };

		const response = await this.#shutterFetch({
			query: DELETE,
			variables,
			operationName: getOperationName(DELETE)
		});

		if (response.errors) throw response.errors;

		return response.data.removeUser;
	}
};
