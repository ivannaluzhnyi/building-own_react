import apiCall from '../../modules/api-service/api-service.js';
import config from './config.js';

async function searchUpcomingEventsByArtistName(artistName) {
    const { API_KEY, API_URL } = config;
    const url = `${API_URL}events.json?artist_name=${artistName}&apikey=${API_KEY}`;
    return apiCall({ method: 'GET', url });
}

async function searchEventsByLocationClient(per_page) {
    const { API_KEY, API_URL } = config;

    if (navigator.geolocation) {
        // Call getCurrentPosition with success and failure callbacks
        navigator.geolocation.getCurrentPosition(
            props => {
                const { longitude, latitude } = props.coords;
                console.log('longitude => ', longitude);
                console.log('latitude => ', latitude);

                const url = `${API_URL}events.json?location=geo:${latitude},${longitude}&per_page=${per_page}&apikey=${API_KEY}`;

                const testcall = apiCall({ method: 'GET', url });

                console.log('testcall => ', testcall);
                return Promise.resolve(testcall);
            },
            () => console.log('err geolocation'),
        );
    }

    console.warn('Need geolocation');
}

export { searchUpcomingEventsByArtistName, searchEventsByLocationClient };
