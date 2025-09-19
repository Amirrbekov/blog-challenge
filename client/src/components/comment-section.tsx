"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, Send, User } from "lucide-react";
import {
  getCommentsByBlogId,
  addComment,
  type Comment,
} from "@/lib/comment-data";

interface CommentSectionProps {
  blogPostId: string;
}

export function CommentSection({ blogPostId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(
    getCommentsByBlogId(blogPostId)
  );
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const comment = addComment(
      blogPostId,
      authorName.trim(),
      newComment.trim()
    );
    setComments((prev) => [...prev, comment]);
    setNewComment("");
    setAuthorName("");
    setIsSubmitting(false);
  };

  return (
    <section className="mt-12 border-t border-border pt-8">
      <div className="flex items-center gap-2 mb-8">
        <MessageCircle className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      <Card className="mb-8 bg-muted/30 border-border">
        <CardHeader>
          <h3 className="text-lg font-semibold text-foreground">
            Leave a Comment
          </h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="bg-background border-border focus:border-primary"
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] bg-background border-border focus:border-primary resize-none"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={
                isSubmitting || !newComment.trim() || !authorName.trim()
              }
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSubmitting ? (
                "Posting..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Post Comment
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="bg-background border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">
                        {comment.author}
                      </h4>
                      <span className="text-sm text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                    <p className="text-foreground leading-relaxed text-pretty">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
