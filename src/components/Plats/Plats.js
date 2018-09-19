import React, { Component } from 'react';
import { base, app } from '../config/base';
import { AppContext } from '../../Context/UserContext';
import { Card, Classes, Button, Intent, Alignment } from '@blueprintjs/core';
import 'flexboxgrid';

const { Consumer } = AppContext;

const platsListStyles = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'Center',
};

const platCardStyle = {
  maxWidth: '30%',
  minWidth: '250px',
  flex: '1',
  margin: '5px',
};


class Plats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userName: '',
      Plats: [],
    };
  }

  componentWillMount() {
    const user = app.auth().currentUser;

    this.setState({
      userId: user.uid,
      userName: user.displayName,
    });

    /* base.fetch('Plats/-LDLPjLrdRXEVqI_Jf-y', {
      context: this,
      asArray: true
    }).then(data => {
      console.log(data);
      data.forEach(plat => {
        this.addPlats(plat)
        
      });
    }).catch(error => {
      //handle error
    }) */

    this.platsRef = base.syncState(user.uid + '/Plats', {
      context: this,
      state: 'Plats',
    });
  }

  addPlats = plat => {
    const Plats = [...this.state.Plats];
    Plats.push(plat);

    this.setState({
      Plats: Plats,
    });
  };

  render() {
    const { Plats } = this.state;
    //console.log(Plats);

    const cards = Plats.map((plat, i) => {
      return (
        <div
          key={i}
          style={platCardStyle}
          className="bp3-card bp3-elevation-0 bp3-interactive"
        >
          <h5>{plat.Nom}</h5>
          <img
            src={plat.Image}
            style={{ minWidth: '230px', maxWidth: '90%', maxHeight: '180px' }}
            alt=""
          />
        </div>
      );
    });
    return (
      <div>
        <h5>
          <a href="#">Plats de {this.state.userName} </a>
        </h5>
        <div className="row">
          <div className="col-sm-2 col-lg-1" >
            Menu
            <div style={{marginTop: "10px"}}>
              <Button icon="add" fill="true" alignText={Alignment.LEFT}>Ajouter</Button>
            </div>
          </div>
          <div className="col-sm-10 col-lg-11">
            Plats
            <div style={platsListStyles}>
              <div className="row" style={{ maxHeight: '80vh', overflow: 'auto' }}>
                {cards}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Plats;
