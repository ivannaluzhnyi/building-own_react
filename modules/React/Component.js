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

            render(vnode, olddom.parentNode, this, olddom);
        }, 0);
    }

    display = () => this.shouldUpdate() && this.render();

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
