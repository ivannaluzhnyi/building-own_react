import React from '../React/index.js';
import PropTypes from '../PropTypes/PropTypes.js';

import Router from './Router.js';

const Link = ({ to, title, className }) => {
    console.log('link => ', Router.getPath());
    return React.createElement(
        'a',
        { href: `${to}`, className, onClick: () => Router.updatePath() },
        title,
    );
};

Link.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
};

Link.props = ({ title, to, className }) => ({
    title,
    to,
    className,
});

export default Link;
