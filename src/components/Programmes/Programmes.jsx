import * as React from "react";
import { Component } from "react";

import { Button, Alignment } from "@blueprintjs/core";
import Aux from "../../hoc/_Aux";
import { app, base } from "../config/base";
import * as moment from "moment";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import "moment/locale/fr";

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
    date: moment(),
    jour: undefined
  };

  componentWillMount() {
    const user = app.auth().currentUser;

    this.setState({
      userId: user.uid,
      userName: user.displayName
    });

    this.ProgrammesRef = base.syncState(user.uid + "/Programmes", {
      context: this,
      state: "Programmes"
    });

    const Programmes = this.state.Programmes;
    Programmes.push({
      Date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      Nom: "Test",
      Plats: [0, 3, 4]
    });
    this.setState({
      Programmes: Programmes
    });
  }

  handleDayClick = (day) => {
    this.setState({ jour: day });
  }

  render() {
    return (
      <Aux>
        <h5>
          <a href="#">Programmes de {this.state.userName} </a>
        </h5>
        <div className="row">
          <div className="col-sm-3 col-lg-2">
            <DayPicker
              locale="fr"
              onDayClick={this.handleDayClick}
              selectedDays={this.state.jour}
              months={MONTHS}
              weekdaysLong={WEEKDAYS_LONG}
              weekdaysShort={WEEKDAYS_SHORT}
              firstDayOfWeek={1}
            />
            <div style={{ marginTop: "10px" }}>
              <Button icon="add" fill alignText={Alignment.LEFT}>
                Ajouter
              </Button>
            </div>
          </div>
          <div className="col-sm-9 col-lg-10" />
        </div>
      </Aux>
    );
  }
}

export default Programmes;
