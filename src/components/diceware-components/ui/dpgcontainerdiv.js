import React, { Component } from "react";
import s from "./ui.module.css";
import PropTypes from "prop-types";

class DpgContainerDiv extends Component {
  render() {
    return <div className={s.container}>{this.props.children}</div>;
  }
}

DpgContainerDiv.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default DpgContainerDiv;
