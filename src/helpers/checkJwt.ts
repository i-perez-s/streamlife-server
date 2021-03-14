import jwt from "jsonwebtoken";
export const checkJwt = async (token = "") => {
  try {
    if (token.length < 10) {
      return null;
    }

    const { user } = jwt.verify(token, process.env.TOKEN_SEED);
    return user;
  } catch (error) {
    return null;
  }
};
