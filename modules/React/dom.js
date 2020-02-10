/* eslint-disable new-cap */
import { type_check_v1 } from './react-utils.js';

/**
 *
 * @param {*} element
 * @param {*} domElement
 */
export function render(element, domElement) {
    const el = new element();

    let prevChild = el.display();

    console.log('el => ', el);
    el.componentDidUpdate = () => {
        const child = el.display();
        console.log('child => ', child);
        domElement.replaceChild(child, prevChild);
        prevChild = child;
    };

    domElement.appendChild(prevChild);
}

/**
 *
 * @param {HTMLElement} domElementElement
 * @param {string} propertyName
 * @param {string} value
 */
export function setAttribute(domElement, propertyName, value) {
    if (propertyName === 'className') propertyName = 'class';

    if (/on\w+/.test(propertyName))
        domElement.addEventListener(
            propertyName.substring(2).toLowerCase(),
            value,
        );

    if (propertyName === 'style') {
        if (!value || typeof value === 'string')
            domElement.style.cssText = value || '';

        if (value && typeof value === 'object') {
            Object.keys(value).forEach(elm => {
                domElement.style[elm] = type_check_v1(value[elm], 'number')
                    ? `${value[elm]}px`
                    : value[elm];
            });
        }
    } else {
        if (propertyName in domElement) domElement[propertyName] = value || '';

        if (value) domElement.setAttribute(propertyName, value);
        else domElement.removeAttribute(propertyName, value);
    }
}
