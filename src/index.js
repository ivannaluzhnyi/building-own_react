import React from '../modules/mini-react/index.js';

import Main from './Main.js';

const div = React.createElement(
    'div',
    { className: 'test-class' },

    React.createElement('span', null, 'testing'),
    React.createElement('span', null, 'lol'),
);

const App = React.createElement(
    'div',
    { id: 'foo' },
    React.createElement('h1', null, 'Test de create elemnt'),
    React.createElement('a', null, 'Test de span'),
    div,
    Main,
);

React.render(App, document.getElementById('root'));
