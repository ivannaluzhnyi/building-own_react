import render from './render.js';

class Component {
    constructor(props) {
        this.props = props;
        this.state = {};

        this.contexet = {};

        this.prevProps = null;

        this.propTypes = undefined;
    }

    getClassName = () => this.constructor.name;

    setState(state) {
        setTimeout(() => {
            this.state = { ...this.state, ...state };
            const vnode = this.render(); // Lorsque l'état change, restituez la méthode de rendu du composant
            const olddom = getDOM(this);

            // console.log('=========== setState ========');

            // console.log('vnode => ', vnode);
            // console.log('vnode parentNode=> ', olddom.parentNode);
            // console.log('this => ', this);
            // console.log('olddom => ', olddom);
            render(vnode, olddom.parentNode, this, olddom);
        }, 0);
    }

    display = () => {
        // console.log('this.prevRender 1 => ', this.prevRender);
        if (this.shouldUpdate()) this.prevRender = this.render();
        // console.log('this.shouldUpdate() => ', this.shouldUpdate());
        // console.log('this.prevRender 2 => ', this.prevRender);

        return this.prevRender;
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

// Rechercher le nœud DOM réel rendu par l'instance de composant actuelle
export function getDOM(comp) {
    let rendered = comp.__rendered;
    // Trouvez le premier nœud dom non-composant à travers la chaîne __render
    while (rendered instanceof Component) {
        rendered = rendered.__rendered;
    }
    return rendered;
}
