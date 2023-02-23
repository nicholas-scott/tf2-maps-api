const typeDefs = `
type Query {
    hello: String
}

type Map {
    developers: [MapMaker!]!
    mapType: MapType!
}

type MapType{
    maps: [Map!]!
}

type MapMaker{
    maps: [Map!]!
}
`

export default typeDefs
