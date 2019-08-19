import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

class GSGCard extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false, status: 'Closed' };
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {
        console.log('GSGCard this.props', this.props);
        let { children, header } = this.props;

        //<Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
        return (
            <div>
                <h5 onClick={this.toggle}>{header && header}</h5>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            {children && children}
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}

export { GSGCard };
