require("dotenv").config();
import { ApolloServer } from "apollo-server";

import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.authorization),
      protectResolver,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server is running ${url}`));
