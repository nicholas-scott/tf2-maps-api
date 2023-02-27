const typeDefs = `
type Query {
    getMap(fileName: ID!): GameMap
    getMaps(filter: MapFilter!): [GameMap!]!
    getMapTypes: [MapType!]!
}

type GameMap {
    fileName: ID!

    dateAdded: String!
    description: String!
    isOfficial: Boolean!
    isPyroland: Boolean!
    mapName: String!

    developers: [MapMaker!]!
    mapType: MapType!
}

type MapType{
    prefix: ID!
    
    dateAdded: String!
    isOfficial: Boolean!
    name: String!

    maps: [GameMap!]!
}

type MapMaker{
    id: ID!

    link: String!
    name: String!

    maps: [GameMap!]!
}

type UserError{
    message: String!
}

input MapFilter{
    isOfficial: Boolean
    isPyroVision: Boolean
    mapTypePrefix: String
}
`

export default typeDefs
