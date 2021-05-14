const { gql } = require('@apollo/client');


const LIST = gql`
	query {
		organizations {
			id
			name
			logo
			created
			owner {
				id
				name
				surname
				email
				language
				created
			}
		}
	}
`;

const CREATE = gql`
	mutation createOrganization($organization: OrganizationInfo!) {
		createOrganization(organization: $organization) {
			id
			name
			logo
		}
	}
`;

const UPDATE = gql`
	mutation updateOrganization($organization: OrganizationUpdateInfo!) {
		updateOrganization(organization: $organization) {
			id
			name
			logo
		}
	}
`;

const DELETE = gql`
	mutation removeOrganization($id: String!) {
		removeOrganization(id: $id) {
			id
			name
			logo
		}
	}
`;


module.exports = class Organizations {
	#shutterFetch

	constructor(shutterFetch) {
		this.#shutterFetch = shutterFetch;
	}

	async list() {
		const variables = {};

		const response = await this.#shutterFetch.query({
			query: LIST,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.organizations;
	}

	async create({ organization }) {
		const variables = { organization };

		const response = await this.#shutterFetch.mutate({
			mutation: CREATE,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.createOrganization;
	}

	async update({ organization }) {
		const variables = { organization };

		const response = await this.#shutterFetch.mutate({
			mutation: UPDATE,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.updateOrganization;
	}

	async delete({ id }) {
		const variables = { id };

		const response = await this.#shutterFetch.mutate({
			mutation: DELETE,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.removeOrganization;
	}
};
