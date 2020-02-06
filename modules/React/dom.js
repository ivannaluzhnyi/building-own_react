import { type_check_v1 } from './react-utils.js';

/**
 *
 * @param {object} dom
 * @param {string} propertyName
 * @param {string} value
 */
export function setAttribute(dom, propertyName, value) {
    if (propertyName === 'className') propertyName = 'class';

    if (/on\w+/.test(propertyName)) {
        dom.addEventListener(propertyName.substring(2).toLowerCase(), value);
    }

    if (propertyName === 'style') {
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || '';
        }

        if (value && typeof value === 'object') {
            Object.keys(value).forEach(elm => {
                dom.style[elm] = type_check_v1(value[elm], 'number')
                    ? `${value[elm]}px`
                    : value[elm];
            });
        }
    } else {
        if (propertyName in dom) {
            dom[propertyName] = value || '';
        }
        if (value) dom.setAttribute(propertyName, value);
        else dom.removeAttribute(propertyName, value);
    }
}
