import React, { Component } from 'react';

const AppContext = new React.createContext();
class AppProvider extends Component {
   
    render() { 
        return (<AppContext.AppProvider>
            {this.props.children}
        </AppContext.AppProvider> );
    }
}
 
export default AppProvider;
