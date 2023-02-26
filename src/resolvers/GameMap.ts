import { Map } from "@prisma/client"
import { Context } from "../types"

const GameMap = {
	mapType: ({ mapTypePrefix }: Map, _: any, { prisma }: Context) => {
		const mapType = prisma.mapType.findUnique({
			where: { prefix: mapTypePrefix },
		})
		return mapType
	},
}

export default GameMap
