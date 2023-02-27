import { Map } from "@prisma/client"
import { Context, MapFilter } from "../types"

const Query = {
	getMap: async (
		_: any,
		{ fileName }: { fileName: string },
		{ prisma }: Context
	): Promise<Map | null> => {
		return prisma.map.findUnique({
			where: { fileName },
		})
	},
	getMaps: async (
		_: any,
		{ filter }: MapFilter,
		{ prisma }: Context
	): Promise<Map[]> => {
		return prisma.map.findMany({ where: { ...filter } })
	},
	getMapTypes: async (_: any, __: any, { prisma }: Context) => {
		return prisma.mapType.findMany()
	},
}

export default Query
