import client from "../../client";
import { protectResolver } from "../../users/users.utils";

//TODO: Pagination

export default {
  Query: {
    seeFeed: protectResolver(async (_, { offset }, { loggedInUser }) => {
      return await client.photo.findMany({
        take: 5,
        skip: offset,
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
