"use client";

import { getAllBlogPosts } from "@/lib/blog-data";
import { BlogCard } from "@/components/blog-card";
import { Header } from "@/components/layout/header";
import useAuthStore from "@/stores/useAuthStore";

export default function BlogListPage() {
  const { user } = useAuthStore();
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Latest Blog Posts
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover insights, tutorials, and thoughts on modern web development
            from our community of experts
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No blog posts available yet.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
