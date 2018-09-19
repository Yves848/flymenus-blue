import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import Header from './components/Header';
import Aux from './hoc/_Aux';
import PropTypes from 'prop-types';
import {Card} from '@blueprintjs/core'
import { AppContext } from './Context/UserContext';
import {app} from './components/config/base'

const { Provider} = AppContext;

const setUser = (user) => {
  initialState.user = user;
}

const initialState = {
  user: null,
  setUser: setUser
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  handleLogin = () => {
    console.log(this);
    this.context.router.history.push('login');
  };

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        initialState.user = user;
      }
      else {
        initialState.user = null
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    return (
      <Card className="bp3-dark" style={{height: "100vh"}}>
        <Provider value={initialState}>
          <Header handleLogin={() => this.handleLogin()} />
          <Main />
        </Provider>
      </Card>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object,
};

export default App;
