import React, { Component } from "react";
import { base, app } from "../config/base";
import { AppContext } from "../../Context/UserContext";
import PropTypes from 'prop-types';
import AddPlat from './AjoutPlat/AddPlat'
import { Link } from 'react-router-dom'
import { Card, Classes, Button, Intent, Alignment } from "@blueprintjs/core";
import "flexboxgrid";

const { Consumer } = AppContext;

const platsListStyles = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  justifyContent: "Center"
};

const platCardStyle = {
  maxWidth: "30%",
  minWidth: "250px",
  flex: "1",
  margin: "5px"
};

class Plats extends Component {
  constructor(props) {
    super(props);
    console.log('props',props)
    this.state = {
      userId: "",
      userName: "",
      Plats: [],
      isAjoutPlatOpened: false
    };
  }

  fillDB = () => {
    base
      .fetch("Plats/-LDLPjLrdRXEVqI_Jf-y", {
        context: this,
        asArray: true
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
      userName: user.displayName
    });

    this.platsRef = base.syncState(user.uid + "/Plats", {
      context: this,
      state: "Plats"
    });
  }

  addPlats = plat => {
    const Plats = [...this.state.Plats];
    Plats.push(plat);

    this.setState({
      Plats: Plats
    });
  };

  redirect = path => {
    this.context.router.history.push(path);
  };

  AjouterPlat = () => {
    this.setState({
      isAjoutPlatOpened: true
    });
  };

  handleClose = () => {
    this.setState({
      isAjoutPlatOpened: false
    });
  };

  render() {
    const { Plats } = this.state;
    //console.log('render',Plats);
    let cards = null;
    if (Plats && Plats.length > 0) {
      cards = Plats.map((plat, i) => {
        return (
          <div
            key={i}
            style={platCardStyle}
            className="bp3-card bp3-elevation-0 bp3-interactive"
          >
            <h5>{plat.Nom}</h5>
            <img
              src={plat.Image}
              style={{ minWidth: "230px", maxWidth: "90%", maxHeight: "180px" }}
              alt=""
            />
          </div>
        );
      });
    } else {
      cards = null
    }

    return (
      <div>
        <AddPlat
          isOpen={this.state.isAjoutPlatOpened}
          handleClose={() => this.handleClose()}
        />
        <h5>
          <a href="#">Plats de {this.state.userId} </a>
        </h5>
        <div className="row">
          <div className="col-sm-2 col-lg-1">
            <div style={{ marginTop: "10px" }}>
              
                <Button
                  icon="add"
                  fill="true"
                  alignText={Alignment.LEFT}
                  onClick={() => this.fillDB()}
                  style={{marginBottom: "10px"}}
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
              <div
                className="row"
                style={{ maxHeight: "80vh", overflow: "auto" }}
              >
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
