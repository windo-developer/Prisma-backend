require("dotenv").config();
import * as express from "express";
import * as logger from "morgan";
import { ApolloServer } from "apollo-server-express";

import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.authorization),
    };
  },
});

const app = express();
app.use(logger("tiny"));
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(
    `Apollo Express Server running on http://localhost:${PORT}/graphql`
  );
});
