const typeDefs = `
type Query {
    getMap(input: MapFilter!): MapPayload!
}

type Map {
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
    typeName: String!

    maps: [Map!]!
}

type MapMaker{
    id: ID!

    link: String!
    name: String!

    maps: [Map!]!
}

type MapPayload{
    userErrors: [UserError!]!
    maps: [Map!]!
}

type UserError{
    message: String!
}

input MapFilter{
    fileName: String!
    mapType: String!
}
`

export default typeDefs
