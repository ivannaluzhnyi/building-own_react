class Component {
    constructor(properties) {
        this.properties = properties;
        this.state = {};
        this.prevState = null;
        this.prevRender = null;
    }

    display = () => {
        if (this.shouldUpdate()) this.prevRender = this.render();
        return this.prevRender;
    };

    setState = newState => {
        this.prevState = this.state;
        this.state = newState;
        this.display();
        this.componentDidUpdate();
    };

    componentDidUpdate = () => {};

    getState = () => {
        return this.state;
    };

    shouldUpdate = () => {
        return (
            JSON.stringify(this.properties) !== JSON.stringify(this.newProps) ||
            JSON.stringify(this.state) !== JSON.stringify(this.prevState)
        );
    };

    render() {}
}
export default Component;
