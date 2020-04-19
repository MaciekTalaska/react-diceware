import React, { Component } from "react";
import "./div.module.css";
import PropTypes from "prop-types";

class DpgDiv extends Component {
  render() {
    return (
      //  this literally means: override default style assigned to div
      //  with the style being passed to it
      <div className={this.props.className}>{this.props.children}</div>
      // TODO: this should be better done, not all properties set via
      // default style should be lost
      // actually these two should be somehow merged
      // <div className={this.props.className ? this.props.className : styles.div}>
      //   {this.props.children}
      // </div>
    );
  }
}

DpgDiv.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default DpgDiv;
