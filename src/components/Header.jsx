import React, { Component } from 'react';
import Aux from '../hoc/_Aux';
import { Link } from 'react-router-dom';
import {UserContext} from '../Context/UserContext'
import PropTypes from 'prop-types';
import menu from '../assets/images/menu.png';
import plat from '../assets/images/dish.png';
import menus from '../assets/images/Menus.png';
import programme from '../assets/images/Programme.png';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import '../primeflex.css';

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
  <div className="p-grig" style={{ width: '100px' }}>
    <div className="p-col ">
      <img style={{ height: '24px' }} src={programme} />
    </div>
    <div className="p-col">Programmes</div>
  </div>
);

class Header extends Component {
  constructor(props) {
    super(props);
  }

  redirect = path => {
    this.context.router.history.push(path);
  };

  render() {
    const { user } = this.props;

    return (
      <Aux>
        <UserContext.Consumer>
        <Toolbar>
          <div className="p-toolbar-group-left">
            <span style={{ marginRight: '.25em' }}>FlyMenus</span>
            <i
              className="pi pi-bars p-toolbar-separator"
              style={{ marginRight: '.25em' }}
            />
            <Button
              className="p-button-raised p-button-secondary"
              label="Programmes"
              style={{ marginRight: '.25em' }}
              onClick={() => this.redirect('programmes')}
            />
            <Button
              className="p-button-raised p-button-secondary"
              label="Menus"
              style={{ marginRight: '.25em' }}
              onClick={() => this.redirect('menus')}
            />
            <Button
              className="p-button-raised p-button-secondary"
              label="Plats"
              style={{ marginRight: '.25em' }}
              onClick={() => this.redirect('plats')}
            />
          </div>
          <div className="p-toolbar-group-right">
            {user ? (
              <Button label="Logout" icon="pi pi-power-off" style={{ marginLeft: 4 }} />
            ) : (
              <Button
                label="Connexion"
                icon="pi pi-power-off"
                style={{ marginLeft: 4 }}
                onClick={this.props.handleLogin}
              />
            )}
          </div>
        </Toolbar>
        </UserContext.Consumer>
      </Aux>
      
    );
  }
}

Header.contextTypes = {
  router: PropTypes.object,
};

export default Header;
