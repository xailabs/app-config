import deepFreeze from 'deep-freeze';
import resolveProperties from './resolveProperties';
import loadConfigFile from './loadConfigFile';

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
export default function getConfig(baseConfig, { file, freeze = false, resolve = [] } = {}) {
    const runtimeConfig = loadConfigFile(file) || {};
    const mergedConfig = Object.assign({}, baseConfig, runtimeConfig);
    const parsedConfig = resolveProperties(mergedConfig, resolve);
    if (freeze) {
        return deepFreeze(parsedConfig);
    } else {
        return parsedConfig;
    }
}
