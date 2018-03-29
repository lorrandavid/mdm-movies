import axios from 'axios';
import Movie from './movie';
import UI from './ui';
import Helpers from './helpers';

class App {
  constructor() {
    this.Movie = new Movie();
    this.UI = new UI();
  }

  /**
   * Handle load more popular
   * @param {event} e
   */
  handleLoadPopular(e) {
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

  /**
   * Handle load more discover
   * @param {event} e
   */
  handleLoadDiscover(e) {
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

  /**
   * Handle search
   * @param {event} e
   */
  handleSearch(e) {
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

  /**
   * Handle movie detail
   * @param {string} id
   */
  handleMovieDetail(id) {
    this.Movie.certification(id)
      .then((res) => {
        this.UI.show(res.data);
      })
      .catch((err) => {
        throw new Error(Helpers.makeError(err));
      });
  }

  /**
   * Init events
   */
  initEvents() {
    const { $btnLoadPopular, $btnLoadDiscover, $inputSearch } = UI.elements();

    $btnLoadPopular.addEventListener('click', (e) => {
      this.handleLoadPopular(e);
    });

    $btnLoadDiscover.addEventListener('click', (e) => {
      this.handleLoadDiscover(e);
    });

    $inputSearch.addEventListener('keyup', (e) => {
      this.handleSearch(e);
    });

    document.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.classList.value.match(/movie__link/g)) {
        this.handleMovieDetail(e.target.getAttribute('data-id'));
      }
    });
  }

  /**
   * Init app
   */
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
