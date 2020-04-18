import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../diceware.module.css";

class DicewareButton extends Component {
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
        <button className={styles.button} onClick={this.generatePassword}>
          Generate password
        </button>
      </div>
    );
  }
}

DicewareButton.propTypes = {
  regeneratePassword: PropTypes.func.isRequired,
};

export default DicewareButton;
