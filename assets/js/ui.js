import Helpers from './helpers';

export default class UI {
  constructor() {
    this.popular = [];
    this.popularStart = 0;
    this.popularOffset = 5;
  }

  /**
   * ui elements
   */
  elements() {
    return {
      $btnLoadPopular: document.querySelector('[data-js="loadPopular"]')
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
    const $grid = document.querySelector('[data-js="popularGrid"');
    const moviesToRender = movies.slice(this.popularStart, this.popularOffset);
    this.popular = this.popular.concat(movies);

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
  renderDiscoverMovies(movies) {
    // render
  }
}
