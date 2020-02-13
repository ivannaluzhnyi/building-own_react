import React from '../../../modules/React/index.js';

const Footer = () => {
    return React.createElement(
        'footer',
        { className: 'page-footer' },

        React.createElement(
            'div',
            { className: 'footer-copyright' },
            React.createElement(
                'div',
                { className: 'container' },

                '© 2020 Copyright Text',
            ),
        ),
    );
};

export default Footer;
