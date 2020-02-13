/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
import React from '../React/index.js';

import NotFoundContainer from '../../src/containers/NotFoundContainer/NotFoundContainer.js';

let path;
let globalRoutes;

class Router extends React.Component {
    static generate = arr => {
        return arr.map(route => ({
            href: route.getPath(),
            title: route.getTitle(),
            className: route.getClassName(),
        }));
    };

    static getPath = () => {
        return path;
    };

    constructor(props) {
        super(props);
        // this.routes = routesProp;
        globalRoutes = props.routes;
        // this.debug = debug;

        path = window.location.hash === '' ? '/' : window.location.hash;

        const { routes } = this.props;
        this.state = {
            routes,
        };
    }

    saveHistory = route => {
        const item = localStorage.getItem('router_history');
        if (item !== undefined && item !== null) {
            localStorage.setItem(
                'router_history',
                JSON.stringify([...JSON.parse(item), route]),
            );
        } else {
            localStorage.setItem('router_history', JSON.stringify([route]));
        }
    };

    render() {
        const { routes } = this.state;

        const findRoute =
            routes.find(route => route.getPath() === path) ||
            routes.find(route => route.getPath() === '#/');

        this.saveHistory(findRoute);

        if (findRoute !== undefined) {
            return React.createElement(findRoute.getComponent(), {});
        }
        return React.createElement(NotFoundContainer, {});
    }
}

export default Router;
