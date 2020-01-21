import React from '../modules/mini-react/index.js';

// eslint-disable-next-line react/prop-types
const FunctionalTest = ({ counter }) => {
    const [color, setColor] = React.useState('green');
    const [object, setObject] = React.useState({});

    //   console.log("color render => ", color);
    //   console.log("-----------------");
    //   console.log("object render => ", object);

    return React.createElement(
        'div',
        { className: 'functional-component' },

        React.createElement(
            'button',

            {
                style: `background-color:${color};`,
                type: 'button',
                onClick: () => {
                    setColor('red');
                    setObject({ id: '23', name: 'test' });
                },
            },
            'Update Color and test object',
        ),

        React.createElement('br', null, null),
        React.createElement('span', null, `${JSON.stringify(object)}`),

        React.createElement('br', null, null),

        React.createElement('span', null, `counts + 1 = > ${counter}`),
        React.createElement('br', null, null),
    );
};

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: 'default',
            counter: 0,
        };
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    handleCount = () => {
        const { counter } = this.state;

        this.setState({ counter: counter + 1, text: 'update tetx' });

        console.log('state => ', this.state);
    };

    render() {
        const { counter, text } = this.state;

        console.log('this ====> ', this);

        return React.createElement(
            'div',
            null,

            React.createElement('h1', null, text),
            React.createElement(
                'button',
                {
                    type: 'button',
                    onClick: this.handleCount,
                },
                'test click',
            ),

            React.createElement('br', null, null),
            React.createElement('br', null, null),
            React.createElement('br', null, null),

            React.createElement(FunctionalTest, { counter }, null),
        );
    }
}

React.render(
    React.createElement(Main, null, null),
    document.getElementById('root'),
);
