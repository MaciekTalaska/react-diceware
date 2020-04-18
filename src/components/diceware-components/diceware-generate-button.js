import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../diceware.module.css";
import DpgButton from "./ui/button";
import DpgDiv from "./ui/div";

class DicewareGenerateButton extends Component {
  constructor(props) {
    super(props);
    this.generatePassword = this.generatePassword.bind(this);
  }

  generatePassword(e) {
    this.props.regeneratePassword(e);
  }

  render() {
    return (
      <DpgDiv className={styles.DpgDiv}>
        <DpgButton onClick={this.generatePassword}>Generate password</DpgButton>
      </DpgDiv>
    );
  }
}

DicewareGenerateButton.propTypes = {
  regeneratePassword: PropTypes.func.isRequired,
};

export default DicewareGenerateButton;
