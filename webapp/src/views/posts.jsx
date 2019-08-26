import React from 'react';
import { Button, Card, CardText, CardBody, CardTitle, CardFooter, ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';

import { Link, Route } from 'react-router-dom'
import { graphql } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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

const POSTS_SUBSCRIPTION = gql`
    subscription {
      posts_post {
        id
        title
        body
        posts_comments {
          body
        }
      }
    }
`;

const DeletePostButton = ({ post }) =>{

    const [postMutation, { data }] = useMutation(DELETE_POST);
    return (
        <Button color='danger' className="btn-raised float-right"
                onClick={postMutation.bind(null, {variables: {id: post.id}})}>
            Delete
        </Button>
    );
};

class PostsView extends React.Component {

    render() {

        const { data } = this.props;
        const posts = data.posts_post || [];
        const renderedPosts = posts.map( post =>{
            const header = (
                <h5>
                    {post.title} {post.id}
                    <DeletePostButton post={post}/>
                </h5>
            );
            const key = post.id; // + location.key;
            const link = `/post/${post.id}`;
            return (
                <ListGroupItem tag={Link} to={link} key={key}>
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
                                    <h5>Posts</h5>
                                </CardTitle>
                                <ListGroup>{renderedPosts}</ListGroup>
                                <CardFooter>
                                    <Button tag={Link} to="/post/create" color="primary">
                                        Create
                                    </Button>
                                </CardFooter>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
const PostsViewGraphQL = graphql(POSTS_SUBSCRIPTION, {})(PostsView);

export { PostsViewGraphQL as PostsView };
