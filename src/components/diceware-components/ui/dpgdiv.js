import React, { Component } from "react";
import PropTypes from "prop-types";

const divStyle = {
  paddingBottom: "10px",
};

class DpgDiv extends Component {
  render() {
    return (
      <div style={divStyle} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

DpgDiv.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default DpgDiv;
