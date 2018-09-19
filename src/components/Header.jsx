import React, { Component } from 'react';
import Aux from '../hoc/_Aux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import menu from '../assets/images/menu.png';
import plat from '../assets/images/dish.png';
import menus from '../assets/images/Menus.png';
import programme from '../assets/images/Programme.png';
import { AppContext } from '../Context/UserContext';
import 'flexboxgrid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


import { app } from './config/base';

const { Consumer } = AppContext;

const btnPlat = (
  <div className="row middle-sm" style={{ width: 'auto' }}>
    <div className="col-sm-4">
      <img style={{ height: '24px' }} src={plat} />
    </div>
    <div className="col-sm-8">Plats</div>
  </div>
);
const btnMenus = (
  <div className="row middle-sm" style={{ width: 'auto' }}>
    <div className="col-sm-4">
      <img style={{ height: '24px' }} src={menus} />
    </div>
    <div className="col-sm-8">Menus</div>
  </div>
);
const btnProgrammes = (
  <div className="row middle-sm" style={{ width: 'auto' }}>
    <div className="col-sm-4">
      <img style={{ height: '24px' }} src={programme} />
    </div>
    <div className="col-sm-8">Programmes</div>
  </div>
);

class Header extends Component {
  constructor(props) {
    super(props);
  }

  redirect = path => {
    this.context.router.history.push(path);
  };

  logout = () => {
    app.auth().signOut();
  };

  render() {
    const { user } = this.props;

    return (
      <Aux>
        <Consumer>
          {context => {
            //console.log(context);
            /* const btnLog = context.user ? (
              <Button className={Classes.MINIMAL} onClick={() => this.redirect('logout')}>
                <div className="row middle-sm" style={{ width: 'auto' }}>
                  <div className="col-sm-4">
                    <img style={{ height: '24px' }} src={programme} />
                  </div>
                  <div className="col-sm-8">Logout</div>
                </div>
              </Button>
            ) : (
              <Button className={Classes.MINIMAL} onClick={() => this.redirect('login')}>
                <div className="row middle-sm" style={{ width: 'auto' }}>
                  <div className="col-sm-4">
                    <img style={{ height: '24px' }} src={programme} />
                  </div>
                  <div className="col-sm-8">Connexion</div>
                </div>
              </Button>
            ); */
            return (
              <AppBar>
                <Toolbar>
                  <IconButton
                    style={{marginLeft: "-12",
                      marginRight: "20"}}
                    color="inherit"
                    aria-label="Menu"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="title" color="inherit" style={{flexGrow: '1'}}>
                    News
                  </Typography>
                  <Button color="inherit">Login</Button>
                </Toolbar>
              </AppBar>
            );
            /* 
              <Navbar>
                {context.user ? (
                <NavbarGroup align={Alignment.LEFT}>
                  <NavbarHeading>FlyMenus</NavbarHeading>
                  <NavbarDivider />
                  
                  <Button
                    className={Classes.MINIMAL}
                    onClick={() => this.redirect('programmes')}
                  >
                    {btnProgrammes}
                  </Button>
                  <Button
                    className={Classes.MINIMAL}
                    onClick={() => this.redirect('menus')}
                  >
                    {btnMenus}
                  </Button>
                  <Button
                    className={Classes.MINIMAL}
                    onClick={() => this.redirect('plats')}
                  >
                    {btnPlat}
                  </Button>
                  
                </NavbarGroup>)
                :
                <NavbarGroup align={Alignment.LEFT}>
                  <NavbarHeading>FlyMenus</NavbarHeading>
                  </NavbarGroup>
              }
                <NavbarGroup align={Alignment.RIGHT}>
                  
                    {btnLog}
                  
                </NavbarGroup>
              </Navbar>
            ); */
          }}
        </Consumer>
      </Aux>
    );
  }
}

Header.contextTypes = {
  router: PropTypes.object,
};

export default Header;
