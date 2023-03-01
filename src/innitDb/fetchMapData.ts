import cheerio, { load } from "cheerio"
import { dashedDateYYYYMMDD } from "../util/regularExpressions"

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

	return { mapTypes }
}

function getMapTypes($: cheerio.Root, header: cheerio.Cheerio) {
	const mapTable = header.next().next()
	const mapRows = mapTable.find("tbody > tr")
	const mapInfo = mapRows
		.map((i, el) => {
			const mapTypeInfo = $(el).find("td")
			const mapTypeName = mapTypeInfo.eq(0).text().trim()
			const mapTypePrefix = mapTypeInfo.eq(1).text().trim()
			const mapTypeDate = dashedDateYYYYMMDD.exec(
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
