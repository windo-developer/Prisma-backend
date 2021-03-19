import { gql } from "apollo-server-core";

export default gql`
  type Message {
    id: Int!
    user: User!
    room: Room!
    payload: String!
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Room {
    id: Int!
    unreadTotal: Int!
    users: [User]
    messages: [Message]
    createdAt: String!
    updatedAt: String!
  }
`;
