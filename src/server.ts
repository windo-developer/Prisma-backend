require("dotenv").config();
import { ApolloServer } from "apollo-server";

import schema from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.autorization),
      protectResolver,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server is running ${url}`));
