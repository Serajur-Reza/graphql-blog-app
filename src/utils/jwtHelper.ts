import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

export const generateToken = (payload: { userId: number }, secret: Secret) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });

  return token;
};

export const getUserInfoFromToken = async (token: string) => {
  try {
    const userData = (await jwt.verify(token, config.jwt.secret as string)) as {
      userId: number;
    };

    return userData;
  } catch (error) {
    console.log(error);
  }
};

export const jwtHelper = {
  generateToken,
  getUserInfoFromToken,
};
