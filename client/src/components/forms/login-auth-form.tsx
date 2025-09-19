"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { validatePassword, validateUsername } from "@/validation";
import { Input } from "../ui/input";
import useAuthStore from "@/stores/useAuthStore";
import { login } from "@/utils/authService";
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormData>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const initializeUser = useAuthStore((state) => state.initializeUser);
  const router = useRouter();

  const validateForm = (data: FormData): FormErrors => {
    return {
      username: validateUsername(data.username),
      password: validatePassword(data.password),
    };
  };

  const handleInputChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleInputBlur = (field: keyof FormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    const newErrors = validateForm(formData);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    setTouched({
      username: true,
      password: true,
    });

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    const hasErrors = Object.values(formErrors).some(
      (error) => error !== undefined
    );

    if (hasErrors) {
      return;
    }

    setIsLoading(true);

    try {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      const result = await login({
        username: formData.username,
        password: formData.password,
      });
      console.log(result);
      if (result) {
        localStorage.setItem("access_token", result.access_token);

        await initializeUser();
        router.push("/");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login error:", error);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="Username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.username}
              onChange={handleInputChange("username")}
              onBlur={handleInputBlur("username")}
              className={cn(
                touched.username &&
                  errors.username &&
                  "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {touched.username && errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.password}
              onChange={handleInputChange("password")}
              onBlur={handleInputBlur("password")}
              className={cn(
                touched.password &&
                  errors.password &&
                  "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {touched.password && errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
          <Button
            disabled={
              isLoading ||
              Object.values(errors).some((error) => error !== undefined)
            }
          >
            {isLoading && <LoaderIcon className="animate-spin mr-2 h-4 w-4" />}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
