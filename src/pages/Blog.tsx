import React, { useEffect, useState } from 'react';
import { Calendar, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  title: string;
  date: string;
  author?: string;
  excerpt: string;
  slug: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Fetch blog posts from the content directory
    fetch('/content/blog/index.json')
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts); // Update to use data.posts
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
        // Fallback to default posts if fetch fails
        setPosts([
          {
            title: "Zero Trust Architecture: Why Traditional Security Perimeters Are No Longer Enough",
            date: "2024-03-15T13:35:00Z",
            author: "Security Team",
            excerpt: "Explore why modern organizations need to move beyond traditional security perimeters and embrace Zero Trust Architecture for comprehensive protection.",
            slug: "zero-trust-architecture-why-traditional-security-perimeters-are-no-longer-enough"
          }
        ]);
      });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#0a2463] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Security Insights & Updates
            </h1>
            <p className="text-xl text-gray-300">
              Stay informed about the latest in cybersecurity and web development
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    {post.author && (
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-[#0a2463]">
                    <Link to={`/blog/${post.slug}`} className="hover:text-[#3e92cc] transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[#3e92cc] font-semibold hover:text-[#0a2463] transition-colors"
                  >
                    Read More
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}