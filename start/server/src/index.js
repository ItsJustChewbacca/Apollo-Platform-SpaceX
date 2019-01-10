// Importing ApolloServer Class
const { ApolloServer } = require('apollo-server');
// Importing Schema 
const typeDefs = require('./schema');
// require graph resolvers
const resolvers = require('./resolvers');
// Import CreateStore function to set up database
const { createStore } = require('./utils')

const isEmail = require('isemail')

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
	context: async ({ req }) => {
	    // simple auth check on every request
	    const auth = (req.headers && req.headers.authorization) || '';
	    const email = new Buffer(auth, 'base64').toString('ascii');

	    // if the email isn't formatted validly, return null for user
	    if (!isEmail.validate(email)) return { user: null };
	    // find a user by their email
	    const users = await store.users.findOrCreate({ where: { email } });
	    const user = users && users[0] ? users[0] : null;

	    return { user: { ...user.dataValues } };
	},
	dataSources: () => ({
		launchAPI: new LaunchAPI(),
		userAPI: new UserAPI({ store })
	})
 });

server.listen().then(({ url }) => {
	console.log(`server ready at ${url}`);
})