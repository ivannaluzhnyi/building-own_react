/**
 *
 * @param {string} text
 */
function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: [],
        },
    };
}

/**
 *
 * @param {string} type
 * @param {object} props
 * @param  {...object|string} children
 */
function createElement(type, props, ...children) {
    console.log('CORE | type  => ', type);
    console.log('CORE | typeof  => ', typeof type);
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === 'object' ? child : createTextElement(child),
            ),
        },
    };
}

export { createTextElement, createElement };
