const { client } = require("..");

describe("missing arguments", function () {
  test("no arguments", function () {
    expect(client).toThrowErrorMatchingInlineSnapshot(
      `"Parameter \\"email\\" is required"`
    );
  });

  test("no email", function () {
    function func() {
      client({});
    }

    expect(func).toThrowErrorMatchingInlineSnapshot(
      `"Parameter \\"email\\" is required"`
    );
  });

  test("email, no password", function () {
    function func() {
      client({
        email: "example@mail.com",
      });
    }

    expect(func).toThrowErrorMatchingInlineSnapshot(
      `"Parameter \\"password\\" is required"`
    );
  });

  test("email and password, no uri", function () {
    function func() {
      client({
        email: "example@mail.com",
        password: "your_pass",
      });
    }

    expect(func).toThrowErrorMatchingInlineSnapshot(
      `"Parameter \\"uri\\" is required"`
    );
  });
});

describe("Events", function () {
  const roomNumber = "5fb288c7d890f45a581823e4";
  const attendeeID = "5fb288d374eae06375dd75cc";

  let createdEvent;
  let shutter;

  beforeEach(function () {
    shutter = client({
      email: "example@mail.com",
      password: "your_pass",
      uri: "http://example.test",
    });
  });

  test("addEvent", function () {
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
        userAgent: "sdsdgasdg",
      },
      audioSource: "mic1",
      videoSource: "cam1",
      peerID: "sadg4e3geg",
      displayName: "[UnitTest]",
      error: "String",
      reason: "String",
    };

    return shutter.events.create(event).then((response) => {
      expect(response.data).toBeInstanceOf(Object);
      expect(response.data).toHaveProperty("addEvent");
      expect(response.data.addEvent).not.toBeNull();
      expect(response.data.addEvent).toHaveProperty("id");

      createdEvent = response.data.addEvent;
    });
  });
});
