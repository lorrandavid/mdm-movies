import Helpers from './helpers';

export default class UI {
  constructor() {
    this.moviesIdx = [];
    this.movies = [];

    this.popular = [];
    this.popularStart = 0;
    this.popularOffset = 5;

    this.discover = [];
    this.discoverStart = 0;
    this.discoverOffset = 5;
  }

  /**
   * UI elements
   */
  static elements() {
    return {
      $btnLoadPopular: document.querySelector('[data-js="loadPopular"]'),
      $btnLoadDiscover: document.querySelector('[data-js="loadDiscover"]'),
      $inputSearch: document.querySelector('[data-js="inputSearch"]'),
    };
  }

  /**
   * Render movie card
   * @param {object} data
   */
  static render(data) {
    const {
      id,
      poster_path: posterPath,
      title,
      vote_average: voteAverage,
    } = data;

    return `
      <div class="movie">
        <a href="#" class="movie__link" data-id="${id}"></a>
        <div class="movie-wrap">
          <div class="movie-header">
            <img src="https://image.tmdb.org/t/p/w500${posterPath}" alt="${title}" class="movie-header__img">
          </div>
          <div class="movie-content">
            <h3 class="movie-header__title">${title}</h3>
            <div class="movie-content__rating">
              <span class="movie-header__rating__star"></span><span class="movie-header__rating__text">${Helpers.calculateRating(voteAverage)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render popular list
   * @param {array} movies
   */
  listPopular(movies) {
    if (typeof movies !== 'undefined') {
      this.popular = this.popular.concat(movies);
      this.movies = Helpers.uniqArrayObj(this.movies.concat(movies), 'id');
    }

    const $grid = document.querySelector('[data-js="popularGrid"');
    const moviesToRender = this.popular.slice(this.popularStart, this.popularOffset);

    moviesToRender.forEach((movie) => {
      $grid.insertAdjacentHTML('beforeend', UI.render(movie));
    });
  }

  /**
   * Render discover list
   * @param {array} movies
   */
  listDiscover(movies) {
    if (typeof movies !== 'undefined') {
      this.discover = this.discover.concat(movies);
      this.movies = Helpers.uniqArrayObj(this.movies.concat(movies), 'id');
    }

    const $grid = document.querySelector('[data-js="discoverGrid"');
    const moviesToRender = this.discover.slice(this.discoverStart, this.discoverOffset);

    moviesToRender.forEach((movie) => {
      $grid.insertAdjacentHTML('beforeend', UI.render(movie));
    });
  }

  /**
   * Load more popular
   */
  loadPopular() {
    this.popularStart += 5;
    this.popularOffset += 5;
  }

  /**
   * Load more discover
   */
  loadDiscover() {
    this.discoverStart += 5;
    this.discoverOffset += 5;
  }

  /**
   * Show movie details
   * @param {string} id
   */
  show(id) {
    const movie = this.movies.filter(obj => obj.id === id)[0];
    console.log(movie);
  }
}
