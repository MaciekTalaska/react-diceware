import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../diceware.module.css";
import DpgButton from "./ui/button";

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
      <div className={styles.div}>
        <DpgButton onClick={this.generatePassword}>Generate password</DpgButton>
      </div>
    );
  }
}

DicewareGenerateButton.propTypes = {
  regeneratePassword: PropTypes.func.isRequired,
};

export default DicewareGenerateButton;
