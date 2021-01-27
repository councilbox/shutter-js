const Shutter = require("..");

test("smoke", function () {
  expect(Shutter).toMatchInlineSnapshot(`
    Object {
      "VERSION": "1.3.2",
      "client": [Function],
    }
  `);
});
