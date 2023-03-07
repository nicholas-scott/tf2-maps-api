import cheerio, { load } from "cheerio"
import { MapMaker } from "../types"
import { dashedDateReg, mapPrefix, valveReg } from "../util/regularExpressions"

const url = "https://wiki.teamfortress.com/wiki/List_of_maps"
//TODO: don't do this, just copy/paste html into excel and get in in csv. Then parse csv
//This is messy. Navigating page html like this isn't worth this messy code.
export async function fetchMapData() {
	const resp = await fetch(url)
	const text = await resp.text()
	const $ = load(text)

	//Select all h2 > span elements. These h2s are next to the grids for map types and maps
	const headers = $("h2 > span").filter((i, el) => {
		return $(el).text() === "Map types" || $(el).text() === "Maps"
	})

	//Get the first header from headers and print the text
	const gameModesHeader = headers.eq(0).parent()
	const mapsHeader = headers.eq(1).parent()

	//Get the gameModes and maps, and map developers
	const gameModes = getGameModes($, gameModesHeader)
	const maps = getMaps($, mapsHeader)
	const mapMakers = getMapMakers($, mapsHeader)
	console.log(mapMakers)
	return { gameModes, maps, mapMakers }
}

function getGameModes($: cheerio.Root, header: cheerio.Cheerio) {
	const gameModeTable = header.next().next()
	const mapRows = gameModeTable.find("tbody > tr")
	const mapInfo = mapRows
		.map((i, el) => {
			const gameModeInfo = $(el).find("td")
			const gameModeName = gameModeInfo.eq(0).text().trim()
			const gameModePrefix = gameModeInfo.eq(1).text().trim()
			const gameModeDate = dashedDateReg.exec(
				// This can be done just by trimming string
				gameModeInfo.eq(2).text()
			)?.[0]
			return { gameModeName, gameModePrefix, gameModeDate }
		})
		.get()

	//First tr is empty
	mapInfo.shift()
	return mapInfo
}

function getMapMakers($: cheerio.Root, header: cheerio.Cheerio): MapMaker[] {
	const gameModeTable = header.next().next()
	const mapRows = gameModeTable.find("tbody > tr")
	const mapMakerInfo = mapRows
		.map((i, el) => {
			const mapInfo = $(el).find("td")
			const mapMaker = mapInfo
				.eq(5)
				.find("a")
				.map((i, el) => {
					const mapMaker = $(el).text().trim()
					const mapMakerUrl = $(el).attr("href")
					return { link: mapMakerUrl, name: mapMaker }
				})
				.get()
			return mapMaker
		})
		.get()
	return mapMakerInfo
}

function getMaps($: cheerio.Root, header: cheerio.Cheerio) {
	const gameModeTable = header.next().next()
	const mapRows = gameModeTable.find("tbody > tr")
	const mapInfo = mapRows
		.map((i, el) => {
			const mapInfo = $(el).find("td")
			const mapName = mapInfo.eq(1).text().trim()
			const gameModePrefix = mapPrefix.exec(mapInfo.eq(3).text())?.[0]
			const fileName = mapInfo.eq(3).text().trim()
			const dateAdded = dashedDateReg.exec(
				// This can be done just by trimming string
				mapInfo.eq(4).text()
			)?.[0]
			const isOfficial =
				valveReg.exec(mapInfo.eq(5).text())?.[0] === "Valve"
					? true
					: false

			const environment = mapInfo.eq(6).text().trim()

			return {
				mapName,
				gameModePrefix,
				fileName,
				dateAdded,
				isOfficial,
				environment,
			}
		})
		.get()

	mapInfo.shift()

	return mapInfo
}
