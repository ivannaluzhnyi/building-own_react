/* eslint-disable new-cap */
// eslint-disable-next-line camelcase
import { isStateLessComponent, type_check_v1 } from './react-utils.js';

export function render(element, domElement) {
    const el = new element();
    let prevChild = el.display();

    el.componentDidUpdate = () => {
        const child = el.display();
        domElement.replaceChild(child, prevChild);
        prevChild = child;
    };
    domElement.appendChild(prevChild);
}

// Paramètres du reste, permet de représenter un nombre indéfini d'arguments sous forme d'un tableau
export const createElement = (element, properties, ...children) => {
    console.log('element => ', element.isClass());
    if (element.isClass()) {
        const component = new element(properties);
        return component.render();
    }

    if (isStateLessComponent(element)) {
        return element(properties);
    }

    const newElement = document.createElement(element);
    children.forEach(child => {
        if (type_check_v1(child, 'object')) {
            newElement.appendChild(child);
        } else {
            newElement.textContent += child;
        }
    });
    if (properties !== null) {
        Object.keys(properties).forEach(propertyName => {
            console.log('propertyName => ', propertyName);
            console.log('properties => ', properties);
            if (/^on.*$/.test(propertyName)) {
                newElement.addEventListener(
                    propertyName.substring(2).toLowerCase(),
                    properties[propertyName],
                );
            } else if (propertyName === 'className')
                newElement.setAttribute('class', properties[propertyName]);
            else
                newElement.setAttribute(propertyName, properties[propertyName]);
        });
    }
    return newElement;
};
