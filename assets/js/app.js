import axios from 'axios';
import Movie from './movie';
import UI from './ui';
import Helpers from './helpers';

class App {
  constructor() {
    this.Movie = new Movie();
    this.UI = new UI();
  }

  _handleLoadPopular(e) {
    e.preventDefault();

    if (this.UI.popularOffset >= this.UI.popular.length) {
      this.Movie.list()
        .then((res) => {
          this.UI.listPopular(res.data.results);
          this.UI.loadPopular();
        })
        .catch((err) => {
          throw new Error(Helpers.makeError(err));
        });
    } else {
      this.UI.loadPopular();
    }
  }

  initEvents() {
    const { $btnLoadPopular } = this.UI.elements();

    $btnLoadPopular.addEventListener('click', (e) => {
      this._handleLoadPopular(e)
    });
  }

  init() {
    this.initEvents();

    axios.all([this.Movie.list(), this.Movie.discover()])
      .then(axios.spread((list, discover) => {
        this.UI.listPopular(list.data.results);
      }))
      .catch((err) => {
        throw new Error(Helpers.makeError(err));
      });
  }
}

const app = new App();
app.init();
