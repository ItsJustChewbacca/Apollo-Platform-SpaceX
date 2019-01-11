import { ApolloClient } from "apollo-client";
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'ItsJustChewbacca-631',
    headers: {
      authorization: localStorage.getItem('token'),
    },
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>, document.getElementById('root'));