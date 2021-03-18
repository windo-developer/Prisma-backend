import { gql } from "apollo-server-core";

export default gql`
  type Message {
    id: Int!
    user: User!
    room: Room!
    payload: String!
    createdAt: String!
    updatedAt: String!
  }
  type Room {
    id: Int!
    user: [User]
    message: [Message]
    createdAt: String!
    updatedAt: String!
  }
`;
