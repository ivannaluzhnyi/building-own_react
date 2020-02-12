import React from '../../React/index.js';

import createBrowserHistory from './history/createBrowserHistory.js';

const history = createBrowserHistory();

export const RouterContext = React.createContext({ history });

// console.log('RouterContext => ', { history });

export default class BrowserRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                pathname: window.location.pathname,
            },
        };
    }

    componentDidMount() {
        history.listen(pathname => {
            console.log('history change', pathname);
            this.setState({ location: { pathname } });
        });
    }

    render() {
        const { location } = this.state;

        const { children } = this.props;

        return React.createElement(children, { history, location });
    }
}
