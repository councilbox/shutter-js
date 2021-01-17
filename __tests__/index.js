const Shutter = require("..");

test("smoke", function () {
  expect(Shutter).toMatchInlineSnapshot(`
    Object {
      "VERSION": "1.3.1",
      "client": [Function],
    }
  `);
});
