const { back } = require('nock');

const Attendees = require('../lib/attendees');
const request = require('../lib/request');

const attendees = new Attendees(
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
		const promise = back('attendees/list.json').then(({ nockDone }) => attendees.list().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('attendees/list_no_roomNumber.json').then(
			({ nockDone }) => attendees.list({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 18,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('attendees/list_roomNumber.json').then(
			({ nockDone }) => attendees.list({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot('Array []');
	});
});

describe('get', () => {
	test('no arguments', () => {
		const promise = back('attendees/get.json').then(({ nockDone }) => attendees.get().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref2' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('attendees/get_no_roomNumber.json').then(
			({ nockDone }) => attendees.get({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 17,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 39,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$attendeeID\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('attendees/get_roomNumber.json').then(({ nockDone }) => attendees.get({}).finally(nockDone));

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('getURL', () => {
	test('no arguments', () => {
		const promise = back('attendees/getURL.json').then(({ nockDone }) => attendees.getURL().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref3' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('attendees/getURL_no_roomNumber.json').then(
			({ nockDone }) => attendees.getURL({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 20,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 42,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$attendeeID\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('attendees/getURL_roomNumber.json').then(
			({ nockDone }) => attendees.getURL({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('create', () => {
	test('no arguments', () => {
		const promise = back('attendees/create.json').then(({ nockDone }) => attendees.create().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref4' as it is undefined.]"
		);
	});

	test('no room', () => {
		const promise = back('attendees/create_no_room.json').then(({ nockDone }) => attendees.create({}).finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 23,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 45,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$attendee\\" of required type \\"AttendeeInfo!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('room', () => {
		const promise = back('attendees/create_room.json').then(({ nockDone }) => attendees.create({}).finally(nockDone));

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('update', () => {
	test('no arguments', () => {
		const promise = back('attendees/update.json').then(({ nockDone }) => attendees.update().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref5' as it is undefined.]"
		);
	});

	test('no room', () => {
		const promise = back('attendees/update_no_room.json').then(({ nockDone }) => attendees.update({}).finally(nockDone));

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
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 48,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$attendee\\" of required type \\"UpdateAttendeeInfo!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('room', () => {
		const promise = back('attendees/update_room.json').then(({ nockDone }) => attendees.update({}).finally(nockDone));

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('delete', () => {
	test('no arguments', () => {
		const promise = back('attendees/delete.json').then(({ nockDone }) => attendees.delete().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref6' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('attendees/delete_no_roomNumber.json').then(
			({ nockDone }) => attendees.delete({}).finally(nockDone)
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
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 48,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$attendeeID\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('attendees/delete_roomNumber.json').then(
			({ nockDone }) => attendees.delete({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('raiseHand', () => {
	test('no arguments', () => {
		const promise = back('attendees/raiseHand.json').then(({ nockDone }) => attendees.raiseHand().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref7' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('attendees/raiseHand_no_roomNumber.json').then(
			({ nockDone }) => attendees.raiseHand({}).finally(nockDone)
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
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 43,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$attendeeID\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('attendees/raiseHand_roomNumber.json').then(
			({ nockDone }) => attendees.raiseHand({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('lowerHand', () => {
	test('no arguments', () => {
		const promise = back('attendees/lowerHand.json').then(({ nockDone }) => attendees.lowerHand().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref8' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('attendees/lowerHand_no_roomNumber.json').then(
			({ nockDone }) => attendees.lowerHand({}).finally(nockDone)
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
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 43,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$attendeeID\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('attendees/lowerHand_roomNumber.json').then(
			({ nockDone }) => attendees.lowerHand({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('grantWord', () => {
	test('no arguments', () => {
		const promise = back('attendees/grantWord.json').then(({ nockDone }) => attendees.grantWord().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref9' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('attendees/grantWord_no_roomNumber.json').then(
			({ nockDone }) => attendees.grantWord({}).finally(nockDone)
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
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 43,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$attendeeID\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('attendees/grantWord_roomNumber.json').then(
			({ nockDone }) => attendees.grantWord({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});

describe('denyWord', () => {
	test('no arguments', () => {
		const promise = back('attendees/denyWord.json').then(({ nockDone }) => attendees.denyWord().finally(nockDone));

		return expect(promise).rejects.toMatchInlineSnapshot(
			"[TypeError: Cannot destructure property 'roomNumber' of '_ref10' as it is undefined.]"
		);
	});

	test('no roomNumber', () => {
		const promise = back('attendees/denyWord_no_roomNumber.json').then(
			({ nockDone }) => attendees.denyWord({}).finally(nockDone)
		);

		return expect(promise).rejects.toMatchInlineSnapshot(`
              Array [
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 20,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$roomNumber\\" of required type \\"String!\\" was not provided.",
                },
                Object {
                  "code": "INTERNAL_SERVER_ERROR",
                  "locations": Array [
                    Object {
                      "column": 42,
                      "line": 2,
                    },
                  ],
                  "message": "Variable \\"$attendeeID\\" of required type \\"String!\\" was not provided.",
                },
              ]
            `);
	});

	test.skip('roomNumber', () => {
		const promise = back('attendees/denyWord_roomNumber.json').then(
			({ nockDone }) => attendees.denyWord({}).finally(nockDone)
		);

		return expect(promise).resolves.toMatchInlineSnapshot();
	});
});
