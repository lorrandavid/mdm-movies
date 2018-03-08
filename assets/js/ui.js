import Helpers from './helpers';

export default class UI {
  constructor() {
    this.popular = [];
    this.popularStart = 0;
    this.popularOffset = 5;

    this.discover = [];
    this.discoverStart = 0;
    this.discoverOffset = 5;
  }

  /**
   * ui elements
   */
  elements() {
    return {
      $btnLoadPopular: document.querySelector('[data-js="loadPopular"]'),
      $btnLoadDiscover: document.querySelector('[data-js="loadDiscover"]'),
      $inputSearch: document.querySelector('[data-js="inputSearch"]')
    };
  }

  /**
   * render template movie
   */
  render(data) {
    const { id, poster_path, title, vote_average } = data;

    return `
      <div class="movie">
        <a href="#" class="movie__link" data-id="${id}"></a>
        <div class="movie-wrap">
          <div class="movie-header">
            <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" class="movie-header__img">
          </div>
          <div class="movie-content">
            <h3 class="movie-header__title">${title}</h3>
            <div class="movie-content__rating">
              <span class="movie-header__rating__star"></span><span class="movie-header__rating__text">${Helpers.calculateRating(vote_average)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * render list movies
   * @params: movies(Array)
   */
  listPopular(movies) {
    if (typeof movies !== 'undefined') {
      this.popular = this.popular.concat(movies);
    }

    const $grid = document.querySelector('[data-js="popularGrid"');
    const moviesToRender = this.popular.slice(this.popularStart, this.popularOffset);

    moviesToRender.forEach((movie) => {
      $grid.insertAdjacentHTML('beforeend', this.render(movie));
    });
  }

  /**
   * show movie detail
   * @params: id(Number)
   */
  show(id) {
    const allMovies = this.popular.concat(this.discover);
    const data = allMovies.find(val => val.id.toString() === id);
  }

  /**
   * render discover movies
   * @params: movies(Array)
   */
  listDiscover(movies) {
    if (typeof movies !== 'undefined') {
      this.discover = this.discover.concat(movies);
    }

    const $grid = document.querySelector('[data-js="discoverGrid"');
    const moviesToRender = this.discover.slice(this.discoverStart, this.discoverOffset);

    moviesToRender.forEach((movie) => {
      $grid.insertAdjacentHTML('beforeend', this.render(movie));
    });
  }

  /**
   * load more popular
   */
  loadPopular() {
    this.popularStart += 5;
    this.popularOffset += 5;
  }

  /**
   * load more discover
   */
  loadDiscover() {
    this.discoverStart += 5;
    this.discoverOffset += 5;
  }
}
