import * as React from 'react';
import {
  Button,
  InputGroup,
  FormGroup,
  MenuItem,
  Dialog,
  Classes,
} from '@blueprintjs/core';

import { Select } from '@blueprintjs/select';


export interface AddPlatProps {
  isOpen : boolean,
  handleClose() : void
}

export interface AddPlatState {}
const categories = [
  { nom: 'Viandes', index: 0 },
  { nom: 'Féculents', index: 1 },
  { nom: 'Légumes', index: 2 },
  { nom: 'Desserts', index: 3 },
];
class AddPlat extends React.Component<AddPlatProps, AddPlatState> {
  constructor(props : any){
    super(props);
  }
  state = {
    isOpen: false,
    categorie: '',
    plat: {
      Nom: '',
      Image: '',
      Categorie: '',
    },
  };

  componentWillUpdate(nextProps: any, nextState: any) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({
        isOpen: nextProps.isOpen,
      });
    }
  }

  handleNomChange = (event:any) => {
    this.setState({
      plat: {
        Nom: event.target.value,
      },
    });
  };

  handleCategorieChange = (event:any) => {
    this.setState({
      plat: {
        Categorie: event.target.value,
      },
    });
  };

  itemRenderer(item: any, handleClick : any) {
    return (
      <MenuItem
        key={item.index}
        text={item.nom}
        onClick={handleClick}
        shouldDismissPopover={true}
      />
    )
  }

  handleclick = (item:any) => {
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
