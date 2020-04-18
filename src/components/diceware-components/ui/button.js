import React, { Component } from "react";
import styles from "./button.module.css";

class DpgButton extends Component {
  render() {
    return <button className={styles.button}>{this.props.children}</button>;
  }
}

export default DpgButton;
