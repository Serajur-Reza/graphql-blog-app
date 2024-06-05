export const typeDefs = `#graphql

type Query {
    me: User,
    users: [User]
    posts: [Post]
    profile(userId: ID!): Profile
}

type Mutation {
    signup(name: String!, email: String!, password: String!, bio: String): AuthPayload

    signin(email: String!, password: String!): AuthPayload
}


type AuthPayload {userError: String ,token: String}

type Post {
    id: ID!,
    title: String!,
    content: String!
    author: User,
    createdAt: String!,
    updatedAt:  String!,
    published: Boolean!
}

type User{
    id: ID!,
    name: String!,
    email:String!
    createdAt: String!,
    updatedAt:  String!,
    published: Boolean!
    post: [Post]
}

type Profile{
    id: ID!,
    bio: String!,
    createdAt: String!,
    updatedAt:  String!,
    published: Boolean!
    user: User!
}
`;
