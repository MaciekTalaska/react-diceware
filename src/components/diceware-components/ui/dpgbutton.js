import React, { Component } from "react";
import PropTypes from "prop-types";

const buttonStyle = {
  background: "#ff3e00",
  color: "white",
  border: "none",
  borderRadius: "2px",
  margin: "10px",
  textTransform: "capitalize",
  padding: "10px 20px",
};

class DpgButton extends Component {
  render() {
    return (
      <button style={buttonStyle} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

DpgButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default DpgButton;
