import * as bcrypt from "bcrypt";

import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
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
        if (existingUser) {
          throw new Error("This username or password is already taken.");
        }
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
      } catch (error) {
        return error;
      }
    },
  },
};
