import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { PrismaClient, Prisma } from "@prisma/client"
import resolvers from "./resolvers/resolvers"
import typeDefs from "./schema"

export interface Context {
	prisma: PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
	>
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

const prisma = new PrismaClient()

async function contextFunction({ req, res }: any): Promise<Context> {
	return {
		prisma,
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
