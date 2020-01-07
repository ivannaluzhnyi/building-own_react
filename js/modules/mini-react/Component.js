class Component {
    constructor(props) {
        this.props = props || {};
        this.state = {};

        this._pendingState = null;
    }
    updateComponent() {
        // Awesome things to come
    }
    setState(partialNewState) {
        const newState = Object.assign({}, this.state, partialNewState);
        this.state = newState;
    }
    //will be overridden
    render() {}
}
