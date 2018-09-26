import * as React from "react";
import { Component } from "react";

import {
  Button,
  Alignment,
  H3,
  Callout,
  Intent,
  Card
} from "@blueprintjs/core";
import Aux from "../../hoc/_Aux";
import { app, base } from "../config/base";
import * as moment from "moment";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import "moment/locale/fr";
import { ROUND, ELEVATION_3 } from "@blueprintjs/core/lib/esm/common/classes";

const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre"
];
const WEEKDAYS_LONG = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi"
];
const WEEKDAYS_SHORT = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];

class Programmes extends Component {
  ProgrammesRef = null;
  state = {
    id: 0,
    userName: "",
    Programmes: [],
    Plats: [],
    date: moment(),
    jour: undefined,
    matin: [],
    midi: [],
    gouter: [],
    soir: []
  };

  componentWillMount() {
    const user = app.auth().currentUser;

    this.setState({
      userId: user.uid,
      userName: user.displayName,
      jour: new Date()
    });
  }

  addProgramme = (programme, Heure) => {
    const Programmes = [...this.state.Programmes];
    const jour = moment(this.state.jour).format("YYYYMMDD");

    let ref = base
      .push(this.state.userId + "/Programmes/" + jour + "/" + Heure, {
        data: programme
      })
      .then(newLocation => {
        let generatedKey = newLocation.key;
        this.renderMenus(jour, "Matin");
        this.renderMenus(jour, "Midi");
        this.renderMenus(jour, "Goûter");
        this.renderMenus(jour, "Soir");
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleDayClick = day => {
    this.setState({ jour: day });
    const user = app.auth().currentUser;
    console.log(day);
    const jour = moment(day).format("YYYYMMDD");
    console.log(jour);
    this.renderMenus(jour, "Matin");
    this.renderMenus(jour, "Midi");
    this.renderMenus(jour, "Goûter");
    this.renderMenus(jour, "Soir");
  };

  ajout = Heure => {
    this.addProgramme(
      {
        Nom: "Test",
        Remarque: "",
        Plats: [0, 3, 4]
      },
      Heure
    );
  };

  renderMenus = (Jour, Heure) => {
    base
      .fetch(this.state.userId + "/Programmes/" + Jour + "/" + Heure, {
        context: this,
        asArray: true
      })
      .then(data => {
        console.log(data);
        const menu = data.map((programme, i) => {
          return <div key={i}>{programme.Nom}</div>;
        });
        switch (Heure) {
          case "Matin": {
            this.setState({
              matin: menu
            });
            break;
          }
          case "Midi": {
            this.setState({
              midi: menu
            });
            break;
          }
          case "Goûter": {
            this.setState({
              gouter: menu
            });
            break;
          }
          case "Soir": {
            this.setState({
              soir: menu
            });
            break;
          }
          default:
            break;
        }
      })
      .catch(error => {
        //handle error
      });
  };

  render() {
    const { jour } = this.state;
    const { Programmes } = this.state;
    let sjour;
    if (jour) {
      sjour = jour.toLocaleDateString();
    } else {
      sjour = "";
    }

    return (
      <Aux>
        <h5>
          <a href="#">Programmes de {this.state.userName} </a>
        </h5>
        <div className="row">
          <div className="col-sm-3 col-lg-3">
            <DayPicker
              locale="fr"
              onDayClick={this.handleDayClick}
              selectedDays={this.state.jour}
              months={MONTHS}
              weekdaysLong={WEEKDAYS_LONG}
              weekdaysShort={WEEKDAYS_SHORT}
              firstDayOfWeek={1}
            />
          </div>
          <div className="col-sm-9 col-lg-9">
            <H3>Menus du {sjour}</H3>

            <Card elevation={ELEVATION_3}>
              <h5>Matin</h5>
              {this.state.matin}
              <Button onClick={() => this.ajout("Matin")} className="bp3-fill">
                Ajouter
              </Button>
            </Card>
            <Card
              elevation={ELEVATION_3}
              intent={Intent.SUCCESS}
              icon={null}
              title="Midi"
            >
            <h5>Midi</h5>
            {this.state.midi}
              <Button onClick={() => this.ajout("Midi")} className="bp3-fill">
                Ajouter
              </Button>
            </Card>
            <Card
              elevation={ELEVATION_3}
              intent={Intent.WARNING}
              icon={null}
              title="Goûter"
            >
            <h5>Goûter</h5>
            {this.state.gouter}
              <Button onClick={() => this.ajout("Goûter")} className="bp3-fill">
                Ajouter
              </Button>
            </Card>
            <Card
              elevation={ELEVATION_3}
              intent={Intent.NONE}
              icon={null}
              title="Soir"
            >
            <h5>Soir</h5>
            {this.state.soir}
              <Button onClick={() => this.ajout("Soir")} className="bp3-fill">
                Ajouter
              </Button>
            </Card>
          </div>
        </div>
      </Aux>
    );
  }
}

export default Programmes;
