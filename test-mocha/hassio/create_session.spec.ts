import * as assert from "assert";
import { createHassioSession } from "../../src/data/hassio/supervisor";

const sessionID = "fhdsu73rh3io4h8f3irhjel8ousafehf8f3yh";

describe("Create hassio session", function () {
  it("Test create session without HTTPS", async function () {
    // @ts-ignore
    global.document = {};
    // @ts-ignore
    global.location = {};
    await createHassioSession({
      // @ts-ignore
      callApi: async function () {
        return { data: { session: sessionID } };
      },
    });
    assert.equal(
      // @ts-ignore
      global.document.cookie,
      "ingress_session=fhdsu73rh3io4h8f3irhjel8ousafehf8f3yh;path=/api/hassio_ingress/;SameSite=Strict"
    );
  });
  it("Test create session with HTTPS", async function () {
    // @ts-ignore
    global.document = {};
    // @ts-ignore
    global.location = { protocol: "https:" };
    await createHassioSession({
      // @ts-ignore
      callApi: async function () {
        return { data: { session: sessionID } };
      },
    });
    assert.equal(
      // @ts-ignore
      global.document.cookie,
      "ingress_session=fhdsu73rh3io4h8f3irhjel8ousafehf8f3yh;path=/api/hassio_ingress/;SameSite=Strict;Secure"
    );

    // Clean up in case they will be used in other tests
    // @ts-ignore
    global.document = {};
    // @ts-ignore
    global.location = {};
  });
  it("Test fail to create", async function () {
    const createSessionPromise = createHassioSession({
      // @ts-ignore
      callApi: async function () {},
    }).then(
      () => true,
      () => false
    );
    assert.equal(await createSessionPromise, false);
  });
});
