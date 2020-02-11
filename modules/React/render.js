/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
import {
    isClass,
    isStateLessComponent,
    checkIfClassExist,
} from './react-utils.js';
import PropTypes from '../PropTypes/PropTypes.js';

const mountedComponents = [];

export default function render(vnode, parent, comp, olddom) {
    let dom;
    // Chaîne ou numéro de rendu
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        // Si une chaîne ou un nombre existe et est différent de vnode, remplacez-le par vnode
        if (olddom && olddom.splitText) {
            if (olddom.nodeValue !== vnode) {
                olddom.nodeValue = vnode;
            }
        } else {
            dom = document.createTextNode(vnode);
            // Maintenance d'une chaîne de référence rendue
            if (comp) {
                comp.__rendered = dom;
            }

            if (olddom) {
                parent.replaceChild(dom, olddom);
            } else {
                parent.appendChild(dom);
            }
        }
    }

    // Rendre les balises html
    if (typeof vnode.element === 'string') {
        // Si l'ancien  DOM n'existe pas ou si le DOM est différent de l'ancien, créez un nouveau noeud DOM, sinon utilisez l'algorithme diff pour mettre à jour
        if (!olddom || olddom.element !== vnode.element.toUpperCase()) {
            createNewDom(vnode, parent, comp, olddom);
        } else {
            //  Méthodes de mise à jour des attributs, de réutilisation des nœuds enfants, etc.
            diffDOM(vnode, parent, comp, olddom);
        }
    }

    if (isClass(vnode.element)) {
        const inst = new vnode.element(vnode.properities);

        if (vnode.element.propTypes) {
            PropTypes.checkPropTypes(
                vnode.element.propTypes,
                vnode.properities,
                inst.getClassName(),
            );
        }

        if (inst.propTypes) {
            PropTypes.checkPropTypes(
                inst.propTypes,
                vnode.properities,
                inst.getClassName(),
            );
        }

        if (
            !checkIfClassExist(mountedComponents, inst) &&
            inst.componentDidMount
        ) {
            inst.componentDidMount();
        }

        mountedComponents.push(inst.getClassName());

        if (comp) {
            comp.__rendered = inst;
        }

        const innerVnode = inst.render();
        render(innerVnode, parent, inst, olddom);
    }

    if (isStateLessComponent(vnode.element)) {
        const innerVnode = vnode.element(vnode.properities);

        if (vnode.element.propTypes) {
            PropTypes.checkPropTypes(
                vnode.element.propTypes,
                vnode.properities,
                vnode.element.name,
            );
        }

        render(innerVnode, parent, null, null);
    }
}

// Créer un nouveau DOM
function createNewDom(vnode, parent, comp, olddom) {
    const dom = document.createElement(vnode.element);

    dom.__vnode = vnode;

    // Maintenance d'une chaîne de référence rendue
    if (comp) {
        comp.__rendered = dom;
    }
    setAttrs(dom, vnode.properities);

    if (olddom) {
        parent.replaceChild(dom, olddom);
    } else {
        parent.appendChild(dom);
    }

    vnode.children.forEach(elm => {
        render(elm, dom, null, null);
    });
}

function diffDOM(vnode, parent, comp, olddom) {
    // Mettre à jour les attributs
    const { onlyInLeft, onlyInRight, bothIn } = diffObject(
        vnode.properities,
        olddom.__vnode.properities,
    );
    setAttrs(olddom, onlyInLeft);
    removeAttrs(olddom, onlyInRight);
    diffAttrs(olddom, bothIn.left, bothIn.right);

    // Réutiliser les nœuds enfants
    let olddomChild = olddom.firstChild;

    vnode.children.forEach(elm => {
        render(elm, olddom, null, olddomChild);
        olddomChild = olddomChild && olddomChild.nextSibling;
    });

    // Supprimer les enfants supplémentaires
    while (olddomChild) {
        const next = olddomChild.nextSibling;
        olddom.removeChild(olddomChild);
        olddomChild = next;
    }
    // Parce que vous devez obtenir l'ancien VNODE de l'ancien dom lorsque vous différez le DOM, après la mise à jour, vous devez mettre à jour le pointeur de ___vnode
    olddom.__vnode = vnode;
}

// Comparer l'intersection des attributs du VNode et de l'ancien nœud DOM
function diffObject(leftProps, rightProps) {
    const onlyInLeft = {}; // Une collection qui n'existe que dans les nouveaux attributs de noeud DOM
    const onlyInRight = {}; // Une collection qui n'existe que dans les anciens attributs de noeud DOM
    const bothLeft = {}; // Une collection de nouveaux attributs de noeud DOM dans des attributs coexistants
    const bothRight = {}; // Une collection d'anciens attributs de noeud DOM dans des attributs coexistants

    Object.keys(leftProps).forEach(key => {
        if (rightProps[key] === undefined) {
            onlyInLeft[key] = leftProps[key];
        } else {
            bothLeft[key] = leftProps[key];
            bothRight[key] = rightProps[key];
        }
    });

    Object.keys(rightProps).forEach(key => {
        if (leftProps[key] === undefined) {
            onlyInRight[key] = rightProps[key];
        }
    });

    return {
        onlyInLeft,
        onlyInRight,
        bothIn: {
            left: bothLeft,
            right: bothRight,
        },
    };
}

// Définition des propriétés des nœuds DOM
function setAttrs(dom, props) {
    Object.keys(props).forEach(propertyName => {
        if (propertyName === 'className') {
            dom.setAttribute('class', props[propertyName]);
        }

        // Lorsque l'attribut est de style
        if (propertyName === 'style') {
            if (typeof props[propertyName] === 'string') {
                dom.style.cssText = props[propertyName];
            }

            if (typeof props[propertyName] === 'object') {
                Object.keys(props[propertyName]).forEach(val => {
                    dom.style[val] = props[propertyName][val];
                });
            }
        }

        // Événements contraignants commençant par ON
        if (/on\w+/.test(propertyName)) {
            dom.addEventListener(
                propertyName.substring(2).toLowerCase(),
                props[propertyName],
                false,
            );
        }

        // Attribuez directement les propriétés restantes
        dom.setAttribute(propertyName, props[propertyName]);
    });
}

// Supprimer les attributs de noeud DOM
function removeAttrs(dom, props) {
    Object.keys(props).forEach(propertyName => {
        if (propertyName === 'className') {
            dom.removeAttribute('class', props[propertyName]);
        }

        if (propertyName === 'style') {
            dom.style.cssText = '';
        }

        if (/on\w+/.test(propertyName)) {
            dom.removeEventListener(
                propertyName.substring(2).toLowerCase(),
                props[propertyName],
                false,
            );
        }

        // Supprimez directement les attributs restants
        dom.removeAttribute(k, props[k]);
    });
}

// Modification des attributs de noeud DOM
function diffAttrs(dom, newProps, oldProps) {
    Object.keys(newProps).forEach(propertyName => {
        // if (newProps[propertyName] === oldProps[propertyName]) {
        // }

        if (propertyName === 'className') {
            dom.setAttribute('class', newProps[propertyName]);
        }

        if (propertyName === 'style') {
            if (typeof newProps[propertyName] === 'string') {
                dom.style.cssText = newProps[propertyName];
            }

            if (
                typeof newProps[propertyName] === 'object' &&
                typeof oldProps[propertyName] === 'object'
            ) {
                // Si l'attribut css du nouvel attribut est différent de l'attribut css de l'ancien attribut, l'attribut css se voit attribuer l'attribut css du nouvel attribut
                Object.keys(newProps[propertyName]).forEach(propNameVal => {
                    if (
                        newProps[propertyName][propNameVal] !==
                        oldProps[propertyName][propNameVal]
                    ) {
                        dom.style[propNameVal] =
                            newProps[propertyName][propNameVal];
                    }
                });

                // Si un attribut dans l'attribut css de l'ancien attribut n'existe pas dans l'attribut css du nouvel attribut, définissez l'attribut css sur vide
                Object.keys(oldProps[propertyName]).forEach(propNameVal => {
                    if (newProps[propertyName][propNameVal] === undefined) {
                        dom.style[propNameVal] = '';
                    }
                });
            }
        }

        if (/on\w+/.test(propertyName)) {
            dom.removeEventListener(
                propertyName.substring(2).toLowerCase(),
                oldProps[propertyName],
                false,
            );
            dom.addEventListener(
                propertyName.substring(2).toLowerCase(),
                newProps[propertyName],
                false,
            );
        }

        // Attribuez directement les propriétés restantes
        dom.setAttribute(propertyName, newProps[propertyName]);
    });
}
