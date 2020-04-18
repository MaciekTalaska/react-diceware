import React, { Component } from "react";
import styles from "./div.module.css";

class DpgDiv extends Component {
  render() {
    return (
      <div className={[styles.div, this.props.className].join(" ")}>
        {this.props.children}
      </div>
    );
  }
}

export default DpgDiv;
