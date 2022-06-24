const IO = require("./test-io");
const _OPAQUE = require("./index.js")(IO);

const testClientAuthenticate = async (password: String, user_id: String) => {
  const OPAQUE = await _OPAQUE;

  OPAQUE.clientAuthenticate(password, user_id).then(() => {
    console.log.bind(null, "Shared secret:");
  });
};

export { testClientAuthenticate };
