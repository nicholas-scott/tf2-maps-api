const typeDefs = `
type Query {
    getMap(fileName: ID!): GameMap
    getMaps(filter: MapFilter!): [GameMap!]!
    getGameModes: [GameMode!]!
}

type Mutation {
    login(input: CredentialsInput!): AuthPayload!
    registerUser(input: CredentialsInput!): AuthPayload!
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

type AuthPayload{
    userErrors: [UserError!]!
    token: String
}

input MapFilter{
    isOfficial: Boolean
    isPyroVision: Boolean
    filePrefix: String
}

input CredentialsInput{
    email: String!
    password: String!
}
`

export default typeDefs
