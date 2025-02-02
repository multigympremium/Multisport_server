import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import BlogModel from "./blog.model.js";

// Get all blogs with optional search
export const getBlogs = async (req, res) => {
  const { search } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { title: new RegExp(search, "i") },
      { writer: new RegExp(search, "i") },
      { blogCategory: new RegExp(search, "i") },
      { slug: new RegExp(search, "i") },
    ];
  }

  try {
    const blogs = await BlogModel.find(filter);
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get a blog by ID
export const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      fullDescription,
      writer,
      blogCategory,
      metaTitle,
      metaKeywords,
      metaDescription,
      slug,
    } = req.body;
    const image = req.files?.image;

    if (
      !title ||
      !shortDescription ||
      !fullDescription ||
      !writer ||
      !blogCategory ||
      !image ||
      !metaTitle ||
      !metaKeywords ||
      !metaDescription
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    let thumbnailUrl = "";
    if (image) {
      thumbnailUrl = `blog/${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      await uploadFile(image, thumbnailUrl, image.type);
    }

    const blogData = {
      writer,
      blogCategory,
      shortDescription,
      fullDescription,
      image: thumbnailUrl,
      title,
      metaTitle,
      metaKeywords,
      metaDescription,
      slug,
    };

    const newBlog = await BlogModel.create(blogData);
    res.status(200).json({ success: true, data: newBlog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a blog by ID
export const updateBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const existingBlog = await BlogModel.findById(id);

    if (!existingBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const {
      title,
      shortDescription,
      fullDescription,
      writer,
      blogCategory,
      metaTitle,
      metaKeywords,
      metaDescription,
      slug,
    } = req.body;
    const image = req.files?.image;

    let thumbnailUrl = existingBlog.image;
    if (image) {
      thumbnailUrl = `blog/${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      await uploadFile(image, thumbnailUrl, image.type);
    }

    const updatedBlogData = {
      writer,
      blogCategory,
      shortDescription,
      fullDescription,
      image: thumbnailUrl,
      title,
      metaTitle,
      metaKeywords,
      metaDescription,
      slug,
    };

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, updatedBlogData, {
      new: true,
    });

    if (existingBlog.image !== thumbnailUrl) {
      await deleteFile(existingBlog.image);
    }

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a blog by ID
export const deleteBlogById = async (req, res) => {
  const { id } = req.params;

  console.log(id, "id");

  try {
    const blog = await BlogModel.findByIdAndDelete(id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    await deleteFile(blog.image);
    res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
