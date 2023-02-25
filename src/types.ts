import { Prisma, PrismaClient, Map } from "@prisma/client"

export interface Context {
	prisma: PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
	>
}

// Input
export interface MapFilter {
	fileName?: string
	mapType?: string
}

// Payloads
export interface Payload {
	userErrors: { message: string }[]
}

export interface MapPayload extends Payload {
	maps: Map[]
}
