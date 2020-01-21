const fakeWindow = {};

function getWindow() {
    try {
        return window;
    } catch (e) {
        try {
            return global;
        } catch (er) {
            return fakeWindow;
        }
    }
}

function toWarnDev(msg, deprecated) {
    msg = deprecated ? `${msg} is deprecated` : msg;
    const process = getWindow().process;
    if (process && process.env.NODE_ENV === 'development') {
        throw msg;
    }
}

export { toWarnDev, getWindow };
