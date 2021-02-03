import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../diceware.module.css";
import DpgButton from "./ui/dpgbutton";
import DpgDiv from "./ui/dpgdiv";

class DicewarePasswordRenderer extends Component {
  constructor(props) {
    super(props);
    this.copyPasswordToClipboard = this.copyPasswordToClipboard.bind(this);
  }

  render() {
    return (
      <DpgDiv>
        <textarea
          id="passwordArea"
          className={styles["password-area"]}
          readOnly
          rows="2"
          value={this.props.password}
        />
        <DpgButton onClick={this.copyPasswordToClipboard}>
          copy to clipboard
        </DpgButton>
      </DpgDiv>
    );
  }

  copyPasswordToClipboard() {
    let el = document.getElementById("passwordArea");
    el.select();
    document.execCommand("copy");
    el.selectionStart = el.selectionEnd;
  }
}

DicewarePasswordRenderer.propTypes = {
  password: PropTypes.string.isRequired,
};

export default DicewarePasswordRenderer;
