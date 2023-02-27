import { Context, MapFilter, MapPayload } from "../types"

const Query = {
	getMaps: async (
		_: any,
		{ filter }: MapFilter,
		{ prisma }: Context
	): Promise<MapPayload> => {
		const { fileName, mapType } = filter

		if (fileName && mapType) {
			return {
				userErrors: [
					{
						message:
							"You can't filter by map file name and map type",
					},
				],
				maps: [],
			}
		}

		if (fileName) {
			const map = await prisma.map.findUnique({
				where: { fileName },
			})
			const maps = map ? [map] : []
			return {
				userErrors: [],
				maps,
			}
		}

		if (mapType) {
			const maps = await prisma.map.findMany({
				where: { mapTypePrefix: mapType },
			})
			return {
				userErrors: [],
				maps,
			}
		}

		return {
			userErrors: [],
			maps: await prisma.map.findMany(),
		}
	},
}

export default Query
