"use server";

import { GetUserByPassword } from "@/app/actions/users/GetUserByPassword";
import { HashPassword } from "@/helpers/HashPassword";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(username: string, password: string) {
  try {
    const user = await GetUserByPassword(username, password);

    if (!user) {
      return { error: "Invalid credentials" };
    }

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Login failed" };
  }
}

export async function signin(formData: any) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    throw new Error("Missing credentials");
  }

  try {
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: "Invalid credentials" };
    }

    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error("Signin error:", error);
    return { error: "An error occurred during sign in" };
  }
}
