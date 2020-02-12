import React from '../modules/React/index.js';

import Main from './Main.js';

React.render(React.createElement(Main, {}), document.getElementById('root'));

new Promise(function(resolve, reject) {
    const contentElement = document.getElementById('root');

    if (contentElement) {
        resolve('Root element found !  React can work ! Yay !');
    } else reject(Error("No  ontent element found... MiniReact won't work :( Please use Google Chrome !"));
})
    .then(result => {
        console.log('SUCCESS => ', result);
    })
    .catch(err => console.error(err));

// import BrowserRouter from '../modules/react-router/new/BrowserRouter.js';

// const test = React.createElement(BrowserRouter, { children: Main });

// React.render(
//     // React.createElement(Main, {}),
//     React.createElement(BrowserRouter, { children: Main }),

//     document.getElementById('root'),
// );
