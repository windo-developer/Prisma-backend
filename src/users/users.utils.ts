import * as jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const verifiedToken: any = await jwt.verify(token, process.env.SECRET_KEY);
    if ("id" in verifiedToken) {
      const user = await client.user.findUnique({
        where: { id: verifiedToken["id"] },
      });
      if (user) {
        return user;
      }
    }
    return null;
  } catch {
    return null;
  }
};

export const protectResolver = (ourResolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "Please login to first",
    };
  }
  return ourResolver(root, args, context, info);
};
