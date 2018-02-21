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
      $btnLoadDiscover: document.querySelector('[data-js="loadDiscover"]')
    };
  }

  /**
   * render template movie
   */
  render(data) {
    const { vote_average, poster_path, title, overview } = data;
    return `
      <div class="movie">
        <div class="movie-header">
          <div class="movie-header__rating">
            <span class="movie-header__rating__star"></span><span class="movie-header__rating__text">${Helpers.calculateRating(vote_average)}</span>
          </div>
          <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" class="movie-header__img">
          <h3 class="movie-header__title">${title}</h3>
        </div>
        <div class="movie-content">
          <p class="movie-content__text">${Helpers.truncate(overview)}</p>
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
