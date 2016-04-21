'use strict';
/**
 * model
 */exports.__esModule = true;var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require("babel-runtime/helpers/inherits");var _inherits3 = _interopRequireDefault(_inherits2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_think$model$mongo) {(0, _inherits3.default)(_class, _think$model$mongo);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _think$model$mongo.apply(this, arguments));}_class.prototype.

    addUser = function addUser() {

        var ret = this.add({ 
            name: Date() });


        console.log(this.getModelName(), this.db());

        return ret;};_class.prototype.

    findUser = function findUser() {
        return this.select({ content: "sdf" });};return _class;}(think.model.mongo);exports.default = _class;