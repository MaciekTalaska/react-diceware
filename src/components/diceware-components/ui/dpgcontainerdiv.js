import React, { Component } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  width: "600px",
  border: "1px solid #ffffff",
  display: "inline-grid",
  backgroundColor: "lightblue",
  padding: "60px 60px 20px 60px",
  borderRadius: "5px",
};

class DpgContainerDiv extends Component {
  render() {
    return (
      <div
        id={this.props.id}
        style={containerStyle}
        className={this.props.className}
      >
        {this.props.children}
      </div>
    );
  }
}

DpgContainerDiv.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default DpgContainerDiv;
