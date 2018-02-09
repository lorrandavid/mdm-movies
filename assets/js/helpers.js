export default {
  /**
   * make api url
   */
  makeURL(query, apiKey) {
    return `https://api.themoviedb.org/3/${query}?api_key=${apiKey}`;
  },

  /**
   * make error
   */
  makeError(err) {
    return `Something unexpected happened: ${err}`;
  },
};
