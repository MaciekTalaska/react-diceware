import React, {Component} from 'react';
import DicewareButton from './diceware-components/diceware-button';
import DicewarePasswordRenderer from './diceware-components/diceware-passwordrenderer';
import DicewarePasswordSeparator from './diceware-components/diceware-passwordseparator';
import DicewarePasswordLength from './diceware-components/diceware-passwordlength';
import DicewareLanguage from './diceware-components/diceware-language';
import getRandom from '../dice';
import getWordsMap from '../repository';

class DicewarePasswordGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: new Map(),
      password: null,
      language: "en",
      separator: "-",
      passwordLength: 6,
    };
    this.generatePassword = this.generatePassword.bind(this);
    this.updatePasswordLength = this.updatePasswordLength.bind(this);
    this.updateSeparator = this.updateSeparator.bind(this);
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguageInternal(this.state.language);
  }

  updateLanguageInternal(language) {
    getWordsMap(language).then(result => {
      let repository = this.state.repository;
      repository.set(language, result);
      this.setState({repository: repository});
    })
  }

  updateLanguage(value) {
    this.setState({language: value})
    if ( !this.state.repository.has(value)) {
      this.updateLanguageInternal(value);
    }
  }
  
  updatePasswordLength(value) {
    this.setState({passwordLength: value})
  }

  updateSeparator(value) {
    this.setState({separator: value})
  }

  generatePassword() {
    let allwords = new Array(this.state.passwordLength);
    let words = this.state.repository.get(this.state.language);
    allwords = allwords.fill().map(() => words[getRandom() % words.length]);
    let password = allwords.join(this.state.separator);
    this.setState({password: password});
  }

  render() {
    return (
      <div>
        <div className="container">
          <DicewareLanguage
            updatePasswordLanguage={this.updateLanguage}
            ></DicewareLanguage>
          <DicewarePasswordLength
            passwordLength={this.state.passwordLength}
            updatePasswordLength={this.updatePasswordLength}></DicewarePasswordLength>
          <DicewarePasswordSeparator 
            separator={this.state.separator}
            updateSeparator={this.updateSeparator}
            ></DicewarePasswordSeparator>
          <DicewareButton 
            regeneratePassword={this.generatePassword} />
        </div>
      <DicewarePasswordRenderer
        password={this.state.password} />
      </div>
    );
  }
}

export default DicewarePasswordGenerator;
