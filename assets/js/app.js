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

  initEvents() {
    const { $btnLoadPopular, $btnLoadDiscover } = this.UI.elements();

    $btnLoadPopular.addEventListener('click', (e) => {
      this._handleLoadPopular(e)
    });

    $btnLoadDiscover.addEventListener('click', (e) => {
      this._handleLoadDiscover(e)
    });
  }

  init() {
    this.initEvents();

    axios.all([this.Movie.list(), this.Movie.discover()])
      .then(axios.spread((list, discover) => {
        this.UI.listPopular(list.data.results);
        this.UI.listDiscover(discover.data.results);

        var $page = document.querySelector('[data-js="pageWrapper"]');
        var $clone = $page.cloneNode(true);
        var $blurredDiv = document.createElement('div');
        var width = $page.offsetWidth;
        $blurredDiv.className = 'content-blurred';
        $blurredDiv.appendChild($clone);
        $blurredDiv.style.width = width + 'px';


        var $movieDetails = document.querySelector('[data-js="movieDetails"]');
        $movieDetails.appendChild($blurredDiv);
      }))
      .catch((err) => {
        throw new Error(Helpers.makeError(err));
      });
  }
}

const app = new App();
app.init();
