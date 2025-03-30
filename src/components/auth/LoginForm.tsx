"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { signin } from "@/app/actions/authentication/auth";


interface SignInResponse {
  message?: string;
  success?: boolean;
}

const initialState: SignInResponse = {
  message: "",
  success: false,
};

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState<SignInResponse, FormData>(
    signin,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      router.push("/dashboard");
    }
    if(state.success === false){
      formRef.current?.reset();
    }
  }, [state.success, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>Sử dụng tài khoản đã được cấp</CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Tài khoản</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="tuan69878"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
                {state?.success === false && (
                  <p className="text-sm text-red-500">
                    {state?.message}
                  </p>
                )}
              </div>
              <Button type="submit">Đăng nhập</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
