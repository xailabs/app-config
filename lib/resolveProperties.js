"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = resolveProperties;
/**
 * Resolves special non-primitive values in an object.
 *
 * Parses the object recursively and returns a new object where all values
 * that contained a property matching the provided `property` are resolved to the actual value of that property.
 *
 * For example, `{foo: {development: 'foo', production: 'bar'}}` will result in `{foo: 'foo'}` when called with property=`development`,
 * but it will result in `{foo: 'bar'}` when called with property=`production`.
 *
 * @param {object} target - The target object.
 * @param {string|array} property - The name of the property to resolve the value from. Can be array of multiple properties.
 * @returns {Object} - A new object with all values of target, but with resolved values
 */
function resolveProperties(target, property) {
    if (Array.isArray(property)) {
        return property.reduce(function (result, prop) {
            return resolveProperties(result, prop);
        }, target);
    }
    if (Object(target) !== target) {
        // primitive
        return target;
    }
    return Object.keys(target).reduce(function (result, key) {
        var value = target[key];
        if (value && value.hasOwnProperty(property)) {
            result[key] = resolveProperties(value[property], property);
        } else {
            result[key] = resolveProperties(value, property);
        }
        return result;
    }, {});
}