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

	const mapMakers = fetchMapMakers($)
	const maps = fetchMaps($)
	const gameModes = fetchGameModes($)

	return { mapMakers, maps, gameModes }
}

function fetchGameModes($: cheerio.Root) {
	const mapTitleHeader = $("h2 > span")
		.filter((i, el) => {
			return $(el).text() === "Map types"
		})
		.parent()

	const gameModeTable = mapTitleHeader.next().next()
	const gameModeRows = gameModeTable.find("tbody > tr")
	const gameModeInfo = gameModeRows
		.map((i, el) => {
			const gameModeTdRow = $(el).find("td")
			const gameModeName = gameModeTdRow.eq(0).text().trim()
			const gameModePrefix = gameModeTdRow.eq(1).text().trim()
			const gameModeDate = dashedDateReg.exec(
				// This can be done just by trimming string
				gameModeTdRow.eq(2).text()
			)?.[0]
			return { gameModeName, gameModePrefix, gameModeDate }
		})
		.get()

	//First tr is empty
	gameModeInfo.shift()
	return gameModeInfo
}

export function fetchMapMakers($: cheerio.Root) {
	const mapTitleHeader = $("h2 > span")
		.filter((i, el) => {
			return $(el).text() === "Maps"
		})
		.parent()

	const gameModeTable = mapTitleHeader.next().next()
	const mapInfoRows = gameModeTable.find("tbody > tr")
	const mapMakerInfo = mapInfoRows
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

export function fetchMaps($: cheerio.Root) {
	const mapTitleHeader = $("h2 > span")
		.filter((i, el) => {
			return $(el).text() === "Maps"
		})
		.parent()

	const gameModeTable = mapTitleHeader.next().next()
	const mapInfoRows = gameModeTable.find("tbody > tr")
	const mapInfo = mapInfoRows
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
