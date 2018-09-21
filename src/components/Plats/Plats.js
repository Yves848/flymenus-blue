import React, { Component } from 'react';
import { base, app } from '../config/base';
import { AppContext } from '../../Context/UserContext';
import PropTypes from 'prop-types';
import AddPlat from './AjoutPlat/AddPlat';
import { Link } from 'react-router-dom';
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
    console.log('props', props);
    this.state = {
      userId: '',
      userName: '',
      Plats: [],
      isAjoutPlatOpened: false,
      Mode: 0
    };
  }

  fillDB = () => {
    base
      .fetch('Plats/-LDLPjLrdRXEVqI_Jf-y', {
        context: this,
        asArray: true,
      })
      .then(data => {
        console.log(data);
        data.forEach(plat => {
          this.addPlats(plat);
        });
      })
      .catch(error => {
        //handle error
      });
  };

  componentWillMount() {
    const user = app.auth().currentUser;

    this.setState({
      userId: user.uid,
      userName: user.displayName,
    });

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

  redirect = path => {
    this.context.router.history.push(path);
  };

  AjouterPlat = () => {
    this.setState({
      isAjoutPlatOpened: true,
    });
  };

  handleClose = () => {
    console.log('close');
    this.setState({
      isAjoutPlatOpened: false,
    });
  };

  handleAjout = plat => {
    console.log(plat);
    this.addPlats({
      Nom: plat.Nom,
      Image: plat.Image.url,
      Categorie: plat.Categorie,
      ImageSearch: plat.Nom,
      Rating: 0,
    });
    this.handleClose();
  };

  handleDelete = (i) => {
    const Plats = this.state.Plats.filter((plat,index) => {
      return (i !== index);
    })

    console.log(Plats)
    this.setState({
      Plats: Plats
    })
  }

  handleEdit = (plat,i) => {
    console.log(plat)
    this.setState({
      currentPlat: plat,
      Mode: 1,
      isAjoutPlatOpened: true
    })
  }

  render() {
    const { Plats } = this.state;

    let cards = null;
    if (Plats && Plats.length > 0) {
      cards = Plats.map((plat, i) => {
        //console.log('render',plat);
        return (
          <div
            key={i}
            style={platCardStyle}
            className="bp3-card bp3-elevation-0  bp3-interactive"
          >
          <div></div>
            <h5>{plat.Nom}</h5>
            <div className="col">
              <div className="row">
                <img
                  className="bp3-elevation-4"
                  src={plat.Image}
                  style={{ minWidth: '230px', maxWidth: '90%', maxHeight: '180px' }}
                  alt=""
                />
              </div>
            </div>
            <div className="row around-sm around-lg" style={{marginTop:"5px", padding: "5px"}}>
              <div className="col">
                <Button icon="edit" intent={Intent.PRIMARY} onClick={() => this.handleEdit(plat,i)}></Button>
              </div>
              <div className="col">
                <Button icon="delete" intent={Intent.DANGER} onClick={() => this.handleDelete(i)}></Button>
              </div>
            </div>
          </div>
        );
      });
    } else {
      cards = null;
    }

    return (
      <div>
        <AddPlat
          isOpen={this.state.isAjoutPlatOpened}
          handleClose={() => this.handleClose()}
          handleAjout={this.handleAjout}
          Plat={this.state.currentPlat}
          Mode={this.state.Mode}
        />
        <h5>
          <a href="#">Plats de {this.state.userName} </a>
        </h5>
        <div className="row">
          <div className="col-sm-2 col-lg-1">
            <div style={{ marginTop: '10px' }}>
              <Button
                icon="import"
                fill="true"
                alignText={Alignment.LEFT}
                onClick={() => this.fillDB()}
                style={{ marginBottom: '10px' }}
              >
                Importer
              </Button>

              <Button
                icon="add"
                fill="true"
                alignText={Alignment.LEFT}
                onClick={() => this.AjouterPlat()}
              >
                Ajouter
              </Button>
            </div>
          </div>
          <div className="col-sm-10 col-lg-11">
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

Plats.contextTypes = {
  router: PropTypes.object,
};

export default Plats;
