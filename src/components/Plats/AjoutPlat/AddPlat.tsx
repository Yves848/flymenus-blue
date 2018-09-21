import * as React from 'react';
import {
  Button,
  InputGroup,
  FormGroup,
  MenuItem,
  Dialog,
  Classes,
  Spinner,
} from '@blueprintjs/core';

import { Select } from '@blueprintjs/select';
import axios from 'axios';
//import ImageGrid from '../../Display/ImageGrid';

import feculentsImg from '../../../assets/images/32x32/feculents.png';
import fruitsImg from '../../../assets/images/32x32/fruits.png';
import fromageImg from '../../../assets/images/32x32/fromage.png';
import dessertImg from '../../../assets/images/32x32/dessert.png';
import * as viandeImg from '../../../assets/images/32x32/viande.png';
import * as volailleImg from '../../../assets/images/32x32/poulet.png';
import noImage from '../../../assets/images/No-image-available.jpg';

import legumesImg from '../../../assets/images/32x32/legumes.png';

export interface AddPlatProps {
  isOpen: boolean;
  handleClose(): void;
}

export interface AddPlatState {}
const categories = [
  { nom: 'Viande', index: 0, img: viandeImg },
  { nom: 'Féculent', index: 1, img: feculentsImg },
  { nom: 'Légume', index: 2, img: legumesImg },
  { nom: 'Dessert', index: 3, img: dessertImg },
  { nom: 'Fruit', index: 4, img: fruitsImg },
  { nom: 'Volaille', index: 5, img: volailleImg },
  { nom: 'Fromage', index: 6, img: fromageImg },
];

let si: any;
class AddPlat extends React.Component<AddPlatProps, AddPlatState> {
  constructor(props: any) {
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
    images: [noImage],
    loading: false,
    imgIndex: 0
  };

  componentWillUpdate(nextProps: any, nextState: any) {
    if (nextProps.isOpen !== this.props.isOpen) {
      console.log('willUpdate', nextProps.isOpen);
      this.setState({
        isOpen: nextProps.isOpen,
        categorie: '',
        plat: {
          Nom: '',
          Image: '',
          Categorie: '',
        },
        images: [noImage],
        imgIndex: 0
      });
    }
  }

  handleNomChange = (event: any) => {
    clearTimeout(si);
    const nom = event.target.value;
    this.setState({
      plat: {
        Nom: nom,
      },
    });
    si = setTimeout(() => {
      this.searchImage(nom.toString(), 0)
        .then(images => {
          //console.log('SearchImages',images);
          this.setState({
            images: images,
            loading: false,
          });
        })
        .catch(error => {
          console.error(error);
        });
    }, 800);
  };

  handleCategorieChange = (event: any) => {
    this.setState({
      plat: {
        Categorie: event.target.value,
      },
    });
  };

  searchImage = (key: string, page: number) => {
    return new Promise((resolve, reject) => {
      var CSE_API_KEY = '007439388879951561867:3ragl0fkhpm';
      var CSE_ID = 'AIzaSyDYvQx76ZvFawwKOaDeGqRClb2RJlIcsXM';

      var parameters = '?q=' + encodeURIComponent(key);
      parameters += '&cx=' + CSE_API_KEY;
      parameters += '&imgSize=large';
      parameters += '&searchType=image';
      parameters += '&key=' + CSE_ID;
      parameters += '&lr=lang_fr';
      parameters += '&start=1';

      var path = 'https://www.googleapis.com/customsearch/v1' + parameters;
      this.setState({
        loading: true,
      });
      var images: Array<any> = [];
      axios
        .get(path)
        .then(response => {
          var result: Array<any> = response.data.items;
          if (result) {
            result.forEach(image => {
              images.push({
                url: image.link as string,
                width: image.image.width as number,
                height: image.image.height as number,
              });
            });
          } else {
            images.push(noImage);
          }
          resolve(images);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  itemRenderer = (item: any, { handleClick }: any) => {
    return (
      <div key={item.index} className="row" style={{ marginLeft: '5px' }}>
        <div className="col">
          <img src={item.img} style={{ width: '24px', height: '24px' }} alt="image" />
        </div>
        <div className="col">
          <MenuItem text={item.nom} onClick={handleClick} shouldDismissPopover={true} />
        </div>
      </div>
    );
  };

  handleclick = (item: any) => {
    //this never runs :(
    console.log('clicked', item);
    this.setState({
      categorie: item.nom,
    });
  };

  changeImage = (direction:number) => {
    let imgIndex = this.state.imgIndex;
    if (direction === 0) {
      imgIndex = ((imgIndex-1) < 0 ? this.state.images.length-1 : imgIndex-1 )
      
    } else {
      imgIndex = ((imgIndex+1) > this.state.images.length-1 ? 0 : imgIndex+1 )
    }
    this.setState({
      imgIndex: imgIndex
    })
  }

  render() {
    const { isOpen, plat, loading, imgIndex, images } = this.state;
    const { categorie } = this.state;

    const imgLength = images.length;
    let footer = null;
    if (imgLength > 1) {
      footer = (
        <div>
          <Button icon="arrow-left" onClick={() => {this.changeImage(0)}}></Button>
          <Button icon="arrow-right" onClick={() => {this.changeImage(1)}}></Button>
        </div>
      )
    }
    const image = this.state.images[imgIndex].url
      ? this.state.images[imgIndex].url
      : this.state.images[imgIndex];
    


    if (isOpen) {
      //console.log('addplats',this.state.images)
    }
    return (
      <Dialog
        isOpen={isOpen}
        onClose={this.props.handleClose}
        title="Ajout d'un plat"
        canOutsideClickClose={false}
        style={{ maxWidth: '80%', width: '640px' }}
      >
        <div className={Classes.DIALOG_BODY}>
          <div className="row">
            <div className="col-sm-6 col-lg-4">
              {loading ? (
                <div className="bp3-card bp3-elevation-4"
                  style={{
                    textAlign: 'center',
                    height: "150px"
                  }}
                >
                  <h3>Recherche</h3>
                  <Spinner size={65} />
                </div>
              ) : (
                <div className="bp3-card bp3-elevation-4" style={{
                  textAlign: 'center',
                  height: "150px"
                }}>
                  <img src={image} alt="" style={{ width: '100%', maxHeight: "115px", height: "115px" }} />
                  {footer}
                </div>
                
              )}
            </div>
            <div className="col-sm-6 col-lg-8">
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
                  <Button
                    text={categorie ? categorie : 'Choisir une catégorie'}
                    rightIcon="caret-down"
                  />
                </Select>
              </FormGroup>
            </div>
          </div>
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
