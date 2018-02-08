(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);
  }

  _createClass(App, [{
    key: 'auth',

    /**
     * get authentication
     */
    value: function auth() {
      var _this = this;

      fetch('./assets/js/auth.json').then(function (res) {
        return res.json();
      }).then(function (res) {
        _this.key = res.apiKey;
      }).catch(function (err) {
        throw new Error('Something unexpected happened: ' + err);
      });
    }

    /**
     * make api url
     */

  }, {
    key: 'makeApiURL',
    value: function makeApiURL(query) {
      return 'https://api.themoviedb.org/3/' + query + '?api_key=' + this.key;
    }
  }]);

  return App;
}();

var app = new App();
app.init();

},{}]},{},[1]);
