import React from '../../../modules/React/index.js';
import { getFormattedDate } from '../../utils/helper.js';
import PropTypes from '../../../modules/PropTypes/PropTypes.js';

const renderDate = obj =>
    obj
        ? ` ${obj.date !== undefined ? getFormattedDate(obj.date) : ''} ${
              obj.time !== null ? obj.time : ''
          }`
        : 'pas de date!';

const ArtistElmentHead = () =>
    React.createElement(
        'div',
        { className: 'card-tabs' },

        React.createElement(
            'ul',
            { className: 'tabs ' },
            React.createElement(
                'li',
                { className: 'tab' },

                React.createElement('a', {}, 'Artists'),
            ),
        ),
    );

const ArtistElment = ({ artists }) => {
    return React.createElement(
        'div',
        {
            className: 'card-content card-content-artist blue-grey lighten-1',
        },

        ...artists.map(artist =>
            React.createElement(
                'div',
                {},

                React.createElement(
                    'p',
                    {},

                    React.createElement(
                        'a',
                        { href: artist.artist.uri, target: '_blank' },
                        artist.displayName,
                    ),
                ),
            ),
        ),
    );
};

const EventDate = ({ start, end }) =>
    React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
            'p',
            { className: 'col 6' },
            `Debut: ${renderDate(start)} `,
        ),

        React.createElement(
            'p',
            { className: 'col 6' },
            `Fin: ${renderDate(end)} `,
        ),
    );

const EventMapItem = ({ event }) => {
    // console.log('event => ', event);

    const {
        uri,
        type,
        displayName,
        start,
        end,
        performance,
        location,
        venue,
    } = event;

    return React.createElement(
        'div',
        { className: 'col s12 m4' },

        React.createElement(
            'div',
            { className: 'card blue-grey darken-1' },

            // CARD CONTENT
            React.createElement(
                'div',
                { className: 'card-content white-text' },

                // CARD TITLE
                React.createElement(
                    'span',
                    { className: 'card-title' },
                    React.createElement('b', {}, displayName),
                ),

                React.createElement('p', {}, `Type: ${type}`),

                React.createElement(EventDate, { start, end }, null),

                React.createElement(
                    'p',
                    {},
                    `Lieu: ${location.city} - ${venue.displayName}`,
                ),

                React.createElement('br', {}, null),

                React.createElement(ArtistElmentHead, {}, null),
                React.createElement(
                    ArtistElment,
                    { artists: performance },
                    null,
                ),
            ),
            React.createElement(
                'div',
                { className: 'card-action' },

                React.createElement(
                    'a',
                    { href: uri, target: '_blank' },
                    'Voir sur Songkick >',
                ),
            ),
        ),
    );
};

export default EventMapItem;

EventMapItem.propType = {
    event: PropTypes.object.isRequired,
};
