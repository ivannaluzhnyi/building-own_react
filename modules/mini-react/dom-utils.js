import { TEXT_ELEMENT } from './element.js';

const isListener = name => name.startsWith('on');
const isAttribute = name => !isListener(name) && name !== 'children';

function updateDomProperties(node, prevProps, nextProps) {
    // remove old attribute and eventListener
    Object.keys(prevProps).forEach(propName => {
        if (isListener(propName)) {
            const eventType = propName.toLowerCase().substring(2);
            node.removeEventListener(eventType, prevProps[propName]);
        }
        // eslint-disable-next-line no-prototype-builtins
        if (isAttribute(propName) && !nextProps.hasOwnProperty(propName)) {
            node[propName] = null;
        }
    });

    // update attribute and properties
    Object.keys(nextProps).forEach(propName => {
        if (isListener(propName)) {
            const eventType = propName.toLowerCase().substring(2);
            node.addEventListener(eventType, nextProps[propName]);
        }
        if (isAttribute(propName)) {
            node[propName] = nextProps[propName];
        }
    });
}

function createDomElement(element) {
    return element.type === TEXT_ELEMENT
        ? document.createTextNode(element.props.nodeValue)
        : document.createElement(element.type);
}

function appendChild(node, childNode) {
    node.appendChild(childNode);
}

function removeChild(node, childNode) {
    node.removeChild(childNode);
}

function replaceChild(newChildNode, oldChildNode) {
    const parentNode = oldChildNode.parentNode;
    parentNode.replaceChild(newChildNode, oldChildNode);
}

export {
    updateDomProperties,
    createDomElement,
    appendChild,
    removeChild,
    replaceChild,
};
