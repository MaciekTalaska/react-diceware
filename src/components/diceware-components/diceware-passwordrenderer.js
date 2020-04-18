import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../diceware.module.css";

class DicewarePasswordRenderer extends Component {
  constructor(props) {
    super(props);
    this.copyPasswordToClipboard = this.copyPasswordToClipboard.bind(this);
  }

  render() {
    return (
      <div className={styles.div}>
        <textarea
          id="passwordArea"
          className={styles["password-area"]}
          readOnly
          rows="1"
          value={this.props.password}
        />
        <button
          onClick={this.copyPasswordToClipboard}
          className={styles.button}
        >
          copy to clipboard
        </button>
      </div>
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
