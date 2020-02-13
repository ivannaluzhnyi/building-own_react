import EventContainer from './containers/EventContainer/EventContainer.js';
import HomeContainer from './containers/HomeContainer/HomeContainer.js';
import Route from '../modules/react-router/Route.js';

export default [
    new Route('Home', '/', '', HomeContainer, true),
    new Route('Événement', '/events', '', EventContainer, true),
];

// export default [
//     {
//         href: 'events',
//         title: 'Événement',
//         components: EventContainer,
//     },
//     {
//         href: '#!',
//         title: 'Components',
//     },
// ];
