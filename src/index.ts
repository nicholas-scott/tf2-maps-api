import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { PrismaClient } from "@prisma/client"
import resolvers from "./resolvers/resolvers"
import typeDefs from "./schema"
import { Context } from "./types"
import { fetchMapData } from "./innitDb/fetchMapData"
import { getUserFromToken } from "./util/getUserFromToken"

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

const prisma = new PrismaClient()

async function contextFunction({ req, res }: any): Promise<Context> {
	const userInfo = getUserFromToken(req.headers.authorization)

	return {
		prisma,
		userInfo,
	}
}

async function startServer() {
	const { url } = await startStandaloneServer(server, {
		context: contextFunction,
		listen: { port: 4000 },
	})

	console.log(`🚀  Server ready at: ${url}`)
}

console.log("Starting server...")
startServer()
