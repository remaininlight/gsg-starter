import React from 'react';
import { Button, Card, CardText, CardBody, CardTitle, CardFooter, ListGroup, ListGroupItem } from 'reactstrap';
import { graphql } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';

const CREATE_COMMENT = gql`
    mutation delete($id: ID!) {
      postDelete(id: $id) {
        ok
        errors{
          field
          messages
        }
      }
    }
`;

const CreateCommentButton = ({ post }) =>{

    const [mutation, { data }] = useMutation(CREATE_COMMENT);
    return (
        <Button color='primary' className="btn-raised float-right"
                onClick={mutation.bind(null, {variables: {id: post.id}})}>
            Comment
        </Button>
    );
};

export { CreateCommentButton }