import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObjects = [];
        if (caption) {
          // parse hashtags
          const hashtags = caption.match(/#[\w]+/g);
          hashtagObjects = hashtags.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag },
          }));
          console.log(hashtagObjects);
        }
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObjects.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObjects,
              },
            }),
          },
        });
      }
    ),
  },
};
