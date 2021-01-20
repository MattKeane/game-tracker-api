require("dotenv").config()
const { ApolloServer } = require("apollo-server")
const fs = require("fs")
const path = require("path")
const Query = require ("./resolvers/Query")
const Mutation = require ("./resolvers/Mutation")
const { getUserId } = require("./utils")

// Connect to Database
require("./db/db")

const resolvers = {
	Query,
	Mutation,
}

const server = new ApolloServer({
	typeDefs: fs.readFileSync(
		path.join(__dirname, "schema.graphql"),
		"utf8"
	),
	resolvers,
	context: ({ req }) => {
		return {
			...req,
			userId:
				req && req.headers.authorization
					? getUserId(req)
					: null
		}
	}
})

server
	.listen()
	.then(({ url }) =>
		console.log(`Server is running on ${url}`)
	)