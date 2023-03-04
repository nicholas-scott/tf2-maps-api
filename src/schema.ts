const typeDefs = `
type Query {
    getMap(fileName: ID!): GameMap
    getMaps(filter: MapFilter!): [GameMap!]!
    getGameModes: [GameMode!]!
}

type GameMap {
    fileName: ID!

    dateReleased: String!
    dateUpdated: String!
    description: String!
    isOfficial: Boolean!
    isPyroland: Boolean!
    mapName: String!

    developers: [MapMaker!]!
    gameMode: GameMode!
}

type GameMode{
    id: ID!
    
    dateAdded: String
    description: String!
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
    filePrefix: String
}
`

export default typeDefs
