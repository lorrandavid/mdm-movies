import axios from 'axios';
import Helpers from './helpers';

export default class Movie {
  constructor() {
    this.key = '21be541f1012e12adf6f3fa072059793';
    this.listPage = 0;
    this.discoverPage = 0;
  }

  /**
   * List movies
   */
  list() {
    this.listPage = this.listPage + 1;
    return axios.get(Helpers.makeURL('movie/popular', `&page=${this.listPage}`, this.key));
  }

  /**
   * List dicover
   */
  discover() {
    this.discoverPage = this.discoverPage + 1;
    return axios.get(Helpers.makeURL('discover/movie', `&page=${this.discoverPage}&sort_by=popularity.desc`, this.key));
  }

  /**
   * Find specific movie
   * @param {number} id
   */
  find(id) {
    return axios.get(Helpers.makeURL(`movie/${id}`, undefined, this.key));
  }

  /**
   * Search for movie
   * @param {string} name
   */
  search(name) {
    return axios.get(Helpers.makeURL('search/movie', `&page=1&sort_by=popularity.desc&query=${name}`, this.key));
  }

  /**
   * Get movie certifications
   * @param {number} id
   */
  certification(id) {
    return axios.get(Helpers.makeURL(`movie/${id}/release_dates`, undefined, this.key));
  }
}
