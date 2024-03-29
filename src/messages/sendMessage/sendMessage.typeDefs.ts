import { gql } from "apollo-server-core";

export default gql`
  type SendMessageResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    sendMessage(payload: String!, roomId: Int, userId: Int): SendMessageResult!
  }
`;
