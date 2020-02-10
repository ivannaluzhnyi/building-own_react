async function apiCall({ method, url, synchronousRequest }) {
    const xhttp = new XMLHttpRequest();

    // console.log(`FO Request: /${url} `);
    xhttp.onreadystatechange = function() {
        if (this.status === 200) {
            console.log('XMLHttpRequest => ', JSON.parse(xhttp.responseText));
            return JSON.parse(xhttp.responseText);
        }

        return {
            error: 'Une erreur',
        };
    };
    xhttp.open(method, url, synchronousRequest);
    xhttp.send();
}

export default apiCall;
