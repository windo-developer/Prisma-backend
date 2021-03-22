require("dotenv").config();
import * as express from "express";
import * as logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import * as http from "http";

import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.authorization),
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async (connectionParams: any, webSocket) => {
      if (!connectionParams.authorization) {
        throw new Error("You can't listen.");
      }
      // console.log(connectionParams.authorization);
      const loggedInUser = await getUser(connectionParams.authorization);
      return {
        loggedInUser,
      };
    },
  },
});

const app = express();
app.use(logger("tiny"));
// express static upload, this server changed 'AWS(S3)', no longer used '/static'
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
