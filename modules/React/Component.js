import render from './render.js';

class Component {
    constructor(props) {
        this.props = props;
    }

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
}

export default Component;

// Rechercher le nœud DOM réel rendu par l'instance de composant actuelle
function getDOM(comp) {
    let rendered = comp.__rendered;
    // Trouvez le premier nœud dom non-composant à travers la chaîne __render
    while (rendered instanceof Component) {
        rendered = rendered.__rendered;
    }
    return rendered;
}
