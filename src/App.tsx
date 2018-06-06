import * as React from 'react';
import './App.css';
import { CountryList } from "./CountryList";

import logo from './logoBetter.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Countries of Planet Earth</h1>
        </header>
        <CountryList url='https://restcountries.eu/rest/v2/all'/>
      </div>
    );
  }
}

export default App;