import React, { Component } from "react";
import PropTypes from "prop-types";
import DpgButton from "./ui/dpgbutton";

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
      <div>
        <DpgButton onClick={this.generatePassword}>Generate Password</DpgButton>
      </div>
    );
  }
}

DicewareButton.propTypes = {
  regeneratePassword: PropTypes.func.isRequired,
};

export default DicewareButton;
