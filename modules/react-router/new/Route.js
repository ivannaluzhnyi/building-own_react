import React from '../../React/index.js';

class Route extends React.Component {
    render() {
        const { location } = this.context;
        const { path, component } = this.props;
        if (location.pathname !== path) return null;
        return React.createElement(component, { ...this.context });
    }
}

export default Route;

Route.contextType = RouterContext;
