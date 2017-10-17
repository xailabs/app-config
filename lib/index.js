'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveProperties = exports.loadConfigFile = exports.getConfig = undefined;

var _getConfig2 = require('./getConfig');

var _getConfig3 = _interopRequireDefault(_getConfig2);

var _loadConfigFile2 = require('./loadConfigFile');

var _loadConfigFile3 = _interopRequireDefault(_loadConfigFile2);

var _resolveProperties2 = require('./resolveProperties');

var _resolveProperties3 = _interopRequireDefault(_resolveProperties2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getConfig = _getConfig3.default;
exports.loadConfigFile = _loadConfigFile3.default;
exports.resolveProperties = _resolveProperties3.default;