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

  /**
   * Make array unique based on object properties
   * @param {array} array
   * @param {string} prop
   */
  static uniqArrayObj(array, prop) {
    return array
      .filter((obj, index, arr) => arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === index);
  }

  /**
   * Format genres to show on detail
   * @param {array} array
   */
  static formatGenres(array) {
    return array
      .reduce((total, value, id) => (id === 0 ? value.name : `${total}, ${value.name}`), '');
  }

  /**
   * Format year of release to show on detail
   * @param {string} date
   */
  static formatYearRelease(date) {
    return date.split('-')[0];
  }

  static shuffleArray(arr) {
    return arr.map(a => [Math.random(),a])
              .sort((a, b) => a[0]-b[0])
              .map(a => a[1]);
  }
}
