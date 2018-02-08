class App {
  /**
   * get authentication
   */
  auth() {
    fetch('./assets/js/auth.json')
      .then(res => res.json())
      .then((res) => {
        this.key = res.apiKey;
      })
      .catch((err) => {
        throw new Error(`Something unexpected happened: ${err}`);
      });
  }

  /**
   * make api url
   */
  makeApiURL(query) {
    return `https://api.themoviedb.org/3/${query}?api_key=${this.key}`;
  }
}

const app = new App();
app.init();
