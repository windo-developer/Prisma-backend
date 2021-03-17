import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObjects = [];
        if (caption) {
          hashtagObjects = processHashtags(caption);
        }
        const fileUrl = await uploadToS3(file, loggedInUser.id, "avatars");
        return client.photo.create({
          data: {
            file: fileUrl,
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
