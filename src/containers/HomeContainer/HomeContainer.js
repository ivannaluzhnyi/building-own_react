import React from '../../../modules/React/index.js';

class HomeContainer extends React.Component {
    render() {
        return React.createElement(
            'div',
            { className: 'home-container' },

            React.createElement('h3', {}, 'Home Page'),
        );
    }
}

export default HomeContainer;
