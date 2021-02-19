import bcrypt from "bcrypt";

import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      // check username or email already on DB
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });
      const hashedPassword = await bcrypt.hash(password, 10);
      return client.user.create({
        data: {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: hashedPassword,
        },
      });
    },
  },
};
