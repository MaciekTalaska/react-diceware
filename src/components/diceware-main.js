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
      repo: new Map(),
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

  componentWillMount() {
    getWordsMap(this.state.language).then(result => {
      let repository = this.state.repo;
      repository.set(this.state.language, result);
      this.setState({repo: repository});
    })
  }

  updatePasswordLength(value) {
    this.setState({passwordLength: value})
  }

  updateSeparator(value) {
    this.setState({separator: value})
  }

  updateLanguage(value) {
    this.setState({language: value})
    if ( !this.state.repo.has(value)) {
      getWordsMap(value).then(result => {
        let repository = this.state.repo;
        repository.set(value, result);
        this.setState({repo: repository});
      })      
    }
  }
  
  generatePassword() {
    let allwords = new Array(this.state.passwordLength);
    let words = this.state.repo.get(this.state.language);
    allwords = allwords.fill().map(_ => words[getRandom() % words.length]);
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
            onNewNumberRequest={this.generatePassword} />
        </div>
      <DicewarePasswordRenderer
        password={this.state.password} />
      </div>
    );
  }
}

export default DicewarePasswordGenerator;