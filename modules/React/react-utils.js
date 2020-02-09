/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable no-extend-native */
// Snake case ;)
String.prototype.snake_case = function() {
    const input = this;
    return input
        .toLowerCase()
        .split(' ')
        .join('_');
};

// Prototype check if class
export const isClass = fn =>
    typeof fn === 'function' && /^\s*class/.test(fn.toString());

// Si c'est pas une class ou une fonction
export function isStateLessComponent(element) {
    return !isClass(element) && typeof element === 'function';
}

/**
 *
 * @param {Array<string>} arr
 * @param {class} cl
 */
export function checkIfClassExist(arr, cl) {
    return arr.find(el => el === cl.getClassName()) !== undefined;
}

// TypeCheck v1
export function type_check_v1(data, type) {
    switch (typeof data) {
        case 'number':
        case 'string':
        case 'boolean':
        case 'undefined':
        case 'function':
            return type === typeof data;
        case 'object':
            switch (type) {
                case 'null':
                    return data === null;
                case 'array':
                    return Array.isArray(data);
                default:
                    return data !== null && !Array.isArray(data);
            }
        default:
            return false;
    }
}

// TypeCheck v2
function type_check_v2(data, conf) {
    for (const key of Object.keys(conf)) {
        switch (key) {
            case 'type':
                if (!type_check_v1(data, conf[key])) return false;
                break;
            case 'value':
                if (JSON.stringify(data) !== JSON.stringify(conf[key]))
                    return false;
                break;
            case 'enum':
                let valid = false;
                for (const value of conf[key]) {
                    valid = type_check_v2(data, { value });
                    if (valid) break;
                }
                if (!valid) return false;
                break;

            default:
                return false;
        }
    }

    return true;
}

// TypeCheck final version
export function type_check(data, conf) {
    for (const key of Object.keys(conf)) {
        switch (key) {
            case 'type':
            case 'value':
            case 'enum':
                const newConf = {};
                newConf[key] = conf[key];
                if (!type_check_v2(data, newConf))
                    throw new Error('Type properties error');
                break;
            case 'properties':
                for (const prop of Object.keys(conf[key])) {
                    if (data[prop] === undefined)
                        throw new Error('Type properties error');
                    if (!type_check(data[prop], conf[key][prop]))
                        throw new Error('Type properties error');
                }
                break;

            default:
                return false;
        }
    }

    return true;
}

// PropAccess
export function prop_access(object, path) {
    const logErr = console.log(`${path} not exist`);
    if (object === null || object === undefined) return logErr;
    return path === null || path === '' || path === undefined
        ? object
        : path.split('.').reduce((acc, curr) => {
              if (acc === undefined) return object[curr];
              return acc[curr] ? acc[curr] : logErr;
          }, undefined);
}
