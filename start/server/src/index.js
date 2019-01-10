// Importing ApolloServer Class
const { ApolloServer } = require('apollo-server');
// Importing Schema 
const typeDefs = require('./schema');
// require graph resolvers
const resolvers = require('./resolvers');
// Import CreateStore function to set up database
const { createStore } = require('./utils')
// requiring data sources
const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
// creating database by calling below function
const store = createStore();
// Passing schema to new Apollo instance
// Connecting LaunchAPI and UserAPI to graph
// passing in database to UserAPI data source
const server = new ApolloServer({ typeDefs,
	resolvers,
	dataSources: () => ({
		launchAPI: new LaunchAPI(),
		userAPI: new UserAPI({ store })
	})
 });

server.listen().then(({ url }) => {
	console.log(`server ready at ${url}`);
})