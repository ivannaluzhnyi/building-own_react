import React from '../modules/mini-react/index.js';

const test = React.createElement(
    'div',
    { id: 'foo' },
    React.createElement('h1', null, 'Test de create elemnt'),
    React.createElement('span', null, 'Test de span'),
);

const reneder = React.render(test, document.getElementById('root'));

console.log('test ===> ', test);
console.log('reneder ===> ', reneder);
