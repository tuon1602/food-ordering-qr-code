"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
export const GetUserByPassword = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  const match = await bcrypt.compare(password, user?.password as string);
  if (match) {
    return user;
  } else {
    return null;
  }
};
