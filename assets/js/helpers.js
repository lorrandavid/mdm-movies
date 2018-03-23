export default class Helpers {
  /**
   * Make api url
   * @param {string} query
   * @param {string} opts
   * @param {string} apiKey
   */
  static makeURL(query, opts = '', apiKey) {
    return `https://api.themoviedb.org/3/${query}?api_key=${apiKey}${opts}`;
  }

  /**
   * Make error
   * @param {string} err
   */
  static makeError(err) {
    return `Something unexpected happened: ${err}`;
  }

  /**
   * Trucate string after 140 char
   * @param {string} value
   */
  static truncate(value) {
    if (value.length < 140) {
      return false;
    }

    return `${value.substring(0, 137)}...`;
  }

  /**
   * Calculate rating on base 5
   * @param {number} value
   */
  static calculateRating(value) {
    return (value * 5) / 10;
  }
}
