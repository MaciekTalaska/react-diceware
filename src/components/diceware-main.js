import React, { Component } from "react";
import DicewareGenerateButton from "./diceware-components/diceware-generate-button";
import DicewarePasswordRenderer from "./diceware-components/diceware-passwordrenderer";
import DicewarePasswordSeparator from "./diceware-components/diceware-passwordseparator";
import DicewarePasswordLength from "./diceware-components/diceware-passwordlength";
import DicewareLanguage from "./diceware-components/diceware-language";
import getRandom from "./dice";
import getWordsMap from "./repository";
import DpgDiv from "./diceware-components/ui/div";
import DpgContainerDiv from "./diceware-components/ui/dpgcontainerdiv";

const MAX_PASSWORD_LENGTH = 10;
const MIN_PASSWORD_LENGTH = 4;
const DEFAULT_PASSWORD_LENGTH = 6;

class DicewarePasswordGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: new Map(),
      password: "",
      language: "en",
      separator: "-",
      passwordLength: DEFAULT_PASSWORD_LENGTH,
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
    getWordsMap(language).then((result) => {
      let repository = this.state.repository;
      repository.set(language, result);
      this.setState({ repository: repository });
    });
  }

  updateLanguage(value) {
    this.setState({ language: value });
    if (!this.state.repository.has(value)) {
      this.updateLanguageInternal(value);
    }
  }

  updatePasswordLength(value) {
    let len =
      value > MAX_PASSWORD_LENGTH
        ? MAX_PASSWORD_LENGTH
        : value < MIN_PASSWORD_LENGTH
        ? MIN_PASSWORD_LENGTH
        : value;

    this.setState({ passwordLength: len });
  }

  updateSeparator(value) {
    this.setState({ separator: value });
  }

  generatePassword() {
    let allwords = new Array(this.state.passwordLength);
    let words = this.state.repository.get(this.state.language);
    allwords = allwords.fill().map(() => words[getRandom() % words.length]);
    let password = allwords.join(this.state.separator);
    this.setState({ password: password });
  }

  render() {
    return (
      <DpgDiv>
        <DpgContainerDiv>
          <DicewareLanguage updatePasswordLanguage={this.updateLanguage} />
          <DicewarePasswordLength
            passwordLength={this.state.passwordLength}
            updatePasswordLength={this.updatePasswordLength}
            maxPasswordLength={MAX_PASSWORD_LENGTH}
            minPasswordLength={MIN_PASSWORD_LENGTH}
          />
          <DicewarePasswordSeparator
            separator={this.state.separator}
            updateSeparator={this.updateSeparator}
          />
          <DicewareGenerateButton regeneratePassword={this.generatePassword} />
          <DicewarePasswordRenderer password={this.state.password} />
        </DpgContainerDiv>
      </DpgDiv>
    );
  }
}

export default DicewarePasswordGenerator;
