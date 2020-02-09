import { type_check_v1 } from '../React/react-utils.js';

export default function(...args) {
    return args
        .map(element => {
            if (type_check_v1(element, 'object')) {
                let sendString = '';

                Object.keys(element).forEach(propName => {
                    if (element[propName]) {
                        sendString = sendString.concat(
                            sendString === '' ? propName : ` ${propName}`,
                        );
                    }
                });

                return sendString;
            }

            if (type_check_v1(element, 'string')) {
                return element;
            }

            return '';
        })
        .join(' ');
}
