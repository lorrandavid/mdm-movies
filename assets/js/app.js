import axios from 'axios';
import Movie from './movie';
import Helpers from './helpers';

class App {
  constructor() {
    this.movie = new Movie();
  }

  init() {
    axios.all([this.movie.list(), this.movie.discover()])
      .then(axios.spread((list, discover) => {
        console.log(list);
        // UI.renderListMovies(list.data.results);
        // UI.renderDiscoverMovies(discover.data.results);
      }))
      .catch((err) => {
        throw new Error(Helpers.makeError(err));
      });
  }
}

const app = new App();
app.init();
