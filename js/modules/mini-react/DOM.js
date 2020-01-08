/**
 * Render elment
 * @param {object} element
 * @param {HTMLElement} container
 */
function render(element, container) {
    // wipRoot = {
    //     dom: container,
    //     props: {
    //         children: [element],
    //     },
    //     alternate: currentRoot,
    // };
    // deletions = [];
    // nextUnitOfWork = wipRoot;

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

export { render };
