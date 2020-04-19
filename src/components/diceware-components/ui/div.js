import React, { Component } from "react";
import styles from "./div.module.css";
import PropTypes from "prop-types";

class DpgDiv extends Component {
  render() {
    return (
      <div className={[styles.div, this.props.className].join(" ")}>
        {this.props.children}
      </div>
    );
  }
}

DpgDiv.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default DpgDiv;
