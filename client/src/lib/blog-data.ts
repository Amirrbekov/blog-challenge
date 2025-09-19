export interface BlogPost {
  id: string;
  title: string;
  author: string;
  content: string;
  excerpt: string;
  publishedAt: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 15",
    author: "Sarah Johnson",
    content: `Next.js 15 brings exciting new features that make building React applications even more powerful and efficient. In this comprehensive guide, we'll explore the latest updates and how they can improve your development workflow.

The new App Router has revolutionized how we think about routing in Next.js applications. With its file-based routing system, creating complex navigation structures has never been easier. The router now supports nested layouts, loading states, and error boundaries out of the box.

Server Components are another game-changer in Next.js 15. They allow us to render components on the server, reducing the JavaScript bundle size sent to the client and improving performance. This is particularly beneficial for data-heavy applications where we can fetch data directly in our components.

The improved TypeScript support makes development more robust and catches errors at compile time. The new type inference system is smarter and provides better autocomplete suggestions, making the developer experience much smoother.

Performance optimizations in Next.js 15 include better image optimization, improved code splitting, and enhanced caching strategies. These improvements result in faster page loads and better user experiences across all devices.`,
    excerpt:
      "Discover the powerful new features in Next.js 15 and how they can transform your React development experience.",
    publishedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "The Art of Clean Code",
    author: "Michael Chen",
    content: `Writing clean code is more than just following syntax rules—it's about creating software that is readable, maintainable, and scalable. Clean code tells a story, and every developer should strive to be a good storyteller.

The first principle of clean code is clarity. Your code should be self-documenting, meaning that another developer (or future you) can understand what it does without extensive comments. This means using descriptive variable names, breaking complex functions into smaller ones, and organizing your code logically.

Consistency is another crucial aspect. Whether it's naming conventions, file structure, or coding patterns, maintaining consistency across your codebase makes it easier to navigate and understand. Establish coding standards early in your project and stick to them.

The DRY principle (Don't Repeat Yourself) helps reduce redundancy and makes your code more maintainable. When you find yourself copying and pasting code, it's time to extract that functionality into a reusable function or component.

Testing is an integral part of clean code. Well-tested code is more reliable and gives you confidence when making changes. Write tests that are clear, focused, and cover the important functionality of your application.

Remember, clean code is not about being clever or showing off your programming skills. It's about writing code that serves its purpose effectively and can be easily understood and modified by others.`,
    excerpt:
      "Learn the fundamental principles of writing clean, maintainable code that stands the test of time.",
    publishedAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Modern CSS Techniques for 2024",
    author: "Emma Rodriguez",
    content: `CSS has evolved tremendously over the past few years, introducing powerful new features that make styling web applications more intuitive and efficient. Let's explore the modern CSS techniques that every developer should know in 2024.

CSS Grid and Flexbox have become the standard for creating layouts. Grid excels at two-dimensional layouts, while Flexbox is perfect for one-dimensional arrangements. Understanding when to use each will dramatically improve your layout skills.

CSS Custom Properties (variables) allow you to create more maintainable stylesheets. They're particularly useful for theming, responsive design, and creating design systems. Unlike preprocessor variables, CSS custom properties are dynamic and can be changed at runtime.

Container queries are a game-changer for responsive design. Instead of relying solely on viewport dimensions, you can now style components based on their container's size. This makes components truly modular and reusable across different contexts.

The :has() pseudo-class, often called the "parent selector," allows you to style elements based on their descendants. This opens up new possibilities for creating dynamic and interactive designs without JavaScript.

Modern CSS also includes powerful animation capabilities with CSS animations and transitions. The new @scroll-timeline and view transitions API make it easier to create smooth, performant animations that enhance user experience.

Logical properties like margin-inline and padding-block make your CSS more internationalization-friendly by adapting to different writing modes and text directions automatically.`,
    excerpt:
      "Explore the latest CSS features and techniques that are shaping modern web design in 2024.",
    publishedAt: "2024-01-05",
  },
  {
    id: "4",
    title: "Building Scalable React Applications",
    author: "David Kim",
    content: `As React applications grow in complexity, maintaining scalability becomes crucial for long-term success. This guide covers essential patterns and practices for building React applications that can scale with your team and user base.

Component architecture is the foundation of scalable React applications. Design your components to be reusable, composable, and focused on a single responsibility. Create a clear hierarchy where complex components are built from simpler, more focused ones.

State management becomes critical as your application grows. While React's built-in state is sufficient for simple applications, larger apps benefit from dedicated state management solutions like Redux Toolkit, Zustand, or React Query for server state.

Code organization and folder structure play a vital role in maintainability. Group related files together, separate concerns clearly, and establish consistent naming conventions. Consider feature-based organization over file-type-based organization for larger applications.

Performance optimization is essential for scalability. Implement code splitting to reduce initial bundle sizes, use React.memo and useMemo judiciously, and consider virtualization for large lists. Monitor your application's performance regularly and address bottlenecks proactively.

Testing strategies should evolve with your application. Implement unit tests for individual components, integration tests for feature workflows, and end-to-end tests for critical user journeys. A good testing strategy gives you confidence when refactoring and adding new features.

Documentation and team practices become increasingly important as your team grows. Establish clear coding standards, use TypeScript for better type safety, and maintain up-to-date documentation for your components and APIs.`,
    excerpt:
      "Master the essential patterns and practices for building React applications that scale with your team and users.",
    publishedAt: "2023-12-28",
  },
  {
    id: "5",
    title: "The Future of Web Development",
    author: "Lisa Thompson",
    content: `Web development is constantly evolving, with new technologies and paradigms emerging regularly. As we look toward the future, several trends are shaping how we build and deploy web applications.

Edge computing is revolutionizing how we think about web application architecture. By moving computation closer to users, we can achieve better performance and reduced latency. Platforms like Vercel Edge Functions and Cloudflare Workers are making edge computing accessible to all developers.

WebAssembly (WASM) is opening new possibilities for web applications. It allows us to run high-performance code written in languages like Rust, C++, and Go directly in the browser. This is particularly exciting for applications that require intensive computation or want to reuse existing native libraries.

The rise of AI and machine learning in web development is transforming how we build applications. From AI-powered code generation to intelligent user interfaces that adapt to user behavior, AI is becoming an integral part of the development process.

Progressive Web Apps (PWAs) continue to blur the line between web and native applications. With improved offline capabilities, push notifications, and native-like performance, PWAs offer a compelling alternative to traditional mobile apps.

Serverless architecture is becoming the default for many applications. The ability to scale automatically, pay only for what you use, and focus on business logic rather than infrastructure management makes serverless an attractive option for modern web applications.

The developer experience continues to improve with better tooling, faster build systems, and more intuitive frameworks. Tools like Vite, esbuild, and SWC are making development faster and more enjoyable.

Sustainability in web development is gaining attention as we become more conscious of the environmental impact of our digital products. Optimizing for performance not only improves user experience but also reduces energy consumption.`,
    excerpt:
      "Explore the emerging trends and technologies that are shaping the future of web development.",
    publishedAt: "2023-12-20",
  },
];

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
