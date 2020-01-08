# framework-js

## Instalation

`$ npm install | yarn install`

### Example of using

#### createElement with render

```javascript
import React from '../modules/mini-react/index.js';
import { createElement } from '../modules/mini-react/Core.js';

const div = React.createElement(
    'div',
    { className: 'test-class' },

    createElement('span', null, 'testing'),
    createElement('span', null, 'lol'),
);

const test = React.createElement(
    'div',
    { id: 'foo' },
    React.createElement('h1', null, 'Test de create elemnt'),
    React.createElement('a', null, 'Test de span'),
    div,
);

React.render(test, document.getElementById('root'));
```
