import { GameMode } from "@prisma/client"
import { Context } from "../types"

const GameMode = {
	maps: ({ id }: GameMode, _: any, { prisma }: Context) => {
		return prisma.map.findMany({
			where: { gameModeId: id },
		})
	},
}

export default GameMode
