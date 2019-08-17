import React from 'react';
import { ModalContainer, ModalRoute } from 'react-router-modal';
const gql = require('graphql-tag')
const { Mutation } = require('react-apollo')
import { graphql } from 'react-apollo';
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import 'react-router-modal/css/react-router-modal.css';

const CREATE_POST = gql`
    mutation create($title: String) {
      postCreate(newPost: {title: $title}) {
        post {
          title
        }
      }
    }
`;

class CreatePostModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
    }

    create() {

        this.props.mutate({variables: {title: this.state.title}});
        this.close();
    }

    close() {

        const { history, match } = this.props;
        history.push('/');
    }

    render() {

        return (
            <div>
                <Modal isOpen={true}
                       container={this}
                       toggle={() => this.close()}
                       className={this.props.className}>
                    <ModalHeader toggle={() => this.close()}>Create Post</ModalHeader>
                    <ModalBody>
                        <Label>Title</Label>
                        <Input value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}></Input>
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

const CreatePostModalGraphQL = graphql(CREATE_POST, {})(CreatePostModal);
export { CreatePostModalGraphQL as CreatePostModal}