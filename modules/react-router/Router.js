class Router {
    constructor(name, routes) {
        this.name = name;
        this.routes = routes;
    }

    getName = () => {
        return this.name;
    };

    getRoutes = () => {
        return this.routes;
    };

    static generate = arr => {
        return arr.map(route => ({
            href: route.getPath(),
            title: route.getTitle(),
            className: route.getClassName(),
        }));
    };

    render() {}
}

export default Router;
