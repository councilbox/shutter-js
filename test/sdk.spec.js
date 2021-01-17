const Shutter = require('../index');

const options = require('./config');


describe('SDK', async() => {
	const ShutterClient = Shutter.client(options);
	const shutter = await ShutterClient.initialize();
	console.log('SHUTTER CLIENT INITIALIZED => ', shutter);

	describe('Events', () => {
		const roomNumber = "5fb288c7d890f45a581823e4";
		const attendeeID = "5fb288d374eae06375dd75cc";
		let createdEvent;

		it('addEvent', () => {
			const event = {
				type: "[UnitTest] CONNECTION",
				roomNumber,
				attendeeID,
				ip: "127.0.0.1",
				platform: {
					osName: "iOS",
					osVersion: "11",
					browserName: "Safari",
					browserVersion: "57",
					userAgent: "sdsdgasdg"
				},
				audioSource: "mic1",
				videoSource: "cam1",
				peerID: "sadg4e3geg",
				displayName: "[UnitTest]",
				error: "String",
				reason: "String"
			};

			return shutter.events.create(event)
				.then((response) => {
					expect(response.data).toBeInstanceOf(Object);
					expect(response.data).toHaveProperty('addEvent');
					expect(response.data.addEvent).not.toBeNull();
					expect(response.data.addEvent).toHaveProperty('id');
					createdEvent = response.data.addEvent;
				});
		});
	})
})
