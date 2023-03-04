import cheerio, { load } from "cheerio"
import { dashedDateReg, mapTypeReg, valveReg } from "../util/regularExpressions"

const url = "https://wiki.teamfortress.com/wiki/List_of_maps"

export async function fetchMapData() {
	const resp = await fetch(url)
	const text = await resp.text()
	const $ = load(text)

	//Select all h2 > span elements. These h2s are next to the grids for map types and maps
	const headers = $("h2 > span").filter((i, el) => {
		return $(el).text() === "Map types" || $(el).text() === "Maps"
	})

	//Get the first header from headers and print the text
	const mapTypesHeader = headers.eq(0).parent()
	const mapsHeader = headers.eq(1).parent()

	//Get the mapTypes and maps, and map developers
	const mapTypes = getMapTypes($, mapTypesHeader)
	const maps = getMaps($, mapsHeader)
	const mapMakers = getMapMakers($, mapsHeader)
	console.log(maps)
	return { mapTypes, maps, mapMakers }
}

function getMapTypes($: cheerio.Root, header: cheerio.Cheerio) {
	const mapTypeTable = header.next().next()
	const mapRows = mapTypeTable.find("tbody > tr")
	const mapInfo = mapRows
		.map((i, el) => {
			const mapTypeInfo = $(el).find("td")
			const mapTypeName = mapTypeInfo.eq(0).text().trim()
			const mapTypePrefix = mapTypeInfo.eq(1).text().trim()
			const mapTypeDate = dashedDateReg.exec(
				// This can be done just by trimming string
				mapTypeInfo.eq(2).text()
			)?.[0]
			return { mapTypeName, mapTypePrefix, mapTypeDate }
		})
		.get()

	//First tr is empty
	mapInfo.shift()
	return mapInfo
}

function getMapMakers($: cheerio.Root, header: cheerio.Cheerio) {
	const mapTypeTable = header.next().next()
	const mapRows = mapTypeTable.find("tbody > tr")
	const mapInfo = mapRows
		.map((i, el) => {
			const mapInfo = $(el).find("td")
			const mapMakers = mapInfo
				.eq(5)
				.find("a")
				.map((i, el) => {
					const mapMaker = $(el).text().trim()
					return mapMaker
				})
		})
		.get()
	return []
}

function getMaps($: cheerio.Root, header: cheerio.Cheerio) {
	const mapTypeTable = header.next().next()
	const mapRows = mapTypeTable.find("tbody > tr")
	const mapInfo = mapRows
		.map((i, el) => {
			const mapInfo = $(el).find("td")
			const mapName = mapInfo.eq(1).text().trim()
			const mapTypePrefix = mapTypeReg.exec(mapInfo.eq(3).text())?.[0]
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
				mapTypePrefix,
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
