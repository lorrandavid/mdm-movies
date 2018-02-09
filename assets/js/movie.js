import axios from 'axios';
import Helpers from './helpers';

export default class Movie {
  constructor() {
    this.key = undefined;
  }

  /**
   * get authentication
   */
  auth() {
    axios.get('./assets/js/auth.json')
      .then((res) => {
        this.key = res.data.apiKey;
      })
      .catch((err) => {
        throw new Error(Helpers.makeError(err));
      });
  }

  /**
   * get movies list
   */
  list() {
    // ajax
  }

  /**
   * get details single movie
   * @params: arr(Array)
   */
  find(arr) {
    // ajax
  }

  /**
   * get discover list
   */
  discover() {
    // ajax
  }

  /**
   * get favorite movies
   * @params: arr(Array)
   */
  favorites(arr) {
    // get favorite movies
  }

  init() {
    this.auth();
  }
}
