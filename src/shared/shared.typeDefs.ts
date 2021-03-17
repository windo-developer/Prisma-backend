// you don't want the mutation code to be repeated "XXXXXResult!"
// you can replace it "MutationResponse"

/* type Mutation {
    editComment(id: Int!, payload: String!): MutationResponse!
}
*/

import { gql } from "apollo-server";

export default gql`
  type MutationResponse {
    ok: Boolean!
    error: String
  }
`;
