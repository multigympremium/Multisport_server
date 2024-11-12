import express from 'express';
import { createBlog, deleteBlogById, getBlogById, getBlogs, updateBlogById } from './blog.controller.js';

const blogRoutes = express.Router();

// Define routes and attach controllers
blogRoutes.get('/', getBlogs);
blogRoutes.get('/:id', getBlogById);
blogRoutes.post('/',  createBlog);
blogRoutes.put('/:id',  updateBlogById);
blogRoutes.delete('/:id', deleteBlogById);

export default blogRoutes;
