const globalHistory = window.history;

function createBrowserHistory() {
    const listeners = [];

    const push = function(pathname) {
        globalHistory.pushState({}, '', pathname);
        notifyListeners(pathname);
    };

    const listen = function(listener) {
        listeners.push(listener);
    };

    const notifyListeners = (...args) => {
        listeners.forEach(listener => listener(...args));
    };

    window.onpopstate = function() {
        notifyListeners(window.location.pathname);
    };

    return {
        listeners,
        listen,
        push,
    };
}

export default createBrowserHistory;
