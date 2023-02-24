const typeDefs = `
type Query {
    hello: String
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
`

export default typeDefs
