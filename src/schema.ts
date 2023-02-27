const typeDefs = `
type Query {
    getMaps(filter: MapFilter!): MapPayload!
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

type MapPayload{
    userErrors: [UserError!]!
    maps: [GameMap!]!
}

type UserError{
    message: String!
}

input MapFilter{
    fileName: String
    mapType: String
}
`

export default typeDefs
