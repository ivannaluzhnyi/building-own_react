class Route {
    constructor(title, path, className, component, exact) {
        this.title = title;
        this.path = `#${path}`;
        this.className = className;
        this.component = component;
        this.exact = exact;
    }

    getTitle = () => {
        return this.title;
    };

    getPath = () => {
        return this.path;
    };

    getClassName = () => {
        return this.className;
    };

    getPath = () => {
        return this.path;
    };

    getComponent = () => {
        return this.component;
    };
}

export default Route;
