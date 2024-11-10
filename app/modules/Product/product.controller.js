import { deleteFile, uploadFile } from "../../helpers/aws-s3";
import ProductModel from '../models/ProductModel';
import { uploadFile, deleteFile } from '../helpers/aws-s3';

// GET Products
export const getProducts = async (req, res) => {
  const { search, size, color, brand, 'new-arrival': newArrival } = req.query;

  const filter = {};
  if (search) {
    filter.$or = [
      { slug: { $regex: new RegExp(search, 'i') } },
      { productTitle: { $regex: new RegExp(search, 'i') } },
      { category: { $regex: new RegExp(search, 'i') } },
      { subcategory: { $regex: new RegExp(search, 'i') } },
      { childCategory: { $regex: new RegExp(search, 'i') } },
      { modelOfBrandValue: { $regex: new RegExp(search, 'i') } },
      { brandValue: { $regex: new RegExp(search, 'i') } },
      { productColorValue: { $regex: new RegExp(search, 'i') } },
      { productSizeValue: { $regex: new RegExp(search, 'i') } },
      { productFlagValue: { $regex: new RegExp(search, 'i') } },
    ];
  }

  if (size) filter.productSizeValue = size;
  if (color) filter.productColorValue = color;
  if (brand) filter.brandValue = brand;
  if (newArrival === 'true') {
    filter.createdAt = { $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) }; // Last 30 days
  }

  try {
    const products = await ProductModel.find(filter).populate('gallery');
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST New Product
export const createProduct = async (req, res) => {
  const {
    productTitle, shortDescription, fullDescription, specifications, returnPolicy, price,
    discountPrice, rewardPoints, stock, productCode, metaTitle, metaKeywords, metaDescription,
    specialOffer, hasVariants, category, brandValue, productColorValue, productSizeValue,
    productFlagValue, modelOfBrandValue, subcategory, childCategory, isNew, isRecommended
  } = req.body;

  try {
    // Handle file uploads
    let thumbnailUrl = '';
    if (req.files['thumbnail']) {
      const thumbnailFile = req.files['thumbnail'][0];
      const uploadedThumbnail = await uploadFile(thumbnailFile);
      thumbnailUrl = uploadedThumbnail.Location;
    }

    const galleryUrls = [];
    if (req.files['gallery']) {
      const galleryFiles = req.files['gallery'];
      for (const file of galleryFiles) {
        const uploadedGalleryImage = await uploadFile(file);
        galleryUrls.push(uploadedGalleryImage.Location);
      }
    }

    const newProduct = new ProductModel({
      productTitle, shortDescription, fullDescription, specifications, returnPolicy, price,
      discountPrice, rewardPoints, stock, productCode, metaTitle, metaKeywords, metaDescription,
      specialOffer, hasVariants, category, brandValue, productColorValue, productSizeValue,
      productFlagValue, modelOfBrandValue, subcategory, childCategory, isNew, isRecommended,
      thumbnailUrl, gallery: galleryUrls
    });

    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


// GET Request: Get product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id).populate("gallery");
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// PUT Request: Update product by ID
export const updateProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const formData = req.body; // Assuming you use middleware to parse form data

    const productData = await ProductModel.findById(id).populate("gallery");
    if (!productData) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const { productTitle, shortDescription, fullDescription, price, galleryItemIds } = formData;

    // Process the file uploads (e.g., thumbnail and gallery)
    const thumbnailFile = formData.thumbnail;
    let thumbnailUrl = "";
    if (thumbnailFile) {
      thumbnailUrl = `${Date.now()}-${thumbnailFile.name.replace(/\s/g, "-")}`;
      const thumbnailResult = await uploadFile(thumbnailFile, thumbnailUrl, thumbnailFile.type);
    }

    const galleryEntries = [];
    for (const id of galleryItemIds) {
      const galleryItem = await ProductGalleryModel.findById(id);
      galleryEntries.push(galleryItem._id);
    }

    for (const file of formData.gallery) {
      const galleryUrl = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
      const galleryUploadResult = await uploadFile(file, galleryUrl, file.type);
      const galleryEntry = await ProductGalleryModel.create({ image: galleryUrl });
      galleryEntries.push(galleryEntry._id);
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        productTitle,
        shortDescription,
        fullDescription,
        price,
        thumbnail: thumbnailUrl,
        gallery: galleryEntries,
      },
      { new: true, runValidators: true }
    ).populate("gallery");

    // Handle deletion of old files from S3
    if (productData.thumbnail !== updatedProduct.thumbnail) {
      await deleteFile(productData.thumbnail);
    }

    if (productData.gallery && productData.gallery.length > 0) {
      for (const galleryImage of productData.gallery) {
        const isSameImage = updatedProduct.gallery.map(gallery => gallery.image).includes(galleryImage.image);
        if (!isSameImage) {
          await deleteFile(galleryImage.image);
        }
      }
    }

    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE Request: Delete product by ID
export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productItem = await ProductModel.findById(id).populate("gallery");

    if (!productItem) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Delete thumbnail from S3 if it exists
    if (productItem.thumbnail) {
      await deleteFile(productItem.thumbnail);
    }

    // Delete gallery images from S3
    if (productItem.gallery && productItem.gallery.length > 0) {
      for (const galleryImage of productItem.gallery) {
        await deleteFile(galleryImage.image);
      }
    }

    // Delete product
    await ProductModel.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};