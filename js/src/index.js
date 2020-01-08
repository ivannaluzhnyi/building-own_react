import React from '../modules/mini-react/index.js';

const test = React.createElement(
    'div',
    { id: 'foo' },
    React.createElement('h1', null, 'Test de create elemnt'),
    React.createElement('span', null, 'Test de span'),
);
console.log('test ===> ', test);

React.render(test, document.getElementById('root'));
