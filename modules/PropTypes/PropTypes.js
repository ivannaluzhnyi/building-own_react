import { type_check_v1 } from '../React/react-utils.js';

function withProps(props) {
    return {
        type: 'object',
        ...props,
    };
}

const renderProp = type => {
    if (type === 'object') {
        return {
            type,
            isRequired: {
                type,
                isRequired: true,
                withProps: props =>
                    withProps({ properties: props, isRequired: true }),
            },
            withProps: props => withProps({ properties: props }),
        };
    }

    return {
        type,
        isRequired: { type, isRequired: true },
    };
};

function checkPropTypes(propTypes, properties, componentName = '') {
    const erros = [];
    Object.keys(propTypes).forEach(el => {
        const { type, isRequired } = propTypes[el];
        const recivedValue = properties[el];

        if (typeof isRequired === 'boolean' && isRequired && !recivedValue) {
            erros.push(
                new Error(
                    `${componentName} => Error of properites: ${el} not defined`,
                ),
            );
        }

        if (recivedValue) {
            if (
                typeof recivedValue === 'object' &&
                propTypes[el].properties !== undefined
            ) {
                checkPropTypes(propTypes[el].properties, recivedValue);
            }

            if (!type_check_v1(recivedValue, type)) {
                erros.push(
                    new Error(
                        `${componentName} => Error of properites: ${el}(${recivedValue}) is not a ${type}`,
                    ),
                );
            }
        }
    });

    erros.forEach(err => {
        throw err;
        // console.error(err);
    });
}

const PropTypes = Object.freeze({
    string: renderProp('string'),
    array: renderProp('array'),
    bool: renderProp('boolean'),
    func: renderProp('function'),
    number: renderProp('number'),
    object: renderProp('object'),
    checkPropTypes,
});

export default PropTypes;

// ex
// const myPropTypes = {
//     // name: PropTypes.string,
//     // age: PropTypes.number.isRequired,
//     log: PropTypes.object.isRequired.withProps({
//         title: PropTypes.string,
//         age: PropTypes.number.isRequired,
//     }),
//     user: PropTypes.object.isRequired.withProps({
//         title: PropTypes.string,
//     }),
// };
// const props = {
//     test: 1124, // not valid
//     log: {
//         title: 'testTiel',
//         age: 128, // not valid
//     },
// };
// PropTypes.checkPropTypes(myPropTypes, props);
