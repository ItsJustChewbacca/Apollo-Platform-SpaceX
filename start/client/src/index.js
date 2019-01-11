import { ApolloClient } from "apollo-client";
import { Query, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

import Pages from './pages';
import Login from './pages/login';

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'ItsJustChewbacca-631',
    headers: {
      authorization: localStorage.getItem('token'),
    },
  }),
	initializers: {
	isLoggedIn: () => !!localStorage.getItem('token'),
	cartItems: () => [],
  },
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN}>
      {({ data }) => (data.isLoggedIn ? <Pages /> : <Login />)}
    </Query>
  </ApolloProvider>,
  document.getElementById('root'),
);