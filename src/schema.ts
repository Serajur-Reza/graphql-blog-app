export const typeDefs = `#graphql

type Query {
    me: User,
    users: [User]
    posts: [Post]
    profile: Profile
}

type Mutation {
    signup(name: String!, email: String!, password: String!, bio: String): AuthPayload

    signin(email: String!, password: String!): AuthPayload

    addPost(post: PostInput!): PostPayload

    updatePost(postId: String!, post: PostInput!) : PostPayload

    deletePost(postId: String!) : PostPayload

    publishPost(postId: String!) : PostPayload
}


type AuthPayload {userError: String ,token: String}

type PostPayload {userError: String ,post: Post}

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
    posts: [Post]
}

type Profile{
    id: ID!,
    bio: String!,
    createdAt: String!,
    updatedAt:  String!,
    published: Boolean!
    user: User!
}

input PostInput {
title: String, content: String
}
`;
