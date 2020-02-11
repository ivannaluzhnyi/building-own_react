/* eslint-disable new-cap */
import { type_check_v1 } from './react-utils.js';

// let rootDOMElement;
// let rootReactElement;

let calledComponentDidMount = false;

export function render(element, domElement) {
    const el = new element();

    if (el.componentDidMount && !calledComponentDidMount) {
        el.componentDidMount();
        calledComponentDidMount = true;
    }

    let prevChild = el.display();

    // console.log('1 prevChild => ', prevChild);

    el.componentDidUpdate = () => {
        const child = el.display();

        // console.log('cheold => ', child);

        // console.log('dom 1 => ', domElement);
        domElement.replaceChild(child, prevChild);

        // console.log('dom 2 =>', domElement);

        prevChild = child;
    };

    // console.log('2 prevChild => ', prevChild);

    rootDOMElement = domElement;

    domElement.appendChild(prevChild);
}

// export function reRender(updatedElm) {
//     console.log('reRender rootDOMElement => ', rootDOMElement);
//     console.log('reRender updatedElm => ', updatedElm);

//     console.log('rootDOMElement.lastChild => ', rootDOMElement.lastChild);
//     while (rootDOMElement.hasChildNodes()) {
//         const t = rootDOMElement.removeChild(rootDOMElement.lastChild);

//         console.log('loop ===> ', t);
//     }

//     console.log('re renderin after remove  ', rootDOMElement);

//     render(rootReactElement, rootDOMElement);
// }

// export function render(el, domEl) {
//     rootReactElement = el;
//     console.log('TCL: rootReactElement', rootReactElement);
//     rootDOMElement = domEl;
//     console.log('TCL: rootDOMElement', rootDOMElement);

//     console.log('rootReactElement => ', rootReactElement);

//     // const currentDOM = rootReactElement.render();
//     // console.log('TCL: rootReactElement.render()', rootReactElement.render());
//     rootDOMElement.appendChild(rootReactElement);
// }

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
