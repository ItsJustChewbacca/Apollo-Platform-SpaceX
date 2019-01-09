// importing gql from Apollo Server
const { gql } = require('apollo-server');
// Assigning variable for schema
const typeDefs = gql``

/*
	* Define launches query to fetch all upcoming rocket launches
	* Query returns an array of launches, which will never be null
	* ! -> This will always return data
	* Defined Query to fetch a launch by its ID
	* Query takes an argument of id and returns a single launch
	* Query users data 
 */

type Query {
	launches: [Launch]!
	launch(id: ID!): Launch
	me: User
}

module.exports = typeDefs;