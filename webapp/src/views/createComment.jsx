import React from 'react';
import { ModalContainer, ModalRoute } from 'react-router-modal';
const gql = require('graphql-tag')
const { Mutation } = require('react-apollo')
import { graphql } from 'react-apollo';
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { withLastLocation } from 'react-router-last-location';
import 'react-router-modal/css/react-router-modal.css';

const CREATE_COMMENT = gql`
    mutation comment($body: String, $post: ID) {
      commentCreate(newComment: {body: $body, post: $post}) {
        comment {
          body
        }
        ok
        errors {
          field
          messages
        }
      }
    }
`;


class CreateCommentModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            body: ''
        };
    }

    create() {

        this.props.mutate({variables: {body: this.state.body, id: 28}});
        this.close();
    }

    close() {

        const { history, match, lastLocation } = this.props;
        history.push((lastLocation && lastLocation.pathname) || '/');
    }

    render() {

        return (
            <div>
                <Modal isOpen={true}
                       container={this}
                       toggle={() => this.close()}
                       className={this.props.className}>
                    <ModalHeader toggle={() => this.close()}>Create Comment</ModalHeader>
                    <ModalBody>
                        <Label>Body</Label>
                        <Input value={this.state.body} onChange={(e) => this.setState({body: e.target.value})}></Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="default" onClick={() => {this.create()}}>Create</Button>
                        <Button color="default" onClick={() => {this.close()}}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const CreateCommentModalGraphQL = graphql(CREATE_COMMENT, {})(withLastLocation(CreateCommentModal));
export { CreateCommentModalGraphQL as CreateCommentModal }