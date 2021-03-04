import * as bcrypt from "bcrypt";
import client from "../../client";
import { protectResolver } from "../users.utils";

const resolverFunc = async (
  _,
  { firstName, lastName, username, email, password: newPassword },
  { loggedInUser, protectResolver }
) => {
  protectResolver(loggedInUser);
  let hashedPassword = null;
  if (newPassword) {
    hashedPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      firstName,
      lastName,
      username,
      email,
      ...(hashedPassword && { password: hashedPassword }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Couldn't update Profile",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectResolver(resolverFunc),
  },
};
