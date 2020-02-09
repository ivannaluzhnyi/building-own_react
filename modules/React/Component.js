export const ComponentLifecycle = Object.freeze({
    CREATE: 'CREATE',
    MOUNTED: 'MOUNTED',
});

class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
        this.prevState = null;
        this.prevRender = null;
    }

    getClassName = () => this.constructor.name;

    display = () => {
        if (this.shouldUpdate()) this.prevRender = this.render();
        return this.prevRender;
    };

    setState = newState => {
        this.state = { ...this.state, ...newState };
        this.prevState = { ...this.state };

        this.display();
        this.componentDidUpdate(this.prevState);
    };

    componentDidMount = () => {};

    componentDidUpdate = () => {};

    getState = () => {
        return this.state;
    };

    shouldUpdate = () => {
        return (
            JSON.stringify(this.props) !== JSON.stringify(this.newProps) ||
            JSON.stringify(this.state) !== JSON.stringify(this.prevState)
        );
    };

    render() {}
}
export default Component;
