import { Map } from "@prisma/client"
import { Context } from "../types"

const GameMap = {
	mapType: ({ mapTypePrefix }: Map, _: any, { prisma }: Context) => {
		const map = prisma.mapType.findUnique({
			where: { prefix: mapTypePrefix },
		})
	},
}

export default GameMap
