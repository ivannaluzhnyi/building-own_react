import React from '../modules/mini-react/index.js';

import Main from './Main.js';

// const div = React.createElement(
//     'div',
//     { className: 'test-class' },

//     React.createElement('span', null, 'testing'),
//     React.createElement('span', null, 'lol'),
// );

// const App = React.createElement(
//     'div',
//     { id: 'foo' },
//     React.createElement('h1', null, 'Test de create elemnt'),
//     React.createElement('a', null, 'Test de span'),
//     div,
//     Main,
// );

const prepareProps = {
    users: [
        {
            id: 1,
            email: 'test@react.com',
        },
        {
            id: 2,
            email: 'help@react.com',
        },
    ],
};

const FunctionComponent = props => {
    console.log('props ====> ', props); // find users in props :)
    return React.createElement(
        'div',
        null,
        React.createElement('h1', null, 'Test functional compoennt'),
    );
};

console.log('index src  typeof=> ', Main);

const AppComponent = React.createElement(FunctionComponent, prepareProps, null);

React.render(AppComponent, document.getElementById('root'));
