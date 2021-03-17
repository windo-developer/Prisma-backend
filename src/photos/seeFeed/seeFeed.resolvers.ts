import client from "../../client";
import { protectResolver } from "../../users/users.utils";

//TODO: Pagination

export default {
  Query: {
    seeFeed: protectResolver(async (_, __, { loggedInUser }) => {
      return await client.photo.findMany({
        where: {
          OR: [
            {
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: loggedInUser.id, // this photo is mine
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  },
};
