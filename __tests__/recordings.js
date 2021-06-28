const { back } = require('nock');

const Recordings = require('../lib/recordings');
const request = require('../lib/request');

const recordings = new Recordings(
	request({
		email: 'example@mail.com',
		password: 'your_pass',
		uri: 'http://example.test/graphql',
	})
);

back.fixtures = `${__dirname}/nockFixtures`;

back.setMode('lockdown');

describe('list', () => {
	test('no arguments', () => {
		const promise = back('recordings/list.json').then(({ nockDone }) => recordings.list().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('recordings/list_no_roomNumber.json').then(
			({ nockDone }) => recordings.list({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 19,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('recordings/list_roomNumber.json').then(
			({ nockDone }) => recordings.list({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('getIframeUrl', () => {
	test('no arguments', () => {
		const promise = back('recordings/getIframeUrl.json').then(({ nockDone }) => recordings.getIframeUrl().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref2' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('recordings/getIframeUrl_no_roomNumber.json').then(
			({ nockDone }) => recordings.getIframeUrl({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 28,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('recordings/getIframeUrl_roomNumber.json').then(
			({ nockDone }) => recordings.getIframeUrl({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});
