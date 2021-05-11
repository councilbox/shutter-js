const { back } = require('nock');

const { client } = require('..');

back.fixtures = `${__dirname}/nockFixtures`;

back.setMode('lockdown');

describe('missing arguments', () => {
	test('no arguments', () => {
		expect(client).toThrowErrorMatchingInlineSnapshot(
			'"Cannot destructure property \'email\' of \'_ref\' as it is undefined."'
		);
	});

	test('no email', () => {
		function func() {
			client({});
		}

		expect(func).toThrowErrorMatchingInlineSnapshot(
			'"Parameter \\"email\\" is required"'
		);
	});

	test('email, no password', () => {
		function func() {
			client({
				email: 'example@mail.com',
			});
		}

		expect(func).toThrowErrorMatchingInlineSnapshot(
			'"Parameter \\"password\\" is required"'
		);
	});

	test('email and password, no uri', () => {
		function func() {
			client({
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
	let shutter;

	beforeEach(() => {
		shutter = client({
			email: 'example@mail.com',
			password: 'your_pass',
			uri: 'http://example.test/graphql',
		});
	});

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
              "date": "1610970564427",
              "displayName": "[UnitTest]",
              "error": "String",
              "id": "600575c432b16d5b96b7cbc6",
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
              "created": "1596456142392",
              "email": "test_account@shutter.com",
              "id": "5f27fcce40044428c9208cbd",
              "language": "es",
              "name": "Test",
              "organizations": Array [
                Object {
                  "created": "1596552826753",
                  "id": "5f29767a02768a1ec296001e",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5f29767a02768a1ec296001e&filetype=png",
                  "name": "Netflix",
                },
                Object {
                  "created": "1596700898253",
                  "id": "5f2bb8e2d3d8c508c548ca9f",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5f2bb8e2d3d8c508c548ca9f&filetype=png",
                  "name": "Nike",
                },
                Object {
                  "created": "1596702076622",
                  "id": "5f2bbd7ca80293095877c011",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5f2bbd7ca80293095877c011&filetype=png",
                  "name": "Pepsi",
                },
                Object {
                  "created": "1596705026687",
                  "id": "5f2bc902216cca0a5ad9c4a5",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5f2bc902216cca0a5ad9c4a5&filetype=png",
                  "name": "Zara",
                },
                Object {
                  "created": "1607019699406",
                  "id": "5fc92cb3cd2b5b07c6c3fa56",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fc92cb3cd2b5b07c6c3fa56&filetype=png",
                  "name": "Test Org",
                },
                Object {
                  "created": "1607071007558",
                  "id": "5fc9f51fcd2b5b07c6c3fa5e",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fc9f51fcd2b5b07c6c3fa5e&filetype=PNG",
                  "name": "testName20201204093647",
                },
                Object {
                  "created": "1607071202178",
                  "id": "5fc9f5e2cd2b5b07c6c3fa64",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fc9f5e2cd2b5b07c6c3fa64&filetype=PNG",
                  "name": "testName20201204094001",
                },
                Object {
                  "created": "1607072932958",
                  "id": "5fc9fca4cd2b5b07c6c3fa85",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fc9fca4cd2b5b07c6c3fa85&filetype=PNG",
                  "name": "testName20201204141325",
                },
                Object {
                  "created": "1607073124937",
                  "id": "5fc9fd64cd2b5b07c6c3fa92",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fc9fd64cd2b5b07c6c3fa92&filetype=PNG",
                  "name": "testName20201204101204",
                },
                Object {
                  "created": "1607073280390",
                  "id": "5fc9fe00cd2b5b07c6c3faa2",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fc9fe00cd2b5b07c6c3faa2&filetype=PNG",
                  "name": "testName20201204101439",
                },
                Object {
                  "created": "1607087232071",
                  "id": "5fca3480cd2b5b07c6c3fad1",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fca3480cd2b5b07c6c3fad1&filetype=PNG",
                  "name": "testName20201204140711",
                },
                Object {
                  "created": "1607087605769",
                  "id": "5fca35f5cd2b5b07c6c3fade",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fca35f5cd2b5b07c6c3fade&filetype=PNG",
                  "name": "testName20201204141325",
                },
                Object {
                  "created": "1607692692894",
                  "id": "5fd37194cd2b5b07c6c3ff15",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd37194cd2b5b07c6c3ff15&filetype=PNG",
                  "name": "testName202012111418",
                },
                Object {
                  "created": "1607693343527",
                  "id": "5fd3741fcd2b5b07c6c3ff26",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd3741fcd2b5b07c6c3ff26&filetype=PNG",
                  "name": "testName202012111429",
                },
                Object {
                  "created": "1607693417897",
                  "id": "5fd37469cd2b5b07c6c3ff33",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd37469cd2b5b07c6c3ff33&filetype=PNG",
                  "name": "testName202012111430",
                },
                Object {
                  "created": "1607693472094",
                  "id": "5fd374a0cd2b5b07c6c3ff44",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd374a0cd2b5b07c6c3ff44&filetype=PNG",
                  "name": "testName202012111431",
                },
                Object {
                  "created": "1607693689954",
                  "id": "5fd37579cd2b5b07c6c3ff53",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd37579cd2b5b07c6c3ff53&filetype=PNG",
                  "name": "testName202012111434",
                },
                Object {
                  "created": "1607694013843",
                  "id": "5fd376bdcd2b5b07c6c3ff6c",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd376bdcd2b5b07c6c3ff6c&filetype=PNG",
                  "name": "testName202012111440",
                },
                Object {
                  "created": "1607694080120",
                  "id": "5fd37700cd2b5b07c6c3ff79",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd37700cd2b5b07c6c3ff79&filetype=PNG",
                  "name": "testName202012111441",
                },
                Object {
                  "created": "1607940210542",
                  "id": "5fd73872cd2b5b07c6c3ff98",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd73872cd2b5b07c6c3ff98&filetype=PNG",
                  "name": "Test Org Modified 28-12(1)",
                },
                Object {
                  "created": "1607940240907",
                  "id": "5fd73890cd2b5b07c6c3ffb2",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd73890cd2b5b07c6c3ffb2&filetype=PNG",
                  "name": "testName202012141104",
                },
                Object {
                  "created": "1607950532742",
                  "id": "5fd760c4cd2b5b07c6c3ffc8",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd760c4cd2b5b07c6c3ffc8&filetype=PNG",
                  "name": "testName202012141355",
                },
                Object {
                  "created": "1607950640393",
                  "id": "5fd76130cd2b5b07c6c3ffdc",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd76130cd2b5b07c6c3ffdc&filetype=PNG",
                  "name": "testName202012141357",
                },
                Object {
                  "created": "1607950691724",
                  "id": "5fd76163cd2b5b07c6c3fff0",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd76163cd2b5b07c6c3fff0&filetype=PNG",
                  "name": "testName202012141358",
                },
                Object {
                  "created": "1607950752646",
                  "id": "5fd761a0cd2b5b07c6c40008",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd761a0cd2b5b07c6c40008&filetype=PNG",
                  "name": "testName202012141359",
                },
                Object {
                  "created": "1607950830848",
                  "id": "5fd761eecd2b5b07c6c4002a",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd761eecd2b5b07c6c4002a&filetype=PNG",
                  "name": "testName202012141400",
                },
                Object {
                  "created": "1607951025387",
                  "id": "5fd762b1cd2b5b07c6c40042",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd762b1cd2b5b07c6c40042&filetype=PNG",
                  "name": "testName202012141403",
                },
                Object {
                  "created": "1607951049657",
                  "id": "5fd762c9cd2b5b07c6c4005a",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd762c9cd2b5b07c6c4005a&filetype=PNG",
                  "name": "testName202012141404",
                },
                Object {
                  "created": "1607951162001",
                  "id": "5fd7633acd2b5b07c6c40072",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd7633acd2b5b07c6c40072&filetype=PNG",
                  "name": "testName202012141406",
                },
                Object {
                  "created": "1607952101583",
                  "id": "5fd766e5cd2b5b07c6c40092",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd766e5cd2b5b07c6c40092&filetype=PNG",
                  "name": "testName202012141421",
                },
                Object {
                  "created": "1607964843260",
                  "id": "5fd798abcd2b5b07c6c400b2",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd798abcd2b5b07c6c400b2&filetype=PNG",
                  "name": "testName202012141754",
                },
                Object {
                  "created": "1607965432031",
                  "id": "5fd79af8cd2b5b07c6c400ca",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd79af8cd2b5b07c6c400ca&filetype=PNG",
                  "name": "testName202012141803",
                },
                Object {
                  "created": "1608026594617",
                  "id": "5fd889e2cd2b5b07c6c400e9",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd889e2cd2b5b07c6c400e9&filetype=PNG",
                  "name": "testName202012151103",
                },
                Object {
                  "created": "1608029660889",
                  "id": "5fd895dccd2b5b07c6c40113",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd895dccd2b5b07c6c40113&filetype=PNG",
                  "name": "testName202012151154",
                },
                Object {
                  "created": "1608030393680",
                  "id": "5fd898b9cd2b5b07c6c4012b",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd898b9cd2b5b07c6c4012b&filetype=PNG",
                  "name": "testName202012151206",
                },
                Object {
                  "created": "1608033550424",
                  "id": "5fd8a50ecd2b5b07c6c40149",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8a50ecd2b5b07c6c40149&filetype=PNG",
                  "name": "testName202012151259",
                },
                Object {
                  "created": "1608033720613",
                  "id": "5fd8a5b8cd2b5b07c6c40161",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8a5b8cd2b5b07c6c40161&filetype=PNG",
                  "name": "testName202012151301",
                },
                Object {
                  "created": "1608033873661",
                  "id": "5fd8a651cd2b5b07c6c40179",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8a651cd2b5b07c6c40179&filetype=PNG",
                  "name": "testName202012151304",
                },
                Object {
                  "created": "1608034070219",
                  "id": "5fd8a716cd2b5b07c6c40191",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8a716cd2b5b07c6c40191&filetype=PNG",
                  "name": "testName202012151307",
                },
                Object {
                  "created": "1608034391201",
                  "id": "5fd8a857cd2b5b07c6c401a9",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8a857cd2b5b07c6c401a9&filetype=PNG",
                  "name": "testName202012151313",
                },
                Object {
                  "created": "1608034512361",
                  "id": "5fd8a8d0cd2b5b07c6c401c1",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8a8d0cd2b5b07c6c401c1&filetype=PNG",
                  "name": "testName202012151315",
                },
                Object {
                  "created": "1608034810039",
                  "id": "5fd8a9facd2b5b07c6c401eb",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8a9facd2b5b07c6c401eb&filetype=PNG",
                  "name": "testName202012151320",
                },
                Object {
                  "created": "1608035229314",
                  "id": "5fd8ab9dcd2b5b07c6c40203",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8ab9dcd2b5b07c6c40203&filetype=PNG",
                  "name": "testName202012151327",
                },
                Object {
                  "created": "1608038531458",
                  "id": "5fd8b883cd2b5b07c6c4021f",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8b883cd2b5b07c6c4021f&filetype=PNG",
                  "name": "testName202012151422",
                },
                Object {
                  "created": "1608038697890",
                  "id": "5fd8b929cd2b5b07c6c4024d",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8b929cd2b5b07c6c4024d&filetype=PNG",
                  "name": "testName202012151424",
                },
                Object {
                  "created": "1608038813167",
                  "id": "5fd8b99dcd2b5b07c6c4026b",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8b99dcd2b5b07c6c4026b&filetype=PNG",
                  "name": "testName202012151426",
                },
                Object {
                  "created": "1608047925938",
                  "id": "5fd8dd35cd2b5b07c6c40298",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8dd35cd2b5b07c6c40298&filetype=PNG",
                  "name": "testName202012151658",
                },
                Object {
                  "created": "1608048040239",
                  "id": "5fd8dda8cd2b5b07c6c402c8",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8dda8cd2b5b07c6c402c8&filetype=PNG",
                  "name": "testName202012151700",
                },
                Object {
                  "created": "1608048071645",
                  "id": "5fd8ddc7cd2b5b07c6c402d5",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8ddc7cd2b5b07c6c402d5&filetype=PNG",
                  "name": "testName202012151701",
                },
                Object {
                  "created": "1608048207069",
                  "id": "5fd8de4fcd2b5b07c6c4030b",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8de4fcd2b5b07c6c4030b&filetype=PNG",
                  "name": "testName202012151703",
                },
                Object {
                  "created": "1608049718769",
                  "id": "5fd8e436cd2b5b07c6c40345",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8e436cd2b5b07c6c40345&filetype=PNG",
                  "name": "testName202012151728",
                },
                Object {
                  "created": "1608049910739",
                  "id": "5fd8e4f6cd2b5b07c6c4037a",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8e4f6cd2b5b07c6c4037a&filetype=PNG",
                  "name": "testName202012151731",
                },
                Object {
                  "created": "1608050180661",
                  "id": "5fd8e604cd2b5b07c6c403af",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd8e604cd2b5b07c6c403af&filetype=PNG",
                  "name": "testName202012151736",
                },
                Object {
                  "created": "1608111622181",
                  "id": "5fd9d606cd2b5b07c6c403e9",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd9d606cd2b5b07c6c403e9&filetype=PNG",
                  "name": "testName202012161040",
                },
                Object {
                  "created": "1608111700082",
                  "id": "5fd9d654cd2b5b07c6c4041e",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd9d654cd2b5b07c6c4041e&filetype=PNG",
                  "name": "testName202012161041",
                },
                Object {
                  "created": "1608111791577",
                  "id": "5fd9d6afcd2b5b07c6c40458",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd9d6afcd2b5b07c6c40458&filetype=PNG",
                  "name": "testName202012161043",
                },
                Object {
                  "created": "1608112015447",
                  "id": "5fd9d78fcd2b5b07c6c4048d",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fd9d78fcd2b5b07c6c4048d&filetype=PNG",
                  "name": "testName202012161046",
                },
                Object {
                  "created": "1608138640598",
                  "id": "5fda3f90cd2b5b07c6c40650",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fda3f90cd2b5b07c6c40650&filetype=PNG",
                  "name": "testName202012161810",
                },
                Object {
                  "created": "1608638616015",
                  "id": "5fe1e09832b16d5b96b7c1ae",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe1e09832b16d5b96b7c1ae&filetype=PNG",
                  "name": "testName202012221303",
                },
                Object {
                  "created": "1608642870799",
                  "id": "5fe1f13632b16d5b96b7c1cc",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe1f13632b16d5b96b7c1cc&filetype=PNG",
                  "name": "testName202012221414",
                },
                Object {
                  "created": "1608643027357",
                  "id": "5fe1f1d332b16d5b96b7c205",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe1f1d332b16d5b96b7c205&filetype=PNG",
                  "name": "testName202012221417",
                },
                Object {
                  "created": "1608643359213",
                  "id": "5fe1f31f32b16d5b96b7c23e",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe1f31f32b16d5b96b7c23e&filetype=PNG",
                  "name": "testName202012221422",
                },
                Object {
                  "created": "1608652224713",
                  "id": "5fe215c032b16d5b96b7c279",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe215c032b16d5b96b7c279&filetype=PNG",
                  "name": "testName202012221650",
                },
                Object {
                  "created": "1608652354910",
                  "id": "5fe2164232b16d5b96b7c2b2",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe2164232b16d5b96b7c2b2&filetype=PNG",
                  "name": "testName202012221652",
                },
                Object {
                  "created": "1608652480596",
                  "id": "5fe216c032b16d5b96b7c2eb",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe216c032b16d5b96b7c2eb&filetype=PNG",
                  "name": "testName202012221654",
                },
                Object {
                  "created": "1608654071876",
                  "id": "5fe21cf732b16d5b96b7c326",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe21cf732b16d5b96b7c326&filetype=PNG",
                  "name": "testName202012221721",
                },
                Object {
                  "created": "1608654144625",
                  "id": "5fe21d4032b16d5b96b7c35f",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe21d4032b16d5b96b7c35f&filetype=PNG",
                  "name": "testName202012221722",
                },
                Object {
                  "created": "1608654557317",
                  "id": "5fe21edd32b16d5b96b7c398",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe21edd32b16d5b96b7c398&filetype=PNG",
                  "name": "testName202012221729",
                },
                Object {
                  "created": "1608655059685",
                  "id": "5fe220d332b16d5b96b7c3d6",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe220d332b16d5b96b7c3d6&filetype=PNG",
                  "name": "testName202012221737",
                },
                Object {
                  "created": "1608655313854",
                  "id": "5fe221d132b16d5b96b7c40f",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe221d132b16d5b96b7c40f&filetype=PNG",
                  "name": "testName202012221741",
                },
                Object {
                  "created": "1608655418095",
                  "id": "5fe2223a32b16d5b96b7c448",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe2223a32b16d5b96b7c448&filetype=PNG",
                  "name": "testName202012221743",
                },
                Object {
                  "created": "1608656068960",
                  "id": "5fe224c432b16d5b96b7c484",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe224c432b16d5b96b7c484&filetype=PNG",
                  "name": "testName202012221754",
                },
                Object {
                  "created": "1608658755737",
                  "id": "5fe22f4332b16d5b96b7c4bd",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe22f4332b16d5b96b7c4bd&filetype=PNG",
                  "name": "testName202012221839",
                },
                Object {
                  "created": "1608658917505",
                  "id": "5fe22fe532b16d5b96b7c4f6",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe22fe532b16d5b96b7c4f6&filetype=PNG",
                  "name": "testName202012221841",
                },
                Object {
                  "created": "1608659207789",
                  "id": "5fe2310732b16d5b96b7c534",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe2310732b16d5b96b7c534&filetype=PNG",
                  "name": "testName202012221846",
                },
                Object {
                  "created": "1608659861747",
                  "id": "5fe2339532b16d5b96b7c570",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe2339532b16d5b96b7c570&filetype=PNG",
                  "name": "testName202012221857",
                },
                Object {
                  "created": "1608660036349",
                  "id": "5fe2344432b16d5b96b7c5a9",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe2344432b16d5b96b7c5a9&filetype=PNG",
                  "name": "testName202012221900",
                },
                Object {
                  "created": "1608660668859",
                  "id": "5fe236bc32b16d5b96b7c5e7",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe236bc32b16d5b96b7c5e7&filetype=PNG",
                  "name": "testName202012221911",
                },
                Object {
                  "created": "1608660945191",
                  "id": "5fe237d132b16d5b96b7c625",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe237d132b16d5b96b7c625&filetype=PNG",
                  "name": "testName202012221915",
                },
                Object {
                  "created": "1608661307388",
                  "id": "5fe2393b32b16d5b96b7c664",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe2393b32b16d5b96b7c664&filetype=PNG",
                  "name": "testName202012221921",
                },
                Object {
                  "created": "1608661810337",
                  "id": "5fe23b3232b16d5b96b7c6a6",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe23b3232b16d5b96b7c6a6&filetype=PNG",
                  "name": "testName202012221930",
                },
                Object {
                  "created": "1608724962665",
                  "id": "5fe331e232b16d5b96b7c6ea",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe331e232b16d5b96b7c6ea&filetype=PNG",
                  "name": "testName202012231302",
                },
                Object {
                  "created": "1608725126083",
                  "id": "5fe3328632b16d5b96b7c727",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe3328632b16d5b96b7c727&filetype=PNG",
                  "name": "testName202012231305",
                },
                Object {
                  "created": "1608725528556",
                  "id": "5fe3341832b16d5b96b7c768",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe3341832b16d5b96b7c768&filetype=PNG",
                  "name": "testName202012231312",
                },
                Object {
                  "created": "1609152236528",
                  "id": "5fe9b6ec32b16d5b96b7c7d7",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe9b6ec32b16d5b96b7c7d7&filetype=PNG",
                  "name": "testName202012281143",
                },
                Object {
                  "created": "1609152369250",
                  "id": "5fe9b77132b16d5b96b7c7e5",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe9b77132b16d5b96b7c7e5&filetype=PNG",
                  "name": "testName202012281146",
                },
                Object {
                  "created": "1609158388893",
                  "id": "5fe9cef432b16d5b96b7c7fb",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe9cef432b16d5b96b7c7fb&filetype=PNG",
                  "name": "testName202012281326",
                },
                Object {
                  "created": "1609158443254",
                  "id": "5fe9cf2b32b16d5b96b7c808",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe9cf2b32b16d5b96b7c808&filetype=PNG",
                  "name": "testName202012281327",
                },
                Object {
                  "created": "1609158895763",
                  "id": "5fe9d0ef32b16d5b96b7c815",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe9d0ef32b16d5b96b7c815&filetype=PNG",
                  "name": "testNameCambiado202012281334",
                },
                Object {
                  "created": "1609158990896",
                  "id": "5fe9d14e32b16d5b96b7c84d",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe9d14e32b16d5b96b7c84d&filetype=PNG",
                  "name": "testNameCambiado202012281336",
                },
                Object {
                  "created": "1609159458441",
                  "id": "5fe9d32232b16d5b96b7c885",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe9d32232b16d5b96b7c885&filetype=PNG",
                  "name": "testNameCambiado202012281344",
                },
                Object {
                  "created": "1609160137899",
                  "id": "5fe9d5c932b16d5b96b7c8ca",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe9d5c932b16d5b96b7c8ca&filetype=PNG",
                  "name": "testNameCambiado202012281355",
                },
                Object {
                  "created": "1609160365842",
                  "id": "5fe9d6ad32b16d5b96b7c905",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe9d6ad32b16d5b96b7c905&filetype=PNG",
                  "name": "testName202012281359",
                },
                Object {
                  "created": "1609160475161",
                  "id": "5fe9d71b32b16d5b96b7c919",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe9d71b32b16d5b96b7c919&filetype=PNG",
                  "name": "testNameCambiado202012281401",
                },
                Object {
                  "created": "1609161113547",
                  "id": "5fe9d99932b16d5b96b7c953",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe9d99932b16d5b96b7c953&filetype=PNG",
                  "name": "testNameCambiado202012281411",
                },
                Object {
                  "created": "1609161682873",
                  "id": "5fe9dbd232b16d5b96b7c99a",
                  "logo": "https://shutter-api.dev.councilbox.com/logo/organization?id=5fe9dbd232b16d5b96b7c99a&filetype=PNG",
                  "name": "testNameCambiado202012281421",
                },
              ],
              "state": "UNCONFIRMED",
              "surname": "Account",
              "type": "ACCOUNT",
            }
          `);
			}));
	});
});
