const { back } = require('nock');

const request = require('../lib/request');
const Rooms = require('../lib/rooms');

const rooms = new Rooms(
	request({
		email: 'example@mail.com',
		password: 'your_pass',
		uri: 'http://example.test/graphql',
	})
);

back.fixtures = `${__dirname}/nockFixtures`;

back.setMode('lockdown');

test('list', () => {
	const promise = back('rooms/list.json').then(({ nockDone }) => rooms.list().finally(nockDone));

	return expect(promise).resolves.toMatchInlineSnapshot('Array []');
});

describe('get', () => {
	test('no arguments', () => {
		const promise = back('rooms/get.json').then(({ nockDone }) => rooms.get().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref' as it is undefined.]"
		);
	});

	test.skip('no roomNumber', () => {
		const promise = back('rooms/get_no_roomNumber.json').then(({ nockDone }) => rooms.get({}).finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 13,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('rooms/get_roomNumber.json').then(({ nockDone }) => rooms.get({}).finally(nockDone));

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('create', () => {
	test('no arguments', () => {
		const promise = back('rooms/create.json').then(({ nockDone }) => rooms.create().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'room' of '_ref2' as it is undefined.]"
		);
	});

	test.skip('no room', () => {
		const promise = back('rooms/create_no_room.json').then(({ nockDone }) => rooms.create({}).finally(nockDone));

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
                  "message": "Variable \\"$room\\" of required type \\"RoomInfo!\\" was not provided.",
                },
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 40,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$organizationID\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('room', () => {
		const promise = back('rooms/create_room.json').then(({ nockDone }) => rooms.create({}).finally(nockDone));

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('update', () => {
	test('no arguments', () => {
		const promise = back('rooms/update.json').then(({ nockDone }) => rooms.update().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'room' of '_ref3' as it is undefined.]"
		);
	});

	test.skip('no room', () => {
		const promise = back('rooms/update_no_room.json').then(({ nockDone }) => rooms.update({}).finally(nockDone));

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
                  "message": "Variable \\"$room\\" of required type \\"UpdateRoomInfo!\\" was not provided.",
                },
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 46,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$organizationID\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('room', () => {
		const promise = back('rooms/update_room.json').then(({ nockDone }) => rooms.update({}).finally(nockDone));

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('delete', () => {
	test('no arguments', () => {
		const promise = back('rooms/delete.json').then(({ nockDone }) => rooms.delete().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref4' as it is undefined.]"
		);
	});

	test.skip('no roomNumber', () => {
		const promise = back('rooms/delete_no_roomNumber.json').then(
			({ nockDone }) => rooms.delete({}).finally(nockDone)
		);

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
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('rooms/delete_roomNumber.json').then(({ nockDone }) => rooms.delete({}).finally(nockDone));

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('start', () => {
	test('no arguments', () => {
		const promise = back('rooms/start.json').then(({ nockDone }) => rooms.start().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref5' as it is undefined.]"
		);
	});

	test.skip('no roomNumber', () => {
		const promise = back('rooms/start_no_roomNumber.json').then(
			({ nockDone }) => rooms.start({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 21,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('rooms/start_roomNumber.json').then(({ nockDone }) => rooms.start({}).finally(nockDone));

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('close', () => {
	test('no arguments', () => {
		const promise = back('rooms/close.json').then(({ nockDone }) => rooms.close().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref6' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('rooms/close_no_roomNumber.json').then(
			({ nockDone }) => rooms.close({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 21,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('rooms/close_roomNumber.json').then(({ nockDone }) => rooms.close({}).finally(nockDone));

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('startRecording', () => {
	test('no arguments', () => {
		const promise = back('rooms/startRecording.json').then(({ nockDone }) => rooms.startRecording().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref7' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('rooms/startRecording_no_roomNumber.json').then(
			({ nockDone }) => rooms.startRecording({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 26,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('rooms/startRecording_roomNumber.json').then(
			({ nockDone }) => rooms.startRecording({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('stopRecording', () => {
	test('no arguments', () => {
		const promise = back('rooms/stopRecording.json').then(({ nockDone }) => rooms.stopRecording().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref8' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('rooms/stopRecording_no_roomNumber.json').then(
			({ nockDone }) => rooms.stopRecording({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 25,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('rooms/stopRecording_roomNumber.json').then(
			({ nockDone }) => rooms.stopRecording({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('stopSoupRecording', () => {
	test('no arguments', () => {
		const promise = back('rooms/stopSoupRecording.json').then(({ nockDone }) => rooms.stopSoupRecording().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref8' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('rooms/stopSoupRecording_no_roomNumber.json').then(
			({ nockDone }) => rooms.stopSoupRecording({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 25,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('rooms/stopSoupRecording_roomNumber.json').then(
			({ nockDone }) => rooms.stopSoupRecording({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('startMassiveStreaming', () => {
	test('no arguments', () => {
		const promise = back('rooms/startMassiveStreaming.json').then(({ nockDone }) => rooms.startMassiveStreaming().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref9' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('rooms/startMassiveStreaming_no_roomNumber.json').then(
			({ nockDone }) => rooms.startMassiveStreaming({}).finally(nockDone)
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
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('rooms/startMassiveStreaming_roomNumber.json').then(
			({ nockDone }) => rooms.startMassiveStreaming({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('stopMassiveStreaming', () => {
	test('no arguments', () => {
		const promise = back('rooms/stopMassiveStreaming.json').then(({ nockDone }) => rooms.stopMassiveStreaming().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref10' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('rooms/stopMassiveStreaming_no_roomNumber.json').then(
			({ nockDone }) => rooms.stopMassiveStreaming({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 29,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('rooms/stopMassiveStreaming_roomNumber.json').then(
			({ nockDone }) => rooms.stopMassiveStreaming({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('startExternalStreaming', () => {
	test('no arguments', () => {
		const promise = back('rooms/startExternalStreaming.json').then(
			({ nockDone }) => rooms.startExternalStreaming().finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref11' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back(
			'rooms/startExternalStreaming_no_roomNumber.json'
		).then(({ nockDone }) => rooms.startExternalStreaming({}).finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 38,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('rooms/startExternalStreaming_roomNumber.json').then(
			({ nockDone }) => rooms.startExternalStreaming({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('stopExternalStreaming', () => {
	test('no arguments', () => {
		const promise = back('rooms/stopExternalStreaming.json').then(
			({ nockDone }) => rooms.stopExternalStreaming().finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref12' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('rooms/stopExternalStreaming_no_roomNumber.json').then(
			({ nockDone }) => rooms.stopExternalStreaming({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 37,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('rooms/stopExternalStreaming_roomNumber.json').then(
			({ nockDone }) => rooms.stopExternalStreaming({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('attendeesUrls', () => {
	test('no arguments', () => {
		const promise = back('rooms/attendeesUrls.json').then(({ nockDone }) => rooms.attendeesUrls().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref13' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('rooms/attendeesUrls_no_roomNumber.json').then(
			({ nockDone }) => rooms.attendeesUrls({}).finally(nockDone)
		);

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
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('rooms/attendeesUrls_roomNumber.json').then(
			({ nockDone }) => rooms.attendeesUrls({ roomNumber: '1234' }).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});
