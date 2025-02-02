import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  Tag
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Blog Post Card Component
interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: number;
  image?: string;
  content: string;
}

const BlogPostCard = ({ post }: { post: BlogPost }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
  >
    {post.image && (
      <img 
        src={post.image} 
        alt={post.title}
        className="w-full h-48 object-cover rounded-t-xl" 
      />
    )}
    <div className="p-6">
      <div className="flex items-center gap-4 mb-3">
        <span className="text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
          {post.category}
        </span>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Calendar className="w-4 h-4" />
          {post.date}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">
        <Link to={`/blog/${post.slug}`} className="hover:text-teal-600">
          {post.title}
        </Link>
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <span className="text-sm text-gray-600">{post.author}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          {post.readTime} min read
        </div>
      </div>
    </div>
  </motion.div>
);

// Blog List Page
const BlogList = () => {
  const blogPosts = [
    {
      title: "What Is Automated Feature Engineering — And Why Should You Use It?",
      slug: "what-is-automated-feature-engineering",
      excerpt: "Discover how automated feature engineering can help you uncover the most important patterns in your data far faster. Streamline your process.",
      category: "Data Analysts",
      date: "June 17, 2024",
      author: "The PACX Team",
      readTime: 8,
      // image: "/api/placeholder/800/400",
      image: "https://img.freepik.com/free-vector/illustration-social-media-concept_53876-18383.jpg?semt=ais_incoming",
      content: `
      In a nutshell:
      • Feature engineering is a crucial step in machine learning, but it can be time-consuming, inconsistent, and error-prone when done manually.
      • Automated feature engineering tools can streamline the process by cleaning up data, constructing features, and surfacing relevant variables.
      • The benefits include efficiency, bias detection, consistency, and deeper exploration of data.
      `
    },
    // Add more blog posts here
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-teal-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/blog" className="hover:text-teal-600">Blog</Link>
          <ChevronRight className="w-4 h-4" />
          <span>Data Analysts</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Latest Blog Posts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our latest insights, tutorials, and updates about automated machine learning
            and predictive analytics.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['All', 'Data Analysts', 'Machine Learning', 'Case Studies', 'Tutorials'].map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-colors"
            >
              <Tag className="w-4 h-4 inline-block mr-2" />
              {tag}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <BlogPostCard key={index} post={post} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            Load More Posts
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogList;