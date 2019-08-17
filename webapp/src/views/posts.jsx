import React from 'react';
import { Button, Card, CardText, CardBody, CardTitle, CardFooter, ListGroup, ListGroupItem } from 'reactstrap';
import { Link, Route } from 'react-router-dom'
import { graphql } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const DELETE_POST = gql`
    mutation delete($id: ID!) {
      postDelete(id: $id) {
        ok
      }
    }
`;

const POST_SUBSCRIPTION = gql`
    subscription {
      posts_post {
        id
        title
        body
      }
    }
`;

const PostItemView = ({ post }) =>{

    const [postMutation, { data }] = useMutation(DELETE_POST);
    return (
        <ListGroupItem>
            {post.title}
            <Button color='danger' className="btn-raised float-right"
                    onClick={postMutation.bind(null, {variables: {id: post.id}})}>
                Delete
            </Button>
        </ListGroupItem>
    );
};

const CreatePostView = ({ post }) =>{

    return (
        <div>
            <Button tag={Link} to="post/create" color="primary">
                Create
            </Button>
        </div>
    );
};

class PostsView extends React.Component {

    render() {

        const { data } = this.props;
        const posts = data.posts_post || [];
        const renderedPosts = posts.map( post => {
            const key = post.id; // + location.key;
            return <PostItemView key={key} post={post} />;
        });

        return (
            <div>
                <Card className="bg-light">
                    <CardBody>
                        <CardTitle>
                            <h5>Posts</h5>
                        </CardTitle>
                        <ListGroup>{renderedPosts}</ListGroup>
                        <CardFooter>
                            <CreatePostView />
                        </CardFooter>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
const PostsViewGraphQL = graphql(POST_SUBSCRIPTION, {})(PostsView);

export { PostsViewGraphQL as PostsView };
