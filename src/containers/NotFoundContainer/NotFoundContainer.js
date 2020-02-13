import React from '../../../modules/React/index.js';

class NotFoundContainer extends React.Component {
    render() {
        return React.createElement(
            'h2',
            { class: 'container text-center' },
            `Error 404 : Not Found (url : ${window.location.pathname})`,
        );
    }
}

export default NotFoundContainer;
