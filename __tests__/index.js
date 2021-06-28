const { back } = require('nock');

const Shutter = require('..');

test('smoke', () => {
	expect(Shutter).toMatchInlineSnapshot('[Function]');
});

const shutter = new Shutter({
	email: 'example@mail.com',
	password: 'your_pass',
	uri: 'http://example.test/graphql',
});

back.fixtures = `${__dirname}/nockFixtures`;

back.setMode('lockdown');

describe('missing arguments', () => {
	test('no arguments', () => {
		function func() {
			return new Shutter();
		}

		expect(func).toThrowErrorMatchingInlineSnapshot(
			"\"Cannot destructure property 'email' of '_ref' as it is undefined.\""
		);
	});

	test('no email', () => {
		function func() {
			return new Shutter({});
		}

		expect(func).toThrowErrorMatchingInlineSnapshot(
			'"Parameter \\"email\\" is required"'
		);
	});

	test('email, no password', () => {
		function func() {
			return new Shutter({
				email: 'example@mail.com',
			});
		}

		expect(func).toThrowErrorMatchingInlineSnapshot(
			'"Parameter \\"password\\" is required"'
		);
	});

	test('email and password, no uri', () => {
		function func() {
			return new Shutter({
				email: 'example@mail.com',
				password: 'your_pass',
			});
		}

		expect(func).toThrowErrorMatchingInlineSnapshot(
			'"Parameter \\"uri\\" is required"'
		);
	});
});

describe('full config', () => {
	describe('Events', () => {
		const roomNumber = '5fb288c7d890f45a581823e4';
		const attendeeID = '5fb288d374eae06375dd75cc';

		test('addEvent', () => {
			const event = {
				type: '[UnitTest] CONNECTION',
				roomNumber,
				attendeeID,
				ip: '127.0.0.1',
				platform: {
					osName: 'iOS',
					osVersion: '11',
					browserName: 'Safari',
					browserVersion: '57',
					userAgent: 'sdsdgasdg',
				},
				audioSource: 'mic1',
				videoSource: 'cam1',
				peerID: 'sadg4e3geg',
				displayName: '[UnitTest]',
				error: 'String',
				reason: 'String',
			};

			const promise = back('Events_addEvent.json').then(({ nockDone }) => shutter.events.create(event).finally(nockDone));

			return expect(promise).resolves.toMatchInlineSnapshot(`
                Object {
                  "attendeeID": "5fb288d374eae06375dd75cc",
                  "audioDevices": Array [],
                  "audioSource": "mic1",
                  "content": null,
                  "date": "1623061703484",
                  "displayName": "[UnitTest]",
                  "error": "String",
                  "id": "60bdf4c70b1d2a96a99b125a",
                  "ip": "127.0.0.1",
                  "old": null,
                  "peerID": "sadg4e3geg",
                  "platform": Object {
                    "browserName": "Safari",
                    "browserVersion": "57",
                    "osName": "iOS",
                    "osVersion": "11",
                    "userAgent": "sdsdgasdg",
                  },
                  "reason": "String",
                  "roomNumber": "5fb288c7d890f45a581823e4",
                  "type": "[UnitTest] CONNECTION",
                  "videoDevices": Array [],
                  "videoSource": "cam1",
                }
              `);
		});

		test('addEvent (empty)', () => {
			const event = {};

			const promise = back('Events_addEvent_empty.json').then(({ nockDone }) => shutter.events.create(event).finally(nockDone));

			return expect(promise).rejects.toMatchInlineSnapshot(`
                Array [
                  Object {
                    "code": "BAD_USER_INPUT",
                    "locations": Array [
                      Object {
                        "column": 20,
                        "line": 2,
                      },
                    ],
                    "message": "Variable \\"$event\\" got invalid value {}; Field \\"type\\" of required type \\"String!\\" was not provided.",
                    "originalError": Object {},
                  },
                  Object {
                    "code": "BAD_USER_INPUT",
                    "locations": Array [
                      Object {
                        "column": 20,
                        "line": 2,
                      },
                    ],
                    "message": "Variable \\"$event\\" got invalid value {}; Field \\"roomNumber\\" of required type \\"String!\\" was not provided.",
                    "originalError": Object {},
                  },
                  Object {
                    "code": "BAD_USER_INPUT",
                    "locations": Array [
                      Object {
                        "column": 20,
                        "line": 2,
                      },
                    ],
                    "message": "Variable \\"$event\\" got invalid value {}; Field \\"attendeeID\\" of required type \\"String!\\" was not provided.",
                    "originalError": Object {},
                  },
                ]
              `);
		});
	});

	describe('Me', () => {
		test('get', () => {
			const promise = back('Me_get.json').then(({ nockDone }) => shutter.users.me().finally(nockDone));

			return expect(promise).resolves.toMatchInlineSnapshot(`
                Object {
                  "created": "1605532553161",
                  "email": "example@mail.com",
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
	});
});
