# own reactjs project

## Instalation & start

`$ npm install | yarn install`

`$ npm start | yarn start`

### Example of using

#### createElement with render

```javascript
import React from '../modules/React/index.js';

const div = React.createElement(
    'div',
    { className: 'test-class' },

    React.createElement('span', null, 'testing'),
    React.createElement('span', null, 'lol'),
);

const App = React.createElement(
    'div',
    { id: 'foo' },
    React.createElement('h1', {}, 'Test de create elemnt'),
    React.createElement('a', {}, 'Test de span'),
    div,
);

React.render(React.createElement(App, {}), document.getElementById('root'));
```

#### class component

```javascript
import React from '../../../modules/React/index.js';

class TestClassComponent extends React.Component {
    render() {
        return React.createElement(
            'div',
            { className: 'test-class-component' },

            React.createElement('h3', {}, 'TestClassComponent'),
        );
    }
}
```

#### functional component

```javascript
import React from '../../../modules/React/index.js';

const MyFonctionalTestComponent = () => {
    return React.createElement(
        'div',
        { className: 'My-Fonctional-Test-Component' },

        React.createElement('h3', {}, 'MyFonctionalTestComponent'),
    );
};
```

#### class component with props and state (state, setSate)

```javascript
import React from '../../../modules/React/index.js';

class TestClassComponent extends React.Component {
    constructor(props) {
        super(props);

        this.propTypes = {
            textProps: PropTypes.string.isRequired,
        };

        this.state = {
            textState: 'Default display text',
        };
    }

    componentDidMount = () => {
        console.log('componentDidMount:TestClassComponent');
    };

    handleChangeState = e => {
        this.setState({ textState: 'new text' });
    };

    render() {
        const { textState } = this.state;
        const { textProps } = this.props;
        return React.createElement(
            'div',
            { className: 'test-class-component' },

            React.createElement('h3', {}, 'TestClassComponent'),

            React.createElement(
                'button',
                {
                    className: 'btn',
                    onClick: this.handleChangeState,
                },
                `State text: ${textState}`,
            ),

            React.createElement('p', {}, `Props text: ${textProps}`),
        );
    }
}

React.render(
    React.createElement(TestClassComponent, {
        textProps: 'Props default text',
    }),
    document.getElementById('root'),
);
```

#### functional component with props anf vars

```javascript
import React from '../../../modules/React/index.js';

const MyFonctionalTestComponent = ({ text }) => {
    return React.createElement(
        'div',
        { className: 'My-Fonctional-Test-Component' },

        React.createElement('h3', {}, 'MyFonctionalTestComponent'),

        React.createElement('p', {}, text'),


        React.createElement('p', {
            vars: {
               replace: 'success replaced !'
            }
        }, 'test vars : {replace}'), //  => test vars : success replaced !'
    );
};
```

#### functional component propTypes

```javascript
import React from '../../../modules/React/index.js';

const MyFonctionalTestComponent = ({ text }) => {
    return React.createElement(
        'div',
        { className: 'My-Fonctional-Test-Component' },

        React.createElement('h3', {}, 'MyFonctionalTestComponent'),

        React.createElement('p', {}, text'),
    );
};


MyFonctionalTestComponent.propTypes = {
    text: PropTypes.string.isRequired,
};
```
