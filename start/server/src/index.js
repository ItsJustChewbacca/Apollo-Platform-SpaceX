// Importing ApolloServer Class
const { ApolloServer } = require('apollo-server');
// Importing Schema 
const typeDefs = require('./schema');
// Passing schema to new Apollo instance
const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
	console.log(`server ready at ${url}`);
})