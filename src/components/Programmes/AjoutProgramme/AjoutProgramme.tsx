import * as React from 'react';
import { Dialog, Classes, MenuItem } from '@blueprintjs/core';
import { Suggest, ItemRenderer, ItemPredicate } from '@blueprintjs/select';
import Plats from '../../Plats/Plats';

export interface IPlat {
  Nom: string;
  Image: string;
  Categorie: string;
  ImageSearch: string;
  Rating: number;
  Key: number;
}

export interface AjoutProgrammeProps {
  controleAjout: any;
  plats: Array<IPlat>;
  handleClose(): void;
  handleAjout(programme: any, index: number): void;
}

export interface AjoutProgrammeState {
  isOpen: boolean;
  Plats: Array<IPlat>;
  plat: string;
  activePlat: IPlat;
}


const PlatSuggest = Suggest.ofType<IPlat>();

const filterFilm: ItemPredicate<IPlat> = (query, plat) => {
  const text = `${plat.Key}. ${plat.Nom}`;
  return text.toLocaleLowerCase().indexOf(query.toLowerCase()) >= 0;
};

/* itemListPredicate={(query, items) => {
  return items.filter((item) => `${item[0].toLowerCase()} ${item[1].toLowerCase()}`.indexOf(query.toLowerCase()) >= 0).slice(0, 10)
}} */

/* const filterFilms: ItemListPredicate<IPlat> = (query, items) =>{
  console.log(items,query)
  const result = items.filter(item => {
    const text = `${item.Nom}`;
    return text.toLocaleLowerCase().indexOf(query.toLowerCase()) >= 0;
  })
  return result.slice(0,10)
}
 */
const renderPlat: ItemRenderer<IPlat> = (Plat, { handleClick, modifiers }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const text = `${Plat.Key}. ${Plat.Nom}`;
  return (
    <MenuItem
      key={Plat.Key}
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={Plat.Categorie}
      onClick={handleClick}
      text={text}
    />
  );
};
class AjoutProgramme extends React.Component<AjoutProgrammeProps, AjoutProgrammeState> {
  public activeItem: IPlat;

  constructor(props: AjoutProgrammeProps) {
    super(props);

    const plats: IPlat[] = [];
    this.props.plats.forEach((plat, i) => {
      let p: IPlat = { ...plat, Key: i + 1 };
      plats.push(p);
    });

    this.state = {
      isOpen: false,
      Plats: plats,
      plat: '',
      activePlat: Plats[0],
    };
  }
  componentWillUpdate(nextProps: AjoutProgrammeProps) {
    if (nextProps.controleAjout.isOpen !== this.props.controleAjout.isOpen) {
      const plats: IPlat[] = [];
      this.props.plats.forEach((plat, i) => {
        let p: IPlat = { ...plat, Key: i + 1 };
        plats.push(p);
      });

      //console.log(plats)
      this.setState({
        isOpen: nextProps.controleAjout.isOpen,
        Plats: plats,
      });
    }
  }

  handleClick = (item: IPlat) => {
    this.setState({
      plat: item.Nom,
    });
  };

  renderValue = (item: IPlat) => item.Nom;

  handleActiveItemChange = (item: IPlat) => {
    console.log(item);
    this.setState({
      activePlat: item,
    });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <Dialog
        isOpen={isOpen}
        onClose={this.props.handleClose}
        title={"Ajout d'un programme"}
        canOutsideClickClose={false}
        style={{ maxWidth: '80%', width: '640px' }}
      >
        <div className={Classes.DIALOG_BODY}>
          <div className="row">
            <div className="col">
              <PlatSuggest
                items={this.state.Plats}
                activeItem={this.state.activePlat}
                onActiveItemChange={this.handleActiveItemChange}
                itemRenderer={renderPlat}
                itemPredicate={filterFilm}
                onItemSelect={this.handleClick}
                noResults={<MenuItem disabled={true} text="Pas de résultat." />}
                inputValueRenderer={this.renderValue}
                popoverProps={{ minimal: true, usePortal: true }}
              />
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default AjoutProgramme;
