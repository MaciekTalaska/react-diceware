import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

// list of words taken from: https://www.eff.org/files/2016/09/08/eff_short_wordlist_2_0.txt
// for the sake of speed, list of words is included as part of the project
var dicewareListUrl = require('./diceware-en.txt');

class Dice {
  static throwMany(dices = 6) {
    if (dices < 1) {
      throw new Error('[Dice.throwMany]: at least one dice has to be thrown!');
    }
    let numbers = new Uint32Array(dices);
    window.crypto.getRandomValues(numbers);

		let array = Array.from(numbers);
		let k = Dice.dicesToKey(array);
		return k; 
  }

  static truncateTo(n) {
    if (n > 6) {
      return (n % 6 + 1);
    } else {
      return n;
    }
  }

	static dicesToKey(numbers) {
		let array = numbers.map((n) => Dice.truncateTo(n));
		array.length = 4;
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
}

class DiceButton extends Component {
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

class DiceWord extends Component {
  
  constructor(props) {
    super(props);
		console.log('ths.props.word: ', this.props.word);
  }

  render() {
		console.log('[DiceWord.render] this.props.word: ', this.props.word);
    return (
			(<h2>Current word is: {this.props.word}</h2>)
    );
  }
}

class Diceware extends Component {
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
			this.generateNewWord();
		});		
	}

  generateNewWord() {
		let key = Dice.throwMany();
		this.setState({numbers: key});
			let newWord = this.state.list.get(key);
			this.setState({word: newWord });
  }

  render() {
    return (
      <div>
				<DiceWord word={this.state.word}/>
        <DiceButton onNewNumberRequest={this.generateNewWord}/>
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
        <Diceware />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
