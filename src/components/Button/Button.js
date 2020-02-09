import React from '../../../modules/React/index.js';
import PropTypes from '../../../modules/PropTypes/PropTypes.js';
import cs from '../../../modules/classnames/classnames.js';

const Button = ({ type, title, small, large, disabled, onClick }) => {
    const isSubmit = type === 'submit';
    return React.createElement(
        'button',
        {
            type: type !== undefined ? type : 'button',
            className: cs('waves-effect waves-light ', {
                btn: !small && !large,
                'btn-small': small && !large,
                'btn-large': large && !small,
                disabled,
            }),
            onClick,
        },
        title,
        isSubmit
            ? React.createElement(
                  'i',
                  { className: 'material-icons right' },
                  'send',
              )
            : '',
    );
};

export default Button;

Button.propTypes = {
    type: PropTypes.string,
    small: PropTypes.bool,
    large: PropTypes.bool,
    disabled: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};
