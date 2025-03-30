"use server";

import { GetUserByPassword } from "@/app/actions/users/GetUserByPassword";
import { HashPassword } from "@/helpers/HashPassword";
import { signIn } from "@/auth";
import { InvalidLoginError } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { loginSchema } from "@/app/schema";
import { ZodError } from "zod";
import { AuthError } from "next-auth";

export async function login(username: string, password: string) {
  const user = await GetUserByPassword(username, password);

  if (!user) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword };
}

export async function signin(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const result = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });
    return { success: true, message: "Đăng nhập thành công" };
  } catch (error: any) {
    if (error.cause.err instanceof InvalidLoginError) {
      return { success: false, message: "Tài khoản hoặc mật khẩu không chính xác" };
    } else {
      return { success: false, message: "Tài khoản hoặc mật khẩu không chính xác" };
    }
  }
}
