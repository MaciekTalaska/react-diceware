import React, { Component } from "react";
import styles from "./ui.module.css";
import PropTypes from "prop-types";

class DpgButton extends Component {
  render() {
    return (
      <button className={styles.button} onClick={this.props.onClick}>
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
