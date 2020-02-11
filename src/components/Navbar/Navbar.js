import React from '../../../modules/React/index.js';
import PropTypes from '../../../modules/PropTypes/PropTypes.js';

import routes from '../../routes.js';
import { Router } from '../../../modules/react-router/index.js';

const generatedRouts = Router.generate(routes);

const LiElemnt = ({ title, href, handleSetPage }) =>
    React.createElement(
        'li',
        null,

        // React.createElement(Link, {
        //     to: href,
        //     title,
        // }),

        React.createElement(
            'a',
            { href, onClick: () => handleSetPage(href) },
            title,
        ),
    );

const Navbar = ({ handleSetPage }) => {
    return React.createElement(
        'nav',
        {},
        React.createElement(
            'div',
            {
                className: 'nav-wrapper',
            },

            React.createElement(
                'a',
                { href: '#!', className: 'brand-logo' },
                'Logo',
            ),

            React.createElement(
                'ul',
                {
                    className: 'right hide-on-med-and-down',
                },

                ...generatedRouts.map(el =>
                    React.createElement(
                        LiElemnt,
                        { ...el, handleSetPage },
                        null,
                    ),
                ),
            ),
        ),
    );
};

export default Navbar;

LiElemnt.propTypes = {
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
};

LiElemnt.props = ({ title, href }) => ({
    title,
    href,
});
