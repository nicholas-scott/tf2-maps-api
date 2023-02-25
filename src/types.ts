import { Prisma, PrismaClient, Map } from "@prisma/client"

// Context for Apollo Server
export interface Context {
	prisma: PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
	>
}

// Inputs for GraphQL resolvers
export interface MapFilter {
	fileName?: string
	mapType?: string
}

// Payloads for GraphQL resolvers
export interface Payload {
	userErrors: { message: string }[]
}

export interface MapPayload extends Payload {
	maps: Map[]
}