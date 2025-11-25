import { UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt";

const login = async (payload: { email: string; password: string }) => {
  console.log(payload);
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Incorrect Password");
  }

  const accessToken = generateToken(
    { email: user.email, role: user.role },
    "abcd",
    "1d"
  );

  const refreshToken = generateToken(
    { email: user.email, role: user.role },
    "abcd",
    "90d"
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const authServices = {
  login,
};
