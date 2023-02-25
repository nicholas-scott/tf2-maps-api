import { Context, MapFilter, MapPayload } from "../types"

const Query = {
	getMap: async (
		{ fileName, mapType }: MapFilter,
		_: any,
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
				where: { file_name: fileName },
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
				where: { map_type_prefix: mapType },
			}),
		}
	},
}

export default Query
