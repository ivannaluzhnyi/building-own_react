import React from '../../../modules/React/index.js';

import { searchEventsByLocationClient } from '../../apis/event.js';

class EventContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // events: [],
        };
    }

    componentDidMount = () => {
        // console.log('navigator.geolocation => ', navigator.geolocation);

        searchEventsByLocationClient(10)
            .then(res => res.json())
            .then(json => console.log('============ > json myyy > ', json));

        searchEventsByLocationClient(10).then(json =>
            console.log('================> myyy > ', json),
        );

        // const res = await searchEventsByLocationClient(10);

        // console.log('res componentDidMount => ', res);
    };

    render() {
        return React.createElement(
            'div',
            { className: 'event-container' },

            React.createElement(
                'section',
                {},

                React.createElement('h3', {}, 'Upcoming events'),
            ),
        );
    }
}

export default EventContainer;
