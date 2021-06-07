const { back } = require('nock');

const Shutter = require('..');

const shutter = new Shutter({
	email: 'example@mail.com',
	password: 'your_pass',
	uri: 'http://example.test/graphql',
});

back.fixtures = `${__dirname}/nockFixtures`;

back.setMode('lockdown');

describe.skip('missing arguments', () => {
	test('no arguments', () => {
		expect(new Shutter()).toThrowErrorMatchingInlineSnapshot(
			'"Parameter \\"email\\" is required"'
		);
	});

	test('no email', () => {
		expect(
			new Shutter({
				password: 'your_pass',
			})
		).toThrowErrorMatchingInlineSnapshot('"Parameter \\"email\\" is required"');
	});

	test('email, no password', () => {
		expect(
			new Shutter({
				email: 'example@mail.com',
			})
		).toThrowErrorMatchingInlineSnapshot(
			'"Parameter \\"password\\" is required"'
		);
	});

	test('email and password, no uri', () => {
		expect(
			new Shutter({
				email: 'example@mail.com',
				password: 'your_pass',
			})
		).toThrowErrorMatchingInlineSnapshot('"Parameter \\"uri\\" is required"');
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

			return back('Events_addEvent.json')
				.then(({ nockDone }) => shutter.events.create(event).finally(nockDone))
				.then(response => {
					expect(response).toMatchInlineSnapshot(`
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
		});
	});

	describe('Me', () => {
		test('get', () => back('Me_get.json')
			.then(({ nockDone }) => shutter.users.me().finally(nockDone))
			.then(response => {
				expect(response).toMatchInlineSnapshot(`
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
			}));
	});
});
