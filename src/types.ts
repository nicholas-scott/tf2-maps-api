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
export interface GetMapsInput {
	filter: {
		isOfficial?: boolean
		isPyroVision?: boolean
		mapPrefix?: string
		gameMode?: string
	}
}

export interface Credentials {
	email: string
	password: string
}

// Payloads for GraphQL resolvers
export interface Payload {
	userErrors: { message: string }[]
}

export interface AuthPayload extends Payload {
	token: string | null
}

export interface MapFilter {
	isOfficial?: boolean
	isPyroVision?: boolean
	fileName?: {
		startsWith: string
	}
	gameModeId?: string
}

//
