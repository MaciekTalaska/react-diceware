import React, { Component } from "react";
import PropTypes from "prop-types";
import DpgButton from "./ui/dpgbutton";
import DpgDiv from "./ui/dpgdiv";

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
      <DpgDiv>
        <DpgButton onClick={this.generatePassword}>Generate Password</DpgButton>
      </DpgDiv>
    );
  }
}

DicewareButton.propTypes = {
  regeneratePassword: PropTypes.func.isRequired,
};

export default DicewareButton;
