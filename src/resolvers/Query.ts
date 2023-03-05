import { Map } from "@prisma/client"
import { Context, GetMapsInput, MapFilter } from "../types"
import { isValidUser } from "../util/isValidUser"

const Query = {
	getMap: async (
		_: any,
		{ fileName }: { fileName: string },
		{ prisma, userInfo }: Context
	): Promise<Map | null> => {
		//Check if user is logged in
		if (!userInfo || !(await isValidUser(userInfo.userId, prisma)))
			return null

		return prisma.map.findUnique({
			where: { fileName },
		})
	},
	getMaps: async (
		_: any,
		{ filter }: GetMapsInput,
		{ prisma, userInfo }: Context
	): Promise<Map[]> => {
		//Check if user is logged in
		if (!userInfo || !(await isValidUser(userInfo.userId, prisma)))
			return []

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
	getGameModes: async (_: any, __: any, { prisma, userInfo }: Context) => {
		//Check if user is logged in
		if (!userInfo || !(await isValidUser(userInfo.userId, prisma)))
			return []
		return prisma.gameMode.findMany()
	},
}

export default Query
