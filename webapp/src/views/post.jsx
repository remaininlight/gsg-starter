import React from 'react';
import { Button, Card, CardText, CardBody, CardTitle, CardFooter, ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';
import _ from 'lodash'
import { Link, Route } from 'react-router-dom'
import { ModalContainer, ModalRoute } from 'react-router-modal';
import { graphql, Subscription } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CreateCommentModal } from './createComment.jsx'

const DELETE_POST = gql`
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

const POST_SUBSCRIPTION = gql`
    subscription post($id: Int!) {
      posts_post(where: {id: {_eq: $id}}) {
        id
        title
        posts_comments {
          id
          body
        }
      }
    }
`;

class PostView extends React.Component {

    renderPost(post) {

        const { match } = this.props;

        const renderedComments = post.posts_comments.map(comment =>{
            const header = (
                <h5>
                    {comment.body}
                </h5>
            );
            const key = comment.id; // + location.key;
            return (
                <ListGroupItem key={key}>
                    {header}
                </ListGroupItem>
            );
        });

        return (
            <Container>
                <Row>
                    <Col xs="12" lg="6">
                        <Card className="bg-light">
                            <CardBody>
                                <CardTitle>
                                    <h5>{post.title}</h5>
                                </CardTitle>
                                <CardBody>
                                    {post.body}
                                </CardBody>
                                <ListGroup>{renderedComments}</ListGroup>
                                <CardFooter>
                                    <Button tag={Link} to={`${match.url}/comment/create`} color="primary">
                                        Comment
                                    </Button>
                                </CardFooter>
                            </CardBody>
                            <ModalRoute component={CreateCommentModal} path={`${match.url}/comment/create`} className='create-comment-modal'/>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    render() {

        const { match } = this.props;

        return (
            <Subscription subscription={POST_SUBSCRIPTION} variables={{id: match.params.id}}>
                {({ loading, error, data, client}) => {

                    let post = data && data.posts_post && data.posts_post[0];
                    if (loading) {
                        return (<div>Loading...</div>);
                    }
                    else if (error) {
                        console.error(error);
                        return (<div>Error!</div>);
                    }
                    else if (!post) {
                        return <div>Could not find post with id {match.params.id}</div>
                    }
                    return this.renderPost(post);
                }}
            </Subscription>
        )
    }
}

export { PostView };
