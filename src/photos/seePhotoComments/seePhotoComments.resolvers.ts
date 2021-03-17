import client from "../../client";

//TODO: Pagnation (cursor)

export default {
  Query: {
    seePhotoComments: (_, { id }) => {
      return client.comment.findMany({
        where: {
          photoId: id,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    },
  },
};
