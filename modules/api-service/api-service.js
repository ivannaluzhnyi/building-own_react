async function apiCall({ method, url, data }) {
    const init = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data !== undefined) {
        init.body = JSON.stringify(data);
    }

    return fetch(url, { ...init });
}

export default apiCall;
