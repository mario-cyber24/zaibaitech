import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Bookmark, ThumbsUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogPostData {
  title: string;
  date: string;
  author?: string;
  content: string;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch blog post content
    fetch(`/content/blog/${slug}.md`)
      .then(response => response.text())
      .then(content => {
        // For demo, using default post
        setPost({
          title: "Zero Trust Architecture: Why Traditional Security Perimeters Are No Longer Enough",
          date: "2024-03-15T13:35:00Z",
          author: "Security Team",
          content
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-[#0a2463] mb-4">
              {error || 'Post not found'}
            </h1>
            <Link
              to="/blog"
              className="inline-flex items-center text-[#3e92cc] hover:text-[#0a2463] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0a2463] to-[#1e3a8a] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              {post.author && (
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  {post.author}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Social Share Bar */}
            <div className="sticky top-4 z-10 bg-white rounded-lg shadow-lg p-4 mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#3e92cc] transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="hidden md:inline">Share</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#3e92cc] transition-colors">
                  <Bookmark className="w-5 h-5" />
                  <span className="hidden md:inline">Save</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#3e92cc] transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                  <span className="hidden md:inline">Like</span>
                </button>
              </div>
              <div className="text-sm text-gray-500">
                5 min read
              </div>
            </div>

            {/* Article Content */}
            <article className="bg-white rounded-lg shadow-lg p-8 md:p-12">
              <div className="blog-content">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </article>

            {/* Author Bio */}
            <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[#3e92cc] rounded-full flex items-center justify-center text-white">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0a2463] mb-2">{post.author}</h3>
                  <p className="text-gray-600">
                    Security expert at ZaiBai Technology, specializing in Zero Trust Architecture and modern security frameworks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}