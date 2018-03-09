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
    this.UI.loadPopular();

    if (this.UI.popularOffset > this.UI.popular.length) {
      this.Movie.list()
        .then((res) => {
          this.UI.listPopular(res.data.results);
        })
        .catch((err) => {
          throw new Error(Helpers.makeError(err));
        });
    } else {
      this.UI.listPopular();
    }
  }

  _handleLoadDiscover(e) {
    e.preventDefault();
    this.UI.loadDiscover();

    if (this.UI.discoverOffset > this.UI.discover.length) {
      this.Movie.discover()
        .then((res) => {
          this.UI.listDiscover(res.data.results);
        })
        .catch((err) => {
          throw new Error(Helpers.makeError(err));
        });
    } else {
      this.UI.listDiscover();
    }
  }

  _handleSearch(e) {
    const { value } = e.target.value;
    const movies = [];

    this.Movie.search(value)
      .then((res) => {
        movies.push(res);
      })
      .catch((err) => {
        throw new Error(Helpers.makeError(err));
      });
  }

  _handleMovieDetail(id) {
    this.Movie.find(id)
      .then((res) => {
        this.UI.show(res.data);
      })
      .catch((err) => {
        throw new Error(Helpers.makeError(err));
      });
  }

  initEvents() {
    const { $btnLoadPopular, $btnLoadDiscover, $inputSearch } = this.UI.elements();

    $btnLoadPopular.addEventListener('click', (e) => {
      this._handleLoadPopular(e)
    });

    $btnLoadDiscover.addEventListener('click', (e) => {
      this._handleLoadDiscover(e)
    });

    $inputSearch.addEventListener('keyup', (e) => {
      this._handleSearch(e)
    });

    document.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.classList.value.match(/movie__link/g)) {
        this._handleMovieDetail(e.target.getAttribute('data-id'));
      }
    });
  }

  init() {
    this.initEvents();

    axios.all([this.Movie.list(), this.Movie.discover()])
      .then(axios.spread((list, discover) => {
        this.UI.listPopular(list.data.results);
        this.UI.listDiscover(discover.data.results);
      }))
      .catch((err) => {
        throw new Error(Helpers.makeError(err));
      });
  }
}

const app = new App();
app.init();
