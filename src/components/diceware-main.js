import React, {Component} from 'react';
import DicewareButton from './diceware-components/diceware-button';
import DicewarePasswordRenderer from './diceware-components/diceware-passwordrenderer';
import DicewarePasswordSeparator from './diceware-components/diceware-passwordseparator';
import DicewarePasswordLength from './diceware-components/diceware-passwordlength';
import DicewareLanguage from './diceware-components/diceware-language';
import Dice from '../dice';
import WordsRepository from '../repository';

const diceCount = 4;

class DicewarePasswordGenerator extends Component {
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

export default DicewarePasswordGenerator;