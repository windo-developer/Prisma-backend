import client from "../../client";
import { protectResolver } from "../users.utils";

export default {
  Query: {
    me: protectResolver((_, __, { loggedInUser }) => {
      return client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
      });
    }),
  },
};
