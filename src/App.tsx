/* tslint:disable */
import * as React from 'react';
import './App.css';
import { CountryList } from "./CountryList";
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import logo from './logoBetter.svg';
//import { CountryTile } from './CountryTile';

class App extends React.Component {
  public render() {
    return (
      <Fabric>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Countries of Planet Earth</h1>
            <h6>The planet that I love and am very much native to</h6>
          </header>
          <br />
          <h2>Click on a country to learn more!</h2>
          <br />
          <CountryList url='https://restcountries.eu/rest/v2/all' />
          <br />

        </div>
      </Fabric>
    );
  }
}

export default App;