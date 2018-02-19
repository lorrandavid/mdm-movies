import axios from 'axios';
import Movie from './movie';
import UI from './ui';
import Helpers from './helpers';

class App {
  constructor() {
    this.Movie = new Movie();
    this.UI = new UI();
  }

  init() {
    axios.all([this.Movie.list(), this.Movie.discover()])
      .then(axios.spread((list, discover) => {
        this.UI.listMovies(list.data.results);
      }))
      .catch((err) => {
        throw new Error(Helpers.makeError(err));
      });
  }
}

const app = new App();
app.init();
