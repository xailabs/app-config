import path from 'path';
import fs from 'fs';

/**
 * Loads JSON configuration from a file on the filesystem.
 * Returns the parsed data as a plain object.
 * Adds a `__file` property with the full path to the loaded file to the result.
 *
 * @param {string} file - Absolute path to the file, including filename and extension
 * @return {object} - An object containing the json data or `undefined` if something went wrong
 */
export default function loadConfigFile(file) {
    let runtimeConfig = undefined;
    const filePath = file && path.resolve(file);

    if (filePath && fs.existsSync(filePath)) {
        try {
            runtimeConfig = Object.assign({}, {
                ...JSON.parse(fs.readFileSync(filePath)),
                __file: filePath
            });
        } catch (error) {
            console.warn('[loadConfigFile] Failed to load runtime config', error);
        }
    } else {
        console.warn('[loadConfigFile] File not found', {filePath});
    }
    return runtimeConfig;
}
