import * as bcrypt from "bcrypt";

import client from "../client";

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
    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return { ok: false, error: "user not found" };
      }
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return {
          ok: false,
          error: "Incorrect password",
        };
      }
    },
  },
};
