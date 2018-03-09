import axios from 'axios';
import Helpers from './helpers';

export default class Movie {
  constructor() {
    this.key = '21be541f1012e12adf6f3fa072059793';
    this.listPage = 0;
    this.discoverPage = 0;
  }

  /**
   * get movies list
   */
  list() {
    this.listPage = this.listPage + 1;
    return axios.get(Helpers.makeURL('movie/popular', `&page=${this.listPage}`, this.key));
  }

  /**
   * get discover list
   */
  discover() {
    this.discoverPage = this.discoverPage + 1;
    return axios.get(Helpers.makeURL('discover/movie', `&page=${this.discoverPage}&sort_by=popularity.desc`, this.key));
  }

  /**
   * find movies
   * @param Number id
   */
  find(id) {
    return axios.get(Helpers.makeURL(`movie/${id}`, undefined, this.key));
  }

  /**
   * search movies
   * @params: name(String)
   */
  search(name) {
    return axios.get(Helpers.makeURL('search/movie', `&page=1&sort_by=popularity.desc&query=${name}`, this.key));
  }
}
