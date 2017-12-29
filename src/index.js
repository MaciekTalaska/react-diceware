import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class RandomNumberGenerator {
  static generate(size = 6) {
    if (size < 1) {
      throw new Error("[RandomNuberGenerator]: requested size of random array must be greater than 1");
    }
    let numbers = new Uint32Array(size);
    window.crypto.getRandomValues(numbers);

    return Array.from(numbers);
  }

  static numTo6(n) {
    if (n > 6) {
      return (n % 6 + 1);
    } else {
      return n;
    }
  }
}

class RefreshNumbers extends Component {
  constructor(props) {
    super(props);
    this.forceRefresh = this.forceRefresh.bind(this);
  }

  forceRefresh(e) {
    this.props.onNewNumberRequest(e);
  }

  render() {
    return (
      <button onClick={this.forceRefresh}>Generate!</button>
    );
  }
}

class DisplayNumbersAsList extends Component {
  constructor(props) {
    super(props);
  }

  renderAsSquares() {
    let numbers = this.props.numbers;
    let listItems = Array.from(numbers).map((n) =>
      <li>{RandomNumberGenerator.numTo6(n)}</li>);

    var displayStyle = {
      listStyleType: 'square'
    };

    return (
      <ul style={{listStyleType:'square'}}>
        {listItems}
      </ul>
    )
  }

  render() {
    //return this.renderAsDiscs();
    return this.renderAsSquares();
  }

  renderAsDiscs() {

    let numbers = this.props.numbers;

    if ( !numbers || !Array.isArray(numbers) || numbers.length < 1) {
      return (
        <div style={{color: "red"}}>Error! No data to display!</div>
      );
    }
    return (
      <ul> {Array.from(numbers).map((n) =>
        <li>{RandomNumberGenerator.numTo6(n)}</li>)}
      </ul>
    );
  }
}

class RandomWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: []
    };
    this.generateNewWord = this.generateNewWord.bind(this);
  }

  generateNewWord() {
    this.setState({numbers: RandomNumberGenerator.generate(6)})    
  }

  render() {
    if (this.state.numbers.length < 1) {
      this.generateNewWord();
    }
    return (
      <div>
        <DisplayNumbersAsList numbers={this.state.numbers}/>
        <RefreshNumbers onNewNumberRequest={this.generateNewWord}/>
      </div>
    );
  }
}

class ApplicationName extends Component {
  render() {
    return (
      <h1>DiceWare Password Generator</h1>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <ApplicationName />
        <RandomWord />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
