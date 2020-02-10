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

        this.propTypes = undefined;
    }

    getClassName = () => this.constructor.name;

    display = () => {
        // console.log('this.prevRender 1 => ', this.prevRender);
        if (this.shouldUpdate()) this.prevRender = this.render();
        // console.log('this.shouldUpdate() => ', this.shouldUpdate());
        // console.log('this.prevRender 2 => ', this.prevRender);

        return this.prevRender;
    };

    setState = newState => {
        this.prevState = { ...this.state };
        this.state = { ...this.state, ...newState };
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
