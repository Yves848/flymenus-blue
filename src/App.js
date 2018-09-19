import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import Header from './components/Header';
import Aux from './hoc/_Aux';
import PropTypes from 'prop-types';
//import { Card, Spinner } from '@blueprintjs/core';
import Paper from '@material-ui/core/Paper';
import { AppContext } from './Context/UserContext';
import { app,base } from './components/config/base';


const { Provider } = AppContext;

const setUser = user => {
  initialState.user = user;
};

const initialState = {
  user: null,
  plats: {},
  menus: {},
  programmes: {},
  loading: false,
  setUser: setUser,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      Plats: []
    }
  }

  

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged(user => {
      if (user) {
        initialState.user = user;
        this.setState({
          loading: false
        })
      } else {
        initialState.user = null;
        this.setState({
          loading: false
        })
        this.context.router.history.push('/');
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.platsRef)
    this.removeAuthListener();
  }

  render() {
    return (
      //<Card className="bp3-dark" style={{ height: '100vh' }}>
      <Paper elevation0>
        
        <Provider value={initialState}>
          <Header/>
          {this.state.loading ? (
            <div
              style={{
                textAlign: 'center',
                position: 'absolute',
                top: '25%',
                left: '50%',
              }}
            >
              <h3>Loading</h3>
              
            </div>
          ) : (
            <Main />
          )}
        </Provider>
        </Paper>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object,
};

export default App;
