import { getBlogPost } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import { notFound } from "next/navigation";
import { CommentSection } from "@/components/comment-section";
import { Header } from "@/components/layout/header";

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = getBlogPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-6 hover:bg-muted group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Button>
          </Link>

          <article>
            <header className="mb-8 pb-6 border-b border-border">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium text-foreground">
                    {post.author}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              <div className="text-foreground leading-relaxed text-lg">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-6 text-pretty">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </div>

        <CommentSection blogPostId={params.id} />

        <div className="border-t border-border pt-8 mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <Link href="/">
              <Button
                variant="outline"
                className="hover:bg-muted group bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to All Posts
              </Button>
            </Link>
            <div className="text-sm text-muted-foreground">
              Enjoyed this post? Share it with others!
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  // This would typically come from your data source
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];
}
