import { type_check_v1 } from './react-utils.js';

export default function createElement(comp, properities, ...args) {
    let children = [];

    args.forEach(child => {
        if (type_check_v1(child, 'array')) children = children.concat(child);
        else children.push(child);
    });

    return {
        element: comp,
        properities: properities || {},
        children,
    };
}
