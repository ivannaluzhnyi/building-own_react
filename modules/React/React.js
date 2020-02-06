/* eslint-disable new-cap */
import { isStateLessComponent, type_check_v1, isClass } from './react-utils.js';
import { setAttribute } from './dom.js';

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

export const createElement = (element, properties, ...children) => {
    if (isClass(element)) {
        const component = new element(properties);

        if (!component.componentDidMountCalled) {
            component.componentDidMount();
        }
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

    if (properties !== null)
        Object.keys(properties).forEach(propertyName =>
            setAttribute(newElement, propertyName, properties[propertyName]),
        );

    return newElement;
};
