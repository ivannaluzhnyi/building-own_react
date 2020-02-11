import React from '../React/index.js';

import NotFoundContainer from '../../src/containers/NotFoundContainer/NotFoundContainer.js';

let path;
// let routes;

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
        // routes = routesProp;
        // this.debug = debug;

        path = window.location.hash === '' ? '/' : window.location.hash;

        // console.log('window.location.pathname => ', window.location);
        // console.log('this.path=> ', path);
        const { routes } = this.props;
        this.state = {
            routes,
        };
    }

    // static updatePath = () => {
    //     path = window.location.hash === '' ? '/' : window.location.hash;

    //     console.log('this.path=> ', path);

    //     const findRoute =
    //         routes.find(route => route.getPath() === path) ||
    //         routes.find(route => route.getPath() === '#/');

    //     const elm = findRoute.getComponent();

    //     console.log('elm => ', elm);
    //     const component = new elm();

    //     setTimeout(() => {
    //         const vnode = component.render(); // Lorsque l'état change, restituez la méthode de rendu du composant
    //         const olddom = getDOM(component);

    //         console.log('olddom => ', olddom);

    //         render(vnode, olddom.parentNode, component, olddom);
    //     }, 0);

    //     // Router.render();
    // };

    // static render() {
    //     console.log('render');
    //     console.log('routes => ', routes);

    //     const findRoute =
    //         routes.find(route => route.getPath() === path) ||
    //         routes.find(route => route.getPath() === '#/');

    //     console.log('findRout => ', findRoute);

    //     if (findRoute !== undefined) {
    //         return React.createElement(findRoute.getComponent(), {});
    //     }

    //     return null;
    // }

    // display = () => {
    //     return this.routes.map(route => {
    //         if (path === route.getPath()) {
    //             return React.createElement(route.getComponent(), {});
    //         }

    //         return React.createElement('p', {});
    //     });
    // };

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
