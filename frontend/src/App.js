import React, { Component } from "react";
import "./App.css";

import {BrowserRouter, Route} from 'react-router-dom';
import Answer from "./components/Answer";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <div className="App">
          <Route exact path="/" 
            component = {Answer}
          />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
