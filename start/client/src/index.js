import { ApolloClient } from "apollo-client";
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: "ItsJustChewbacca-631"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>, document.getElementById('root'));