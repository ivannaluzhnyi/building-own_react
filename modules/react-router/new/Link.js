import React from '../../React/index.js';
import PropTypes from '../../PropTypes/PropTypes.js';

class Link extends React.Component {
    constructor(props) {
        super(props);

        this.propTypes = {
            title: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
            className: PropTypes.string,
        };
    }

    clickHandler = e => {
        e.preventDefault();
        // this.context.history.push(this.props.to);
    };

    render() {
        const { to, className, title } = this.props;
        return React.createElement(
            'a',
            { href: `${to}`, className, onClick: this.clickHandler },
            title,
        );
    }
}

export default Link;
