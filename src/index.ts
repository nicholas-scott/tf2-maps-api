import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import resolvers from "./resolvers/resolvers"
import typeDefs from "./schema"

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

const startServer = async () => {
	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
	})

	console.log(`🚀  Server ready at: ${url}`)
}

console.log("Starting server...")
startServer()
