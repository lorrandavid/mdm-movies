import Helpers from './helpers';

export default class UI {
  constructor() {
    this.popularContainer = document.querySelector('[data-js="popularGrid"]');
  }

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
  listMovies(movies) {
    const $grid = document.querySelector('[data-js="popularGrid"');

    movies.forEach((movie) => {
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
