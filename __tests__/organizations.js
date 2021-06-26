const { back } = require('nock');

const request = require('../lib/request');
const Organizations = require('../lib/organizations');

const organizations = new Organizations(
	request({
		email: 'example@mail.com',
		password: 'your_pass',
		uri: 'http://example.test/graphql',
	})
);

back.fixtures = `${__dirname}/nockFixtures`;

back.setMode('record');

test('list', () => {
	const promise = back('organizations/list.json').then(({ nockDone }) => organizations.list().finally(nockDone));

	return expect(promise).resolves.toMatchInlineSnapshot('Array []');
});

describe('create', () => {
	test('no arguments', () => {
		const promise = back('organizations/create.json').then(({ nockDone }) => organizations.create().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'organization' of '_ref' as it is undefined.]"
		);
	});

	test('no room', () => {
		const promise = back('organizations/create_no_room.json').then(
			({ nockDone }) => organizations.create({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 30,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$organization\\" of required type \\"OrganizationInfo!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('room', () => {
		const promise = back('organizations/create_room.json').then(
			({ nockDone }) => organizations.create({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('update', () => {
	test('no arguments', () => {
		const promise = back('organizations/update.json').then(({ nockDone }) => organizations.update().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'organization' of '_ref2' as it is undefined.]"
		);
	});

	test('no room', () => {
		const promise = back('organizations/update_no_room.json').then(
			({ nockDone }) => organizations.update({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 30,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$organization\\" of required type \\"OrganizationUpdateInfo!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('room', () => {
		const promise = back('organizations/update_room.json').then(
			({ nockDone }) => organizations.update({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('delete', () => {
	test('no arguments', () => {
		const promise = back('organizations/delete.json').then(({ nockDone }) => organizations.delete().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'id' of '_ref3' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('organizations/delete_no_roomNumber.json').then(
			({ nockDone }) => organizations.delete({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 30,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$id\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('organizations/delete_roomNumber.json').then(
			({ nockDone }) => organizations.delete({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});
