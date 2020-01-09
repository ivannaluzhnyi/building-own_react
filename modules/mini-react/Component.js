class Component {
    constructor(props) {
        this.props = props || {};
        this.state = {};

        this._pendingState = null;
    }

    updateComponent() {
        // Awesome things to come;
        // TODO

        console.log(this);
    }

    setState(partialNewState) {
        const newState = { ...this.state, ...partialNewState };
        this.state = newState;
    }

    // will be overridden
    render() {}
}

export default Component;
