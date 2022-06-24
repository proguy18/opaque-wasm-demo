// const IO = require('../../../../opaque-main/test/test-io');
// const _OPAQUE = require('../../../../opaque-main/index.js')(IO);

// const testServerRegister = async () => {
//     const OPAQUE = await _OPAQUE;

//     /*
//     *  Server
//     */
//     const database = {};  // Test database to show what user data gets stored

//     // Register a new user
//     OPAQUE.serverRegister().then(user => {
//         database[user.id] = user.pepper;

//         // Handle a login attempt
//         let user_id = user.id;
//         let pepper = database[user_id];
//         OPAQUE.serverAuthenticate(user_id, pepper).then(token => {
//         try {
//             expect(token).not.toBeNull();
//             // done()
//         } catch (error) {
//             // done(error);
//         }
//         }, (error: any) => {
//         expect(error).toBeDefined();
//         });
//     });

// }

export {};