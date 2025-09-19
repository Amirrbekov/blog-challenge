"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/utils/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      router.push("/signIn");
    }
  };

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-foreground hover:text-accent transition-colors"
        >
          BlogApp
        </Link>
        <nav className="flex items-center gap-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-accent text-accent-foreground hover:bg-accent/90 border-accent"
          >
            Logout
          </Button>
        </nav>
      </div>
    </header>
  );
}
