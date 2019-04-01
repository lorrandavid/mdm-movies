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
    e.target.classList.add('section__btn-load--clicked');

    setTimeout(() => {
      this.UI.loadPopular();

      if (this.UI.popularOffset > this.UI.popular.length) {
        this.Movie.list()
          .then((res) => {
            this.UI.listPopular(res.data.results);
          })
          .catch((err) => {
            throw new Error(Helpers.makeError(err));
          })
          .finally(() => {
            e.target.classList.remove('section__btn-load--clicked');
          });
      } else {
        this.UI.listPopular();
        e.target.classList.remove('section__btn-load--clicked');
      }
    }, 1000);
  }

  /**
   * Handle load more discover
   * @param {event} e
   */
  // handleLoadDiscover(e) {
  //   e.preventDefault();
  //   e.target.classList.add('section__btn-load--clicked');

  //   setTimeout(() => {
  //     this.UI.loadDiscover();

  //     if (this.UI.discoverOffset > this.UI.discover.length) {
  //       this.Movie.discover()
  //         .then((res) => {
  //           this.UI.listDiscover(res.data.results);
  //         })
  //         .catch((err) => {
  //           throw new Error(Helpers.makeError(err));
  //         })
  //         .finally(() => {
  //           e.target.classList.remove('section__btn-load--clicked');
  //         });
  //     } else {
  //       this.UI.listDiscover();
  //       e.target.classList.remove('section__btn-load--clicked');
  //     }
  //   }, 1000);
  // }

  /**
   * Handle search
   * @param {event} e
   */
  handleSearch(e) {
    const { value } = e.key;
    const movies = [];

    // Must check if value is a real key
    // Then search and populate the grid I designed

    // this.Movie.search(value)
    //   .then((res) => {
    //     movies.push(res);
    //   })
    //   .catch((err) => {
    //     throw new Error(Helpers.makeError(err));
    //   });
  }

  /**
   * Handle movie detail
   * @param {string} id
   */
  handleMovieDetail(id) {
    axios.all([this.Movie.find(id), this.Movie.certification(id)])
      .then(axios.spread((details, certification) => {
        const data = {
          details: details.data,
          certification: certification.data,
        };
        UI.show(data);
      }))
      .catch((err) => {
        throw new Error(Helpers.makeError(err));
      });
  }

  /**
   * Init events
   */
  initEvents() {
    const { $btnLoadPopular, $inputSearch } = UI.elements();

    $btnLoadPopular.addEventListener('click', (e) => {
      this.handleLoadPopular(e);
    });

    {
      let timer = 0;
      $inputSearch.addEventListener('keyup', (e) => {
        clearTimeout(timer);
        timer = setTimeout(this.handleSearch.bind(null, e), 3000);
      });
    }

    document.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.which === 1) {
        if (e.target.classList.value.match(/movie__link/g)) {
          this.handleMovieDetail(e.target.getAttribute('data-id'));
        }
        if (e.target.classList.value.match(/movie-detail__close/g)) {
          const $wrapMovieDetail = document.querySelector('.movie-detail');
          $wrapMovieDetail.parentElement.removeChild($wrapMovieDetail);
        }
      }
    });
  }

  /**
   * Init app
   */
  async init() {
    this.initEvents();

    try {
      var list = await this.Movie.list();
      this.UI.listPopular(list);
    } catch (err) {
      throw new Error(Helpers.makeError(err));
    }


    // axios.all([this.Movie.list(), this.Movie.discover()])
    //   .then(axios.spread((list, discover) => {
    //     this.UI.listPopular(list.data.results);
    //     this.UI.listDiscover(discover.data.results);
    //   }))
    //   .catch((err) => {
    //     throw new Error(Helpers.makeError(err));
    //   });
  }
}

const app = new App();
app.init();
