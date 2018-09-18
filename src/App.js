import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main";
import Header from "./components/Header";
import Aux from "./hoc/_Aux";
import PropTypes from "prop-types";

import { UserContext } from "./Context/UserContext";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  handleLogin = () => {
    console.log(this);
    this.context.router.history.push("login");
  };

  render() {
    return (
      <Aux>
        <UserContext.Provider value={this.state}>
        <Header handleLogin={() => this.handleLogin()} />
        <Main />
        </UserContext.Provider>
      </Aux>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object
};

export default App;
