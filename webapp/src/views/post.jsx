import React from 'react';
import { Button, Card, CardText, CardBody, CardTitle, CardFooter, ListGroup, ListGroupItem } from 'reactstrap';
import { Link, Route } from 'react-router-dom'
import { graphql } from 'react-apollo';


class PostView extends React.Component {

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
            const renderedComments = post.posts_comments.map(comment =>{
                return <div>{comment.body}</div>;
            });
            const key = post.id; // + location.key;
            return (
                <ListGroupItem key={key}>
                    {renderedComments}
                </ListGroupItem>
            );
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
                            <Button tag={Link} to="post/create" color="primary">
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

