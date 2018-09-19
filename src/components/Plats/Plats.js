import React, { Component } from 'react';
import { base, app } from '../config/base';
import { AppContext } from '../../Context/UserContext';
import { Card, Classes } from '@blueprintjs/core';
import 'flexboxgrid';

const { Consumer } = AppContext;

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
        <div className="col-lg-2 col-sm-4 col-xs-6" key={i}>
          <Card><span className="bp3-tag bp3-large bp3-intent-primary" >{plat.Nom}</span>
          <div>
          <img src={plat.Image} style={{height: "150px", width: "150px"}} alt=""/>
          </div>
          </Card>
        </div>
      );
    });
    return (
      <div>
        <h5>
          <a href="#">Plats de {this.state.userName} </a>
        </h5>
        <div className="row">
          <div className="col-sm-2 col-lg-1">Menu</div>
          <div className="col-sm-10 col-lg-11">
          Plats
            <div
              className="box"
              style={{ flexWrap: 'wrap', flexDirection: 'column', overflowY: 'auto' }}
            >
             
              <div className="row" >{cards}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Plats;
