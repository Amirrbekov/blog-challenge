import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LoginForm } from "@/components/forms/login-auth-form";

export default function LoginPage() {
  return (
    <div className="relative container flex-1 shrink-0 items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/signUp"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-4 right-4 md:top-8 md:right-8"
        )}
      >
        Register
      </Link>

      <div className="text-primary relative hidden h-full flex-col p-10 lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />
        <div className="relative z-20 flex items-center text-lg font-medium text-white">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-white rounded-full" />
            <span>Blog App</span>
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2 text-white">
            <p className="text-lg">
              &quot;Welcome back! Sign in to continue reading and sharing
              amazing content with our community.&quot;
            </p>
          </blockquote>
        </div>
      </div>

      <div className="flex items-center justify-center lg:h-screen lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your credentials to sign in to your account
            </p>
          </div>
          <LoginForm />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don&#39;t have an account?{" "}
              <Link
                href="/signUp"
                className="font-medium hover:text-primary underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
