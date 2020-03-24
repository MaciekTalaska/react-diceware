import React, {Component} from 'react';
import {render} from 'react-dom';
import './style.css';
import DicewareButton from './diceware-button';
import DicewarePasswordRenderer from './diceware-password';
import DicewarePasswordSeparator from './diceware-passwordseparator';
import DicewarePasswordLength from './diceware-passwordlength';
import DicewareLanguage from './diceware-language';

// list of words taken from: https://www.eff.org/files/2016/09/08/eff_short_wordlist_2_0.txt
// for the sake of speed, list of words is included as part of the project
var dicewareListUrl = require('./diceware-en.txt');
const diceCount = 4;

class Dice {
  static rollDices(dices) {
    if (dices < 1) {
      throw new Error('[Dice.rollDices]: at least one dice has to be thrown!');
    }
    let numbers = new Uint32Array(dices);
    window.crypto.getRandomValues(numbers);

    let array = Array.from(numbers);
    return Dice.dicesToKey(array);
  }

  static truncate(n) {
    if (n > 6) {
      return n % 6 + 1;
    } else {
      return n;
    }
  }

  static dicesToKey(numbers) {
    let array = numbers.map(n => Dice.truncate(n));
    if (array.length > diceCount) {
      array.length = 4;
    }
    let key = array.join('');
    return key;
  }
}

class WordsRepository {
  static loadWordsList() {
    return new Promise((resolve, reject) => {
      fetch(dicewareListUrl)
        .then(res => res.text())
        .then(data => {
          let list = Array.from(data.split(/\n/));
          let map = new Map();

          list.forEach(line => {
            let [k, v] = line.split(/\t/);
            map.set(k, v);
          });
          resolve(map);
        });
    });
  }
}

class Diceware extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [],
      list: null,
      password: null,
      separator: "-",
      passwordLength: 6,
    };
    this.generatePassword = this.generatePassword.bind(this);
    this.updatePasswordLength = this.updatePasswordLength.bind(this);
    this.updateSeparator = this.updateSeparator.bind(this);
  }

  componentWillMount() {
    WordsRepository.loadWordsList().then(result => {
      this.setState({list: result});
      this.generatePassword();
    });
  }

  updatePasswordLength(value) {
    this.setState({passwordLength: value})
  }

  updateSeparator(value) {
    this.setState({separator: value})
  }
  
  generatePassword() {
    let words = [];
    for (let i = 0; i < this.state.passwordLength; i++) {
      let key = Dice.rollDices(diceCount);
      let newWord = this.state.list.get(key);
      words.push(newWord);
    }
    let password = words.join(this.state.separator);
    this.setState({password: password});
  }

  render() {
    return (
      <div className="container">
        <DicewareLanguage></DicewareLanguage>
        <DicewarePasswordLength
          passwordLength={this.state.passwordLength}
          updatePasswordLength={this.updatePasswordLength}></DicewarePasswordLength>
        <DicewarePasswordSeparator 
          separator={this.state.separator}
          updateSeparator={this.updateSeparator}
          ></DicewarePasswordSeparator>
        <DicewareButton 
          onNewNumberRequest={this.generatePassword} />
        <DicewarePasswordRenderer
          password={this.state.password} />
      </div>
    );
  }
}

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
        <Diceware />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
