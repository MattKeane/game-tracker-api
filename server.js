require("dotenv").config()
const { ApolloServer } = require("apollo-server")
const fs = require("fs")
const path = require("path")
const Query = require ("./resolvers/Query")

// Connect to Database
require("./db/db")

const resolvers = {
	Query,
}

const server = new ApolloServer({
	typeDefs: fs.readFileSync(
		path.join(__dirname, "schema.graphql"),
		"utf8"
	),
	resolvers,
})

server
	.listen()
	.then(({ url }) =>
		console.log(`Server is running on ${url}`)
	)