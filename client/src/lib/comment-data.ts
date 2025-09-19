export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  blogPostId: string;
}

// Sample comment data
const comments: Comment[] = [
  {
    id: "1",
    author: "Sarah Johnson",
    content:
      "This is such an insightful post! I've been struggling with this exact issue and your solution really helped me understand the concept better. Thank you for sharing your expertise.",
    createdAt: "2024-01-15T10:30:00Z",
    blogPostId: "1",
  },
  {
    id: "2",
    author: "Mike Chen",
    content:
      "Great explanation! I would love to see a follow-up post diving deeper into the advanced techniques you mentioned.",
    createdAt: "2024-01-16T14:22:00Z",
    blogPostId: "1",
  },
  {
    id: "3",
    author: "Emily Rodriguez",
    content:
      "I implemented this approach in my project and it worked perfectly. The step-by-step breakdown made it so easy to follow.",
    createdAt: "2024-01-17T09:15:00Z",
    blogPostId: "2",
  },
  {
    id: "4",
    author: "David Kim",
    content:
      "Excellent post! This saved me hours of debugging. Your writing style is very clear and easy to understand.",
    createdAt: "2024-01-18T16:45:00Z",
    blogPostId: "3",
  },
];

export function getCommentsByBlogId(blogId: string): Comment[] {
  return comments.filter((comment) => comment.blogPostId === blogId);
}

export function addComment(
  blogPostId: string,
  author: string,
  content: string
): Comment {
  const newComment: Comment = {
    id: (comments.length + 1).toString(),
    author,
    content,
    createdAt: new Date().toISOString(),
    blogPostId,
  };
  comments.push(newComment);
  return newComment;
}
