require("dotenv").config();
import * as express from "express";
import * as logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import * as http from "http";

import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";
import * as pubsub from "./pubsub";

const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      return {
        loggedInUser: await getUser(req.headers.authorization),
      };
    }
  },
});

const app = express();
app.use(logger("tiny"));
app.use(
  "/static",
  express.static("uploads")
  // graphqlUploadExpress({ maxFieldSize: 10000000, maxFiles: 10 })
);

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(
    `Apollo Express Server running on http://localhost:${PORT}/graphql`
  );
});
