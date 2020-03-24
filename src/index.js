import React, {Component} from 'react';
import {render} from 'react-dom';
import './style.css';
import DicewarePasswordGenerator from './diceware-main';

// list of words taken from: https://www.eff.org/files/2016/09/08/eff_short_wordlist_2_0.txt
// for the sake of speed, list of words is included as part of the project

class ApplicationName extends Component {
  render() {
    return <h1>Diceware Password Generator (in ReactJS)</h1>;
  }
}

class App extends Component {
  render() {
    return (
      <div className="main">
        <ApplicationName />
        <DicewarePasswordGenerator />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
