const Shutter = require('..');

test('smoke', () => {
	expect(Shutter).toMatchInlineSnapshot(`
    Object {
      "VERSION": "1.3.3-alpha",
      "client": [Function],
    }
  `);
});
