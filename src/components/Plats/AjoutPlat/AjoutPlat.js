import React, { Component } from "react";
import {
  Button,
  H5,
  Icon,
  InputGroup,
  FormGroup,
  Intent,
  Dialog,
  Classes
} from "@blueprintjs/core";

class AddPlat extends Component {
  state = {
    isOpen: false,
    plat: {
      Nom: "",
      Image: "",
      Categorie: ""
    }
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({
        isOpen: nextProps.isOpen
      });
    }
  }

  handleNomChange = event => {
    this.setState({
      plat: {
        Nom: event.target.value
      }
    });
  };

  render() {
    const { isOpen, plat } = this.state;
    return (
      <Dialog
        isOpen={isOpen}
        onClose={this.props.handleClose}
        title="Ajout d'un plat"
        canOutsideClickClose={false}
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup
            helperText="Entrez le nom du plat" label="Nom du plat"
            labelFor="Nom" labelInfo="(obligatoire)" >
            <InputGroup
              id="Nom"
              onChange={this.handleNomChange}
              placeholder=""
              value={plat.Nom}
              round
            />
          </FormGroup>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <Button className={Classes.INTENT_SUCCESS}>Enregistrer</Button>
          <Button className={Classes.INTENT_WARNING} style={{ margin: "10px" }}>
            Annuler
          </Button>
        </div>
      </Dialog>
    );
  }
}

export default AddPlat;
