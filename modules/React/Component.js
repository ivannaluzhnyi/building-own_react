class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
        this.prevState = null;
        this.prevRender = null;
        this.componentDidMountCalled = false;
    }

    display = () => {
        if (this.shouldUpdate()) this.prevRender = this.render();
        return this.prevRender;
    };

    setState = newState => {
        this.prevState = this.state;
        this.state = { ...this.state, ...newState };
        this.display();
        this.componentDidUpdate();
    };

    componentDidMount = () => {
        this.componentDidMountCalled = true;
        console.log('thisss=> ', this);
    };

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
