import React, { Component } from "react";
import PropTypes from "prop-types";

class DicewarePasswordRenderer extends Component {
  constructor(props) {
    super(props);
    this.copyPasswordToClipboard = this.copyPasswordToClipboard.bind(this);
  }

  render() {
    return (
      <div>
        <textarea
          id="passwordArea"
          className="password-area"
          readOnly
          rows="1"
          value={this.props.password}
        />
        <button onClick={this.copyPasswordToClipboard}>
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
