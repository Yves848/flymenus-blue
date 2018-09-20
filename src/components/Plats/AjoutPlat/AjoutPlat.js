import React, { Component } from 'react';
import {
  Button,
  H5,
  Icon,
  InputGroup,
  FormGroup,
  Intent,
  MenuItem,
  Dialog,
  Classes,
} from '@blueprintjs/core';

import { Select } from '@blueprintjs/select';

const categories = [
  { nom: 'Viandes', index: 0 },
  { nom: 'Féculents', index: 1 },
  { nom: 'Légumes', index: 2 },
  { nom: 'Desserts', index: 3 },
];
class AddPlat extends Component {
  state = {
    isOpen: false,
    categorie: '',
    plat: {
      Nom: '',
      Image: '',
      Categorie: '',
    },
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({
        isOpen: nextProps.isOpen,
      });
    }
  }

  handleNomChange = event => {
    this.setState({
      plat: {
        Nom: event.target.value,
      },
    });
  };

  handleCategorieChange = event => {
    this.setState({
      plat: {
        Categorie: event.target.value,
      },
    });
  };

  handleCategorieClick = () => {};

  renderCategorie = (categorie, { handleCategorieClick }) => {
    return (
      <MenuItem
        label={categorie.nom.toString()}
        key={categorie.index}
        onClick={handleCategorieClick}
        text={categorie.nom}
      />
    );
  };

  itemRenderer(item, {handleClick}) {
    return (
      <MenuItem
        key={item.index}
        text={item.nom}
        onClick={handleClick}
        shouldDismissPopover={true}
      />
    )
  }

  handleclick = (item) => {
    //this never runs :(
    console.log('clicked', item)
    this.setState({
      categorie: item.nom
    })
  }
  render() {
    const { isOpen, plat } = this.state;
    const {categorie} = this.state;
    return (
      <Dialog
        isOpen={isOpen}
        onClose={this.props.handleClose}
        title="Ajout d'un plat"
        canOutsideClickClose={false}
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup label="Nom du plat" labelFor="Nom" labelInfo="(obligatoire)">
            <InputGroup
              id="Nom"
              onChange={this.handleNomChange}
              placeholder=""
              value={plat.Nom}
              //round
            />
          </FormGroup>
          <FormGroup label="Catégorie" labelFor="Categorie" labelInfo="">
            
            <Select
            items={categories}
            filterable={false}
            itemRenderer={this.itemRenderer}
            onItemSelect={this.handleclick}
          >
          
            <Button text={categorie ? categorie : 'Choisir une catégorie'} rightIcon="caret-down" />
          </Select>
          </FormGroup>
          
          
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <Button className={Classes.INTENT_SUCCESS}>Enregistrer</Button>
          <Button className={Classes.INTENT_WARNING} style={{ margin: '10px' }}>
            Annuler
          </Button>
        </div>
      </Dialog>
    );
  }
}

export default AddPlat;
