import React, {Component} from 'react';
import {render} from 'react-dom';
import './style.css';

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

class DicewareButton extends Component {
  constructor(props) {
    super(props);
    this.forceRefresh = this.forceRefresh.bind(this);
  }

  forceRefresh(e) {
    this.props.onNewNumberRequest(e);
  }

  render() {
    return <div>
      <button onClick={this.forceRefresh}>Generate!</button>
    </div>;
  }
}

class DicewarePassword extends Component {

  render() {
    return <p>{this.props.password}</p>;
  }
}

class DicewarePasswordSeparator extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.updateSeparator(e.target.value);
  }

  render() {
    return <div>
      <label className="column-left"
              htmlFor="separatorInput"
              >separator: </label>
      <input  name="separatorInput" 
              className="column-right"
              value={this.props.separator}
              onChange={this.handleChange}
              ></input>
    </div>
  }
}

class DicewareLanguage extends Component {

  render() {
    return <div>
      <label  htmlFor="languageInput"
              className="column-left"
              >language:</label>
      <select name="languageInput"
              className="column-right">
        <option value="en">English</option>
        <option value="fi">Finnish</option>
        <option value="mi">Maori</option>
        <option value="pl">Polish</option>
      </select>
    </div>    
  }
}

class DicewaPassswordLength extends Component {
  constructor(props) {
    super(props);
    this.handleChange= this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.updatePasswordLength(e.target.value);
  }

  render() {
    return <div>
      <label  className="column-left"
              htmlFor="passwordLengthInput"
              >password length: </label>
      <input  name="passwordLengthInput" 
              className="column-right"
              value={this.props.passwordLength}
              onChange={this.handleChange}
              type={"number"}
              min={4}
              max={10}
              ></input>
    </div>;
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
        <DicewaPassswordLength 
          passwordLength={this.state.passwordLength}
          updatePasswordLength={this.updatePasswordLength}></DicewaPassswordLength>
        <DicewarePasswordSeparator 
          separator={this.state.separator}
          updateSeparator={this.updateSeparator}
          ></DicewarePasswordSeparator>
        <DicewareButton 
          onNewNumberRequest={this.generatePassword} />
        <DicewarePassword 
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
