import React from 'react';
import { Button, Card, CardText, CardBody, CardTitle, CardFooter, ListGroup, ListGroupItem } from 'reactstrap';
import { Link, Route } from 'react-router-dom'
import { graphql } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
//import { GSGCard } from "../components/gsgCard.jsx";

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
        console.log('PostsView render posts ', posts );
        const renderedPosts = posts.map( post =>{
            const header = (
                <h5>
                    {post.title} {post.id}
                    <DeletePostButton post={post}/>
                </h5>
            );
            //const renderedComments = post.posts_comments.map(comment =>{
            //    return <div>{comment.body}</div>;
            //});
            const key = post.id; // + location.key;
            const link = `/post/${post.id}`;
            console.log('link ', link );
            return (
                <ListGroupItem tag={Link} to={link} key={key}>
                    {header}
                </ListGroupItem>
            );
            //{renderedComments}
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
                            <Button tag={Link} to="/post/create" color="primary">
                                Create
                            </Button>
                        </CardFooter>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
const PostsViewGraphQL = graphql(POST_SUBSCRIPTION, {})(PostsView);

export { PostsViewGraphQL as PostsView };
