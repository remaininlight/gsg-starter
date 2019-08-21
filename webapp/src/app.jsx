const util = require('util');
import React from 'react';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-client";
import { split, ApolloLink } from 'apollo-link';
import { onError } from "apollo-link-error";
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { PostsView } from './views/posts.jsx';
import { PostView } from './views/post.jsx';
import { CreatePostModal } from "./views/createPost.jsx";

const GRAPHQL_ENDPOINT = `%s:%d/v1/graphql`;

const httpLink = new HttpLink({
    uri: 'http://' + util.format(GRAPHQL_ENDPOINT, window.location.hostname, 8000) // "http://<your-app>/v1/graphql", // use https for secure endpoint
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: 'ws://' + util.format(GRAPHQL_ENDPOINT, window.location.hostname, 8080), //"ws://<your-app>/v1/graphql", // use wss for a secure endpoint
    options: {
        reconnect: true
    }
});

const splitLink = split(
    // Send queries and mutations to Django, subscriptions to Hasura
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
    // Display errors to the console
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([
    errorLink,
    splitLink
]);

// Instantiate client
const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {menuOpen: false};
    }

    toggleMenu() {
        this.setState((state) => {
            return {menuOpen: !state.menuOpen};
        });
    }

    render() {

        return (
            <BrowserRouter>
                <LastLocationProvider>
                    <ApolloProvider client={apolloClient}>
                        <Navbar color="faded" light expand="md">
                            <NavbarBrand tag={Link} to='/'>GSG Starter</NavbarBrand>
                            <NavbarToggler onClick={this.toggleMenu}/>
                            <Collapse isOpen={this.state.menuOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                </Nav>
                            </Collapse>
                        </Navbar>
                        <Route exact key="posts" path="/" component={PostsView} />
                        <ModalRoute component={CreatePostModal} path='/post/create' className='create-video-modal'/>
                        <Route key="post" path="/post/:id" component={PostView} />
                        <ModalContainer />
                    </ApolloProvider>
                </LastLocationProvider>
            </BrowserRouter>
        )
    }
}

export default App

/*
<NavItem>
    <NavLink tag={Link} to={"/create" + location.search}>Create</NavLink>
</NavItem>
*/
