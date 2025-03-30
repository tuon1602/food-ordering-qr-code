import z from "zod";

//this is just an example, you should export every schema then use in your app globally
export const anySchema = z.object({
  firstName: z.string().min(1).max(18),
  lastName: z.string().min(1).max(18),
  phone: z.string().min(10).max(14).optional(),
  email: z.string().email(),
  url: z.string().url().optional(),
});

export const actionSchema = z.object({
  name: z
    .string({ required_error: "Your name is required" })
    .min(4, { message: "Your name must be at least 4 characters" }),
  password: z
    .string({ required_error: "Your password is required" })
    .min(4, { message: "Your password be at least 4 characters" }),
});

export const loginSchema = z.object({
  username: z.string({ required_error: "Tài khoản không được để trống" })
    .min(1, "Tài khoản không được để trống"),
  password: z.string({ required_error: "Mật khẩu không được để trống" })
    .min(1, "Mật khẩu không được để trống")
});
