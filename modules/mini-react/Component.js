import { scheduleClassUpdate } from './render.js';

export class Component {
    constructor(props) {
        this.props = props || {};
        this.state = this.state || {};
    }

    setState(partialState) {
        scheduleClassUpdate(this, partialState);
    }
}

Component.prototype.isReactComponent = true;

function createInstance(wipFiber) {
    const instance = new wipFiber.type(wipFiber.props);
    instance.__fiber = wipFiber;
    return instance;
}

export default Component;

export { createInstance };
