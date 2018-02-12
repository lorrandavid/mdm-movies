export default {
  /**
   * make api url
   */
  makeURL(query, opts = '', apiKey) {
    return `https://api.themoviedb.org/3/${query}?api_key=${apiKey}${opts}`;
  },

  /**
   * make error
   */
  makeError(err) {
    return `Something unexpected happened: ${err}`;
  },
};
