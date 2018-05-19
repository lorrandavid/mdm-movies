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
      $btnCloseDetails: document.querySelector('.js-close-details'),
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
   * Render movie details
   * @param {object} data
   */
  static renderDetail(data) {
    const {
      title,
      overview,
      genres,
      backdrop_path: backdrop,
      vote_average: voteAverage,
      release_date: releaseDate,
    } = data.details;
    const { certification } = data.certification.release_dates.filter(obj => obj.certification !== '')[0];

    return `
      <div class="movie-detail">
        <div class="movie-detail__background">
          <img src="https://image.tmdb.org/t/p/w1280/${backdrop}" alt="" class="movie-detail__background__img">
        </div>
        <article>
          <a href="#" class="movie-detail__close js-close-details">
            &times;
          </a>
          <div class="movie-detail__content">
            <h2 class="movie-detail__content__title">${title}</h2>
            <div class="movie-detail__content-info">
              <ul class="movie-detail__content-info__list">
                <li class="movie-detail__content-info__item">
                  <span class="movie-detail__content-info__rating-star"></span><span class="movie-detail__content-info__rating-text">${Helpers.calculateRating(voteAverage)}</span>
                </li>
                <li class="movie-detail__content-info__item">
                  ${Helpers.formatGenres(genres)}
                </li>
                <li class="movie-detail__content-info__item">
                  ${Helpers.formatYearRelease(releaseDate)}
                </li>
                <li class="movie-detail__content-info__item">
                  <span class="badge badge--outline">
                    ${certification}
                  </span>
                </li>
              </ul>
            </div>
            <div class="movie-detail__content-excerpt">
              <p class="movie-detail__content-excerpt__text">
                ${overview}
              </p>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  static show(data) {
    const $page = document.querySelector('.page-wrapper');
    const certification = data.certification.results.filter(obj => obj.iso_3166_1 === 'US')[0];
    const { details } = data;
    const movie = { details, certification };

    $page.insertAdjacentHTML('afterend', UI.renderDetail(movie));
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
      this.discover = this.discover.concat(Helpers.shuffleArray(movies));
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
}
