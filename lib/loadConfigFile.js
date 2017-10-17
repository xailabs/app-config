'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = loadConfigFile;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Loads JSON configuration from a file on the filesystem.
 * Returns the parsed data as a plain object.
 * Adds a `__file` property with the full path to the loaded file to the result.
 *
 * @param {string} file - Absolute path to the file, including filename and extension
 * @return {object} - An object containing the json data or `undefined` if something went wrong
 */
function loadConfigFile(file) {
    var runtimeConfig = undefined;
    var filePath = file && _path2.default.resolve(file);

    if (filePath && _fs2.default.existsSync(filePath)) {
        try {
            runtimeConfig = Object.assign({}, _extends({}, JSON.parse(_fs2.default.readFileSync(filePath)), {
                __file: filePath
            }));
        } catch (error) {
            console.warn('[loadConfigFile] Failed to load runtime config', error);
        }
    } else {
        console.warn('[loadConfigFile] File not found', { filePath: filePath });
    }
    return runtimeConfig;
}