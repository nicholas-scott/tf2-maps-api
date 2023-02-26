import { Context, MapFilter, MapPayload } from "../types"

const Query = {
	getMaps: async (
		_: any,
		{ fileName, mapType }: MapFilter,
		{ prisma }: Context
	): Promise<MapPayload> => {
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

		return {
			userErrors: [],
			maps: await prisma.map.findMany({
				where: { mapTypePrefix: mapType },
			}),
		}
	},
}

export default Query
