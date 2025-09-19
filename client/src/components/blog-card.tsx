import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group border-border/50 hover:border-accent/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-balance leading-tight">
          <Link
            href={`/blog/${post.id}`}
            className="hover:text-accent transition-colors group-hover:text-accent line-clamp-2"
          >
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-pretty leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.id}`}
          className="text-accent hover:text-accent/80 font-medium underline underline-offset-4 transition-colors inline-flex items-center gap-1 group-hover:gap-2"
        >
          Read more →
        </Link>
      </CardContent>
    </Card>
  );
}
