import * as React from 'react';
import { Component } from 'react';

import {Button, Alignment} from '@blueprintjs/core'
import { DatePicker } from "@blueprintjs/datetime";
import Aux from '../../hoc/_Aux'
import {app,base} from '../config/base'
import * as moment from 'moment'
import 'react-day-picker/lib/style.css';


export interface ProgrammesProps {
  
}
 
export interface ProgrammesState {
  
}
 
class Programmes extends Component<ProgrammesProps, ProgrammesState> {
  ProgrammesRef=null;
  state = { 
    id: 0,
    userName:'',
    Programmes: Array<any>([]),
    date: moment()
    }
    
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
        Date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        Nom: 'Test',
        Plats: [0,3,4]
      })
      this.setState({
        Programmes:Programmes
      })
    }
  render() { 
    return (  
      <Aux>
      <h5>
          <a href="#">Programmes de {this.state.userName} </a>
        </h5>
        <div className="row">
          <div className="col-sm-3 col-lg-2">
          <DatePicker locale="fr"></DatePicker>
            <div style={{ marginTop: "10px" }}>
              <Button
                icon="add"
                fill
                alignText={Alignment.LEFT}
                
              >
                Ajouter
              </Button>
            </div>
          </div>
          <div className="col-sm-9 col-lg-10">
          
          </div>
        </div>
      
      </Aux>
    );
  }
}
 
export default Programmes;