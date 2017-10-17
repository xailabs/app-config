'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getConfig;

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _resolveProperties = require('./resolveProperties');

var _resolveProperties2 = _interopRequireDefault(_resolveProperties);

var _loadConfigFile = require('./loadConfigFile');

var _loadConfigFile2 = _interopRequireDefault(_loadConfigFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides a configuration object based on a given config object and a json file loaded from the filesystem.
 *
 * @param {object} baseConfig - The default configuration before runtime config values are added.
 * @param {object} [options] - An object with additional options
 * @param {string} [options.file] - Absolute path to a json file that will be loaded at runtime.
 * @param {boolean} [options.freeze=false] - Whether to freeze the returned config (and make it read-only)
 * @param {string|array} [options.resolve=[]] - One or more special keys to resolve. 
 * @return {object} A read-only object containing all resolved values from `baseConfig` and `
 *
 * @see https://github.com/electron/electron/blob/master/docs/api/app.md#appgetpathname
 * @see {@link resolveProperties}
 *
 * @example
 * // config.js
 * import { getConfig } from '@xailabs/electron-config';
 * import myConfig from './myConfig.js';
 * import {app} from 'electron';
 *
 * export default getConfig(myConfig, {
 *     file: `${app.getPath('appData')/my-config.json`
 * });
 *
 */
function getConfig(baseConfig) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        file = _ref.file,
        _ref$freeze = _ref.freeze,
        freeze = _ref$freeze === undefined ? false : _ref$freeze,
        _ref$resolve = _ref.resolve,
        resolve = _ref$resolve === undefined ? [] : _ref$resolve;

    var runtimeConfig = (0, _loadConfigFile2.default)(file) || {};
    var mergedConfig = (0, _lodash2.default)({}, baseConfig, runtimeConfig);
    var parsedConfig = (0, _resolveProperties2.default)(mergedConfig, resolve);
    if (freeze) {
        return (0, _deepFreeze2.default)(parsedConfig);
    } else {
        return parsedConfig;
    }
}