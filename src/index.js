import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";
import DicewarePasswordGenerator from "./components/diceware-main";
import ProjectInfo from "./components/project-info";

class ApplicationName extends Component {
  render() {
    return <h1>Diceware Password Generator (in ReactJS)</h1>;
  }
}

class App extends Component {
  render() {
    return (
      <div className="main">
        <ApplicationName />
        <DicewarePasswordGenerator />
        <ProjectInfo />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
