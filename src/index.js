import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

// list of words taken from: https://www.eff.org/files/2016/09/08/eff_short_wordlist_2_0.txt
// for the sake of speed, list of words is included as part of the project
var dicewareListUrl = require('./diceware-en.txt');

class RandomNumberGenerator {
  static generate(size = 6) {
    if (size < 1) {
      throw new Error("[RandomNuberGenerator]: requested size of random array must be greater than 1");
    }
    let numbers = new Uint32Array(size);
    window.crypto.getRandomValues(numbers);

    return Array.from(numbers);
  }

  static arrayToNumber(array) {
    
  }

  static numTo6(n) {
    if (n > 6) {
      return (n % 6 + 1);
    } else {
      return n;
    }
  }

  static numToX(n, size) {
    if (n > size) {
      return (n % size +1);
    } else {
      return n;
    }
  }

	static numToStringKey(number) {
		let array = number.map((n) => RandomNumberGenerator.numTo6(n));

		array.pop();
		array.pop();
		
		let key = array.join('');
		return key;
	}
}

class WordsRepository {
  
  static loadWordsList() {
		return new Promise( (resolve, reject) => {
			fetch(dicewareListUrl)
			.then((res) => res.text())
			.then((data) => {
				let list = Array.from(data.split(/\n/));
				let map = new Map();

				list.forEach((line) => {
					let [k,v] = line.split(/\t/);
					map.set(k,v);
				});
				resolve(map);	
			});
		});
	}

  static getWord(state) {
		let k = RandomNumberGenerator.numToStringKey(state.numbers);
		return state.list.get(k);
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

  renderAsSquares() {
    let numbers = this.props.numbers;
    let listItems = Array.from(numbers).map((n) =>
      <li key={n}>{RandomNumberGenerator.numTo6(n)}</li>);

    /*var displayStyle = {
      listStyleType: 'square'
    };*/

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

    return (
      <ul> {Array.from(numbers).map((n) =>
        <li key={n}>{RandomNumberGenerator.numTo6(n)}</li>)}
      </ul>
    );
  }
}

class DisplayNumbersAsWord extends Component {
  
  constructor(props) {
    super(props);
		console.log('ths.props.word: ', this.props.word);
  }

  render() {
		console.log('[render] this.props.word: ', this.props.word);
    return (
      <h2>Current word is: {this.props.word}</h2>
    );
  }
}

class RandomWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [],
			list : null,
			word: null
    };
    this.generateNewWord = this.generateNewWord.bind(this);
  }
	
	componentWillMount() {
		WordsRepository.loadWordsList().then( (result) => {
			this.setState({list: result});
			console.log('this.state: ', this.state);
		});		
	}

  generateNewWord() {
    this.setState({numbers: RandomNumberGenerator.generate(6)})    
		if (this.state.list != null) {
			console.log('list length: ', this.state.list.length);
			let k = RandomNumberGenerator.numToStringKey(this.state.numbers);
			console.log('key: ', k);
			let newWord = this.state.list.get(k);
			console.log('word from key ', newWord);
			this.setState({word: newWord });
		}
  }

	getWordFromState() {
		if (this.state.numbers.length <1) {
			this.genereteNewWord();
		}
		let k = RandomNumberGenerator.numToStringKey(this.state.numbers);
		return this.state.list.get(k);
	}

  render() {
    return (
      <div>
				<DisplayNumbersAsWord word={this.state.word}/>
        <DisplayNumbersAsList numbers={this.state.numbers}/>
        <RefreshNumbers onNewNumberRequest={this.generateNewWord}/>
      </div>
    );
  }
}

class ApplicationName extends Component {
  render() {
    return (
      <h1>Diceware Password Generator</h1>
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
