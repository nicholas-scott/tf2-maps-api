import { MapType } from "@prisma/client"
import { Context } from "../types"

const MapType = {
	maps: ({ prefix }: MapType, _: any, { prisma }: Context) => {
		return prisma.map.findMany({
			where: { mapTypePrefix: prefix },
		})
	},
}

export default MapType
