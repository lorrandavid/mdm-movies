import axios from 'axios';
import Helpers from './helpers';

export default class Movie {
  constructor() {
    this.key = '21be541f1012e12adf6f3fa072059793';
  }

  /**
   * get movies list
   */
  list(page = 1) {
    return axios.get(Helpers.makeURL('movie/popular', `&page=${page}`, this.key));
  }

  /**
   * get discover list
   */
  discover(page = 1) {
    return axios.get(Helpers.makeURL('discover/movie', `&page=${page}&sort_by=popularity.desc`, this.key));
  }

  /**
   * get details single movie
   * @params: arr(Array)
   */
  find(arr) {
    const movies = [];
    arr.forEach((id) => {
      axios.get(`/movie/${id}`, '', this.key)
        .then((res) => {
          movies.push(res);
        })
        .catch((err) => {
          throw new Error(Helpers.makeError(err));
        });
    });
  }

  init() {
    this.auth();
  }
}
