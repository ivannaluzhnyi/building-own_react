import React from '../../../modules/React/index.js';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textState: 'HGFhjgghjbhlklibl',
        };
    }

    render() {
        const { textState } = this.state;
        return React.createElement(
            'div',
            { className: 'home-container ' },

            React.createElement('h3', {}, 'Home Page'),

            React.createElement(
                'section',
                {},

                React.createElement(
                    'p',
                    {},

                    'Initial : Test  {test} ',
                ),

                React.createElement(
                    'p',
                    {
                        vars: {
                            test: 'Reaplce text test',
                        },
                        id: 'test',
                    },

                    'Generated:   {test} ',
                ),

                React.createElement(
                    'p',
                    {
                        onClick: () =>
                            this.setState({
                                textState: ' Change State component  ',
                            }),
                        id: 'test',
                    },

                    `Test: ${textState}`,
                ),
            ),
        );
    }
}

export default HomeContainer;
