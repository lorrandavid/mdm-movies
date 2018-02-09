import axios from 'axios';
import Helpers from './helpers';

export default class Movie {
  constructor() {
    this.key = '21be541f1012e12adf6f3fa072059793';
  }

  /**
   * get movies list
   */
  list() {
    axios.get('movie/popular')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw new Error(Helpers.makeError(err));
      });
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
