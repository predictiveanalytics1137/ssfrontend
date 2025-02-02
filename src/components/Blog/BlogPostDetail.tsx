import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Calendar, 
  User, 
  Clock, 
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Copy
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const BlogPostDetail = () => {
  const { slug } = useParams();

  // This would normally come from an API
  const post = {
    title: "What Is Automated Feature Engineering — And Why Should You Use It?",
    slug: "what-is-automated-feature-engineering",
    author: "The PACX Team",
    date: "June 17, 2024",
    readTime: 8,
    category: "Data Analysts",
    content: `
# What Is Automated Feature Engineering — And Why Should You Use It?

In a nutshell:

* Feature engineering is a crucial step in machine learning, but it can be time-consuming, inconsistent, and error-prone when done manually.
* Automated feature engineering tools can streamline the process by cleaning up data, constructing features, and surfacing relevant variables specific to your data and business problem.
* The benefits of automated feature engineering include efficiency, bias detection, consistency, and deeper exploration of data.
* PACX offers automated feature engineering capabilities, allowing for rapid model iteration and refinement without the need for extensive coding skills.

Your data team is getting excited about how machine learning can help them, but they're facing some obstacles. Traditional data science is time-consuming and requires expertise — which you and your team may need some upskilling to obtain.

## The basics of feature engineering

### What is a feature?

A feature is essentially an input variable for your machine-learning model. Features can vary drastically, from numeric values (like salary) to categories (such as colors or days of the week) and more. Your model's outputs will depend on which features you use to build your model.

### What is feature engineering?

Feature engineering is the strategic selection of features for your machine learning model. It includes creating, transforming, and selecting features.

[... rest of the content ...]
    `
  };

  const shareUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-teal-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/blog" className="hover:text-teal-600">Blog</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/blog/category/data-analysts" className="hover:text-teal-600">
            {post.category}
          </Link>
        </div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {post.title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {post.author}
                </div>
                <div className="text-xs text-gray-500">
                  Product Team
                </div>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Twitter className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Linkedin className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Facebook className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={copyToClipboard}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Copy className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose prose-lg max-w-none mb-12"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </motion.article>

        {/* Share Footer */}
        <div className="border-t pt-8 mt-12">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">Share this article</div>
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5 text-gray-600" />
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Twitter className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Linkedin className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Facebook className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={copyToClipboard}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Copy className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;