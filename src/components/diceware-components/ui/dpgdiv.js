import React, { Component } from "react";
import s from "./ui.module.css";
import PropTypes from "prop-types";

class DpgDiv extends Component {
  render() {
    return <div className={s.div}>{this.props.children}</div>;
  }
}

DpgDiv.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default DpgDiv;
