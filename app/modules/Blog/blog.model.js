// models/Blog.js
import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  writer: {
    type: String,
    required: true,
  },
  blogCategory: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  metaTitle: {
    type: String,
    required: true,
  },
  metaKeywords: {
    type: [String], // Assuming keywords are stored as an array of strings
    required: true,
  },
  metaDescription: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const BlogModel =   mongoose.model('blogs', BlogSchema);
export default BlogModel