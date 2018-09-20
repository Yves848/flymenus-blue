import * as React from "react";
import {
  Button,
  InputGroup,
  FormGroup,
  MenuItem,
  Dialog,
  Classes
} from "@blueprintjs/core";

import { Select } from "@blueprintjs/select";
import axios from "axios";
import ImageGrid from '../../Display/ImageGrid';

export interface AddPlatProps {
  isOpen: boolean;
  handleClose(): void;
}

export interface AddPlatState {}
const categories = [
  { nom: "Viandes", index: 0 },
  { nom: "Féculents", index: 1 },
  { nom: "Légumes", index: 2 },
  { nom: "Desserts", index: 3 }
];
class AddPlat extends React.Component<AddPlatProps, AddPlatState> {
  constructor(props: any) {
    super(props);
  }
  state = {
    isOpen: false,
    categorie: "",
    plat: {
      Nom: "",
      Image: "",
      Categorie: ""
    },
    images: []
  };

  componentWillUpdate(nextProps: any, nextState: any) {
    if (nextProps.isOpen !== this.props.isOpen) {
      console.log('willUpdate',nextProps.isOpen)
      if (nextProps.isOpen) {
        this.searchImage("gsxr 1100", 0)
          .then(images => {
            console.log('SearchImages',images);
            this.setState({
              images: images
            })
          })
          .catch(error => {
            console.error(error);
          });
      }
      
        this.setState({
          isOpen: nextProps.isOpen
        })
      
      
    }
  }

  handleNomChange = (event: any) => {
    this.setState({
      plat: {
        Nom: event.target.value
      }
    });
  };

  handleCategorieChange = (event: any) => {
    this.setState({
      plat: {
        Categorie: event.target.value
      }
    });
  };

  searchImage = (key: string, page: number) => {
    return new Promise((resolve, reject) => {
      var CSE_API_KEY = "007439388879951561867:3ragl0fkhpm";
      var CSE_ID = "AIzaSyDYvQx76ZvFawwKOaDeGqRClb2RJlIcsXM";

      var parameters = "?q=" + encodeURIComponent(key);
      parameters += "&cx=" + CSE_API_KEY;
      parameters += "&imgSize=large";
      parameters += "&searchType=image";
      parameters += "&key=" + CSE_ID;
      parameters += "&lr=lang_fr";
      parameters += "&start=1";

      var path = "https://www.googleapis.com/customsearch/v1" + parameters;
      console.log('search')
      var images: Array<any> = [];      
      axios
        .get(path)
        .then(response => {
          var result: Array<any> = response.data.items;
          result.forEach(image => {
            images.push({
              url: image.link as string,
              width: image.image.width as number,
              height: image.image.height as number
            });
          });
          resolve(images);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  itemRenderer(item: any, handleClick: any) {
    return (
      <MenuItem
        key={item.index}
        text={item.nom}
        onClick={handleClick}
        shouldDismissPopover={true}
      />
    );
  }

  handleclick = (item: any) => {
    //this never runs :(
    console.log("clicked", item);
    this.setState({
      categorie: item.nom
    });
  };

  render() {
    const { isOpen, plat } = this.state;
    const { categorie } = this.state;
    if (isOpen) {
      console.log('addplats',this.state.images)
    }
    return (
      <Dialog
        isOpen={isOpen}
        onClose={this.props.handleClose}
        title="Ajout d'un plat"
        canOutsideClickClose={false}
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup
            label="Nom du plat"
            labelFor="Nom"
            labelInfo="(obligatoire)"
          >
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
              <Button
                text={categorie ? categorie : "Choisir une catégorie"}
                rightIcon="caret-down"
              />
            </Select>
          </FormGroup>
          
        </div>
        <ImageGrid images={this.state.images}></ImageGrid>
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
