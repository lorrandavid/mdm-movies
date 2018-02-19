export default {
  /**
   * make api url
   * @params: query(String), opts(String), apiKey(String)
   */
  makeURL(query, opts = '', apiKey) {
    return `https://api.themoviedb.org/3/${query}?api_key=${apiKey}${opts}`;
  },

  /**
   * make error
   * @params: err(String)
   */
  makeError(err) {
    return `Something unexpected happened: ${err}`;
  },

  /**
   * trucate string after 140 char
   * @params: value(String)
   */
  truncate(value) {
    if(string.length < 140) {
      return;
    }

    return `${string.substring(0, 137)}...`;
  },

  /**
   * calculate rating on base 5
   * @params: value(Number)
   */
  calculateRating(value) {
    return (number * 5)/10;
  }
};
