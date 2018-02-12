import axios from 'axios';
import Movie from './movie';
import Helpers from './helpers';

class App {
  constructor() {
    this.movie = new Movie();
  }

  init() {
    // Pages
    axios.all([this.movie.list(), this.movie.discover()])
      .then(axios.spread((list, discover) => {
        UI.renderDiscoverMovies(discover.data.results);
        UI.renderListMovies(list.data.results);
      }))
      .catch((err) => {
        throw new Error(Helpers.makeError(err));
      });
  }
}

const app = new App();
app.init();
