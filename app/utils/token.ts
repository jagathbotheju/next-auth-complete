import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export const generateToken = (payload: any) => {
  const secret = "3p83TM1G36qrJAWUR/v9GkmT8wePHDT/Y3L5OmXkE0k";
  return jwt.sign(payload, secret, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  const secret = "3p83TM1G36qrJAWUR/v9GkmT8wePHDT/Y3L5OmXkE0k";
  return jwt.verify(token, secret);
};
