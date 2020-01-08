import { createElement } from './Core.js';

let nextUnitOfWork = null;

/**
 * Render elment
 * @param {object} element
 * @param {HTMLElement} container
 */
function render(element, container) {
    const dom =
        element.type === 'TEXT_ELEMENT'
            ? document.createTextNode(element.props.nodeValue)
            : document.createElement(element.type);

    Object.keys(element.props).forEach(name => {
        if (name !== 'children') {
            dom[name] = element.props[name];
        }
    });

    element.props.children.forEach(child => {
        render(child, dom);
    });

    container.appendChild(dom);
}

/**
 *
 * @param {IdleDeadline} deadline
 */
function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }
    requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

/**
 *
 * @param {object} nextUnitOfWork
 * @returns {object|null}
 */
function performUnitOfWork(nextUnitOfWork) {
    console.log('nextUnitOfWork => ', nextUnitOfWork);
    return null;
}

export { render };
