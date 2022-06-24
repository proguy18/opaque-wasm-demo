import React from "react";
import { testClientRegister } from "./api/clientRegister";
import { Registration, Login, HandleRegistration, HandleLogin, ServerSetup } from 'opaque-wasm';

// type Props {}
// type State {
//     username: string
//     password: string
// }
export class Register extends React.Component {
  /*
   *  Client
   */
  user_id = "newuser";
  password = "correct horse battery staple";
  wrongPass = "correct horse battery staples";

  /*
   *  Server
   */
  database = {}; // Test database to show what user data gets stored
  //   constructor(props: Props) {
  //     super(props);
  //     this.state: State = {
  //       username: "",
  //       passward: "",
  //     };
  //   }

  //   handleChange = (e: any) => {
  //     this.setState({ [e.name.target]: e.target.value });
  //   };

  testRun = () => {
    console.log('--- STARTING ---')

    const encoded_user_id = new TextEncoder().encode(this.user_id);

    // Server configuration; this must be saved.
    let server_setup = new ServerSetup()

    // Save and reload the ServerSetup for demonstration
    const server_setup_export = server_setup.serialize();
    server_setup = ServerSetup.deserialize(server_setup_export);
    
    // User registration
    const registration = new Registration()
    const registration_tx = registration.start(this.password)

    console.log('--- begin ---', registration_tx)

    const serverRegistration = new HandleRegistration(server_setup)
    const registration_response = serverRegistration.start(encoded_user_id, registration_tx)
    console.log('-- server response --', registration_response)


    const registration_final = registration.finish(registration_response)
    console.log('-- client finish --', registration_final)

    const password_file = serverRegistration.finish(registration_final)
    console.log('-- password_file --', password_file)

    // User Login

    const login = new Login()
    const login_tx = login.start(this.password)
    console.log('login_tx', login_tx)

    console.log(login)

    const serverLogin = new HandleLogin(server_setup)
    const login_response = serverLogin.start(password_file, encoded_user_id, login_tx)

    console.log('login_response', login_response)

    const login_final = login.finish(login_response)
    console.log('client login final', login_final)

    console.log(login)

    console.log('client session key', login.getSessionKey())

    const server_finish = serverLogin.finish(login_final)
    console.log('server session key', server_finish)
  };

  render() {
    return (
      <div className="base-container">
        <div className="header">Register</div>
        <div className="content">
          <div className="image">{/* <img src = {loginImg} /> */}</div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                // onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                placeholder="password"
                // onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Register
          </button>
          <button type="button" className="btn" onClick={this.testRun}>
            Test Register
          </button>
        </div>
      </div>
    );
  }
}
