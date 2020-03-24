var dicewareListUrl = require('./diceware-en.txt');

class WordsRepository {
  static loadWordsList() {
    return new Promise((resolve, reject) => {
      fetch(dicewareListUrl)
        .then(res => res.text())
        .then(data => {
          let list = Array.from(data.split(/\n/));
          let map = new Map();

          list.forEach(line => {
            let [k, v] = line.split(/\t/);
            map.set(k, v);
          });
          resolve(map);
        });
    });
  }
}

export default WordsRepository;