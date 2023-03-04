import { Map } from "@prisma/client"
import { Context, GetMapsInput, MapFilter } from "../types"

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
		{ filter }: GetMapsInput,
		{ prisma }: Context
	): Promise<Map[]> => {
		let prismaFilter: MapFilter = {}

		if (filter.mapPrefix) {
			prismaFilter.fileName = { startsWith: filter.mapPrefix }
			delete filter.mapPrefix
		}

		if (filter.gameMode) {
			const gameModeId = await prisma.gameMode.findUnique({
				where: { name: filter.gameMode },
				select: { id: true },
			})

			if (gameModeId) {
				prismaFilter.gameModeId = gameModeId.id
			}
		}

		prismaFilter = { ...prismaFilter, ...filter }

		return prisma.map.findMany({ where: prismaFilter })
	},
	getGameModes: async (_: any, __: any, { prisma }: Context) => {
		return prisma.gameMode.findMany()
	},
}

export default Query
