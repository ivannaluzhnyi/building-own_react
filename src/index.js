import React from '../modules/React/index.js';

import Main from './Main.js';

React.render(React.createElement(Main, {}), document.getElementById('root'));

// import BrowserRouter from '../modules/react-router/new/BrowserRouter.js';

// const test = React.createElement(BrowserRouter, { children: Main });

// React.render(
//     // React.createElement(Main, {}),
//     React.createElement(BrowserRouter, { children: Main }),

//     document.getElementById('root'),
// );
