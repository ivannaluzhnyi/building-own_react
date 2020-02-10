const pad = s => {
    return s < 10 ? `0${s}` : s;
};

const getFormattedDate = date => {
    const d = new Date(date);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
};

/**
 *
 * @param {?string} value
 * @returns {boolean}
 */
const isValidEmail = value => {
    if (value === undefined) {
        return false;
    }
    const regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(value).toLowerCase());
};

const isEmpty = arr => arr && Array.isArray(arr) && arr.length === 0;

export { getFormattedDate, isValidEmail, isEmpty };
