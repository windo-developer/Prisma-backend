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
          throw new Error("This username or email is already taken.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error: "Can't create account.",
        };
      }
    },
  },
};
