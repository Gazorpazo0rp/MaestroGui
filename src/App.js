import React from 'react';
import { Component } from 'react/cjs/react.development';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './External_styles.scss'
import './App.css';
import Home from './components/Home'
import Core from './components/core'
import Output from './components/Output'
import Navigation_bar from './components/navbar';

class App extends Component {
  activeNavHandler(active){
    var e=document.getElementById(active)
  }

  render(){
  
    return (
      <div className="App">
        
             <Router>
              
              <Switch>
                <Route path="/output">
                  <Navigation_bar></Navigation_bar>
                  <Output></Output>
                </Route>
                <Route path="/core">
                  <Navigation_bar></Navigation_bar>
                  <Core></Core>
                  {this.activeNavHandler()}
                </Route>
                <Route path="/">
                  <Home></Home>
                </Route>
                
              </Switch>
            
            </Router>
          </div>
        
    );
  }
  
}

export default App;
