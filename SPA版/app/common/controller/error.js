'use strict';
/**
 * error controller
 */exports.__esModule = true;var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_think$controller$bas) {(0, _inherits3.default)(_class, _think$controller$bas);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));}

  /**
   * display error page
   * @param  {Number} status []
   * @return {Promise}        []
   */_class.prototype.
  displayError = function displayError(status) {var _this2 = this;

    //hide error message on production env
    if (think.env === 'production') {
      this.http.error = null;}


    var errorConfig = this.config('error');
    var message = this.http.error && this.http.error.message || '';
    if (this.isJsonp()) {var _jsonp;
      return this.jsonp((_jsonp = {}, _jsonp[
      errorConfig.key] = status, _jsonp[
      errorConfig.msg] = message, _jsonp));} else 

    if (this.isAjax()) {
      return this.fail(status, message);}


    var module = 'common';
    if (think.mode !== think.mode_module) {
      module = this.config('default_module');}

    var file = module + '/error/' + status + '.html';
    var options = this.config('tpl');
    options = think.extend({}, options, { type: 'base', file_depr: '_' });
    this.fetch(file, {}, options).then(function (content) {
      content = content.replace('ERROR_MESSAGE', message);
      _this2.type(options.content_type);
      _this2.end(content);});};


  /**
   * Bad Request 
   * @return {Promise} []
   */_class.prototype.
  _400Action = function _400Action() {
    return this.displayError(400);};

  /**
   * Forbidden 
   * @return {Promise} []
   */_class.prototype.
  _403Action = function _403Action() {
    return this.displayError(403);};

  /**
   * Not Found 
   * @return {Promise}      []
   */_class.prototype.
  _404Action = function _404Action() {
    return this.displayError(404);};

  /**
   * Internal Server Error
   * @return {Promise}      []
   */_class.prototype.
  _500Action = function _500Action() {
    return this.displayError(500);};

  /**
   * Service Unavailable
   * @return {Promise}      []
   */_class.prototype.
  _503Action = function _503Action() {
    return this.displayError(503);};return _class;}(think.controller.base);exports.default = _class;