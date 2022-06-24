const IO = require("./test-io");
const _OPAQUE = require("./index.js")(IO);

const testClientRegister = async (password: string, user_id: string) => {
  const OPAQUE = await _OPAQUE;

  console.log("Attempting registration with password: " + password);
  console.log("Attempting registration with username: " + user_id);
  OPAQUE.clientRegister(password, user_id).then(
    console.log.bind(null, "Registered:")
  );

  
  OPAQUE.clientAuthenticate(password, user_id).then(() => {
    console.log.bind(null, "Shared secret:");
  });

  /*
   *  Server
   */
  const database: any = {}; // Test database to show what user data gets stored

  // Register a new user
  OPAQUE.serverRegister().then((user: any) => {
    database[user.id] = user.pepper;

    // Handle a login attempt
    let user_id = user.id;
    let pepper = database[user_id];
    OPAQUE.serverAuthenticate(user_id, pepper).then(
      (token: any) => {
        try {
          expect(token).not.toBeNull();
          // done()
        } catch (error) {
          // done(error);
        }
      },
      (error: any) => {
        expect(error).toBeDefined();
      }
    );
  });
};

export { testClientRegister };
