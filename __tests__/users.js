const { back } = require('nock');

const request = require('../lib/request');
const Users = require('../lib/users');

const users = new Users(
	request({
		email: 'example@mail.com',
		password: 'your_pass',
		uri: 'http://example.test/graphql',
	})
);

back.fixtures = `${__dirname}/nockFixtures`;

back.setMode('lockdown');

test('me', () => {
	const promise = back('users/me.json').then(({ nockDone }) => users.me().finally(nockDone));

	return expect(promise).resolves.toMatchInlineSnapshot(`
            Object {
              "created": "1605532553161",
              "email": "soup@shutter.com",
              "id": "5fb27b894c58a533f4f04aff",
              "language": "en",
              "name": "shutter",
              "organizations": Array [],
              "state": "CONFIRMED",
              "surname": "soup",
              "type": "SOUP",
            }
          `);
});

describe('create', () => {
	test('no arguments', () => {
		const promise = back('users/create.json').then(({ nockDone }) => users.create().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'user' of '_ref' as it is undefined.]"
		);
	});

	test('no user', () => {
		const promise = back('users/create_no_user.json').then(({ nockDone }) => users.create({}).finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 22,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$user\\" of required type \\"UserInfo!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('user', () => {
		const promise = back('users/create_user.json').then(({ nockDone }) => users.create({}).finally(nockDone));

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('delete', () => {
	test('no arguments', () => {
		const promise = back('users/delete.json').then(({ nockDone }) => users.delete().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'id' of '_ref2' as it is undefined.]"
		);
	});

	test('no id', () => {
		const promise = back('users/delete_no_id.json').then(({ nockDone }) => users.delete({}).finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 22,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$id\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('id', () => {
		const promise = back('users/delete_id.json').then(({ nockDone }) => users.delete({}).finally(nockDone));

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});
