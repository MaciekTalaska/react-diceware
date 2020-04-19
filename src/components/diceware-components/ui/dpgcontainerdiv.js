import React, { Component } from "react";
import s from "./dpgdicewarecontainer.module.css";
import PropTypes from "prop-types";

class DpgContainerDiv extends Component {
  render() {
    return (
      //  this literally means: override default style assigned to div
      //  with the style being passed to it
      <div className={s.container}>{this.props.children}</div>
      // TODO: this should be better done, not all properties set via
      // default style should be lost
      // actually these two should be somehow merged
      // <div className={this.props.className ? this.props.className : styles.div}>
      //   {this.props.children}
      // </div>
    );
  }
}

DpgContainerDiv.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default DpgContainerDiv;
