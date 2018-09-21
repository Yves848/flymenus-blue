import React, { Component } from "react";
import { app, base } from "../../components/config/base";
import { Link } from "react-router-dom";
import { EditableText, Dialog, Alert, Intent } from "@blueprintjs/core";

class Utilisateurs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      utilisateur: {
        nom: "",
        id: "",
        mail: "",
        mailConfirmed: false
      }
    };
  }

  componentDidMount() {
    const user = app.auth().currentUser;
    console.log("user", user);
    this.setState({
      utilisateur: {
        id: user.uid,
        nom: user.displayName,
        mail: user.email,
        mailConfirmed: user.emailVerified
      },
      confirmVisible: false,
      oldNom: ""
    });
  }

  handleNameChange = value => {
    const utilisateur = { ...this.state.utilisateur };
    utilisateur.nom = value;
    this.setState({ utilisateur: utilisateur });
  };

  handleNameConfirm = value => {
    console.log(value);
    if (value !== this.state.oldNom) {
      this.toggleConfirm();
    }
  };

  handleAlertClose = (value) => {
    if (value) {
      const user = app.auth().currentUser;
      user.updateProfile({
        displayName: this.state.utilisateur.nom
      })
    } else {
      this.handleNameChange(this.state.oldNom)
    }
    this.toggleConfirm();
  }

  toggleConfirm = () => {
    this.setState({
      confirmVisible: !this.state.confirmVisible
    });
  };

  render() {
    const { utilisateur } = this.state;
    return (
      <div>
        <Alert
          cancelButtonText="Cancel"
          confirmButtonText="Move to Trash"
          icon="trash"
          intent={Intent.DANGER}
          isOpen={this.state.confirmVisible}
          onCancel={() => this.handleAlertClose(false)}
          onConfirm={() => this.handleAlertClose(true)}
        >
          <p>
            Are you sure you want to move <b>filename</b> to Trash? You will be
            able to restore it later, but it will become private to you.
          </p>
        </Alert>
        <h5>
          <a href="#">Utilisateurs</a>
        </h5>
        <p>Gestion des Utilisateurs</p>
        
        <div className="row" style={{ height: "40px" }}>
          <div className="col-lg-2 col-sm-2">Nom</div>
          <div className="col-lg-10 col-sm-10">
            <EditableText
              value={utilisateur.nom}
              onEdit={value => this.setState({ oldNom: value })}
              onChange={value => {
                this.handleNameChange(value);
              }}
              onConfirm={value => this.handleNameConfirm(value)}
            />
          </div>
        </div>
        <div className="row" style={{ height: "40px" }}>
          <div className="col-lg-2 col-sm-2">eMail</div>
          <div className="col-lg-10 col-sm-10">
            <EditableText value={utilisateur.mail} />
          </div>
        </div>

        <div className="row" style={{ height: "40px" }}>
          <div className="col-lg-2 col-sm-2">eMail Confirmé :</div>
          <div className="col-lg-10 col-sm-10">
            <EditableText value={utilisateur.mailConfirmed ? "Oui" : "Non"} disabled />
          </div>
        </div>

        
        <br />
        <Link to="/logout">Logout</Link>
      </div>
    );
  }
}

export default Utilisateurs;
