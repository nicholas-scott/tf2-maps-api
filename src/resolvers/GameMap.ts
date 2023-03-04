import { Map } from "@prisma/client"
import { Context } from "../types"

const GameMap = {
	gameMode: ({ gameModeId }: Map, _: any, { prisma }: Context) => {
		const mapType = prisma.gameMode.findUnique({
			where: { id: gameModeId },
		})
		return mapType
	},
}

export default GameMap
