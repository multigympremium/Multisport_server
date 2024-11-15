import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import ProductModel from "./product.model.js";
import ProductGalleryModel from "./productGallery.model.js";

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
    productFlagValue, subcategory, childCategory, isNew, isRecommended, 
  } = req.body;

  try {
    // Handle file uploads
    // let thumbnailUrl = '';
    // if (req.files['thumbnail']) {
    //   const thumbnailFile = req.files['thumbnail'][0];
    //   const uploadedThumbnail = await uploadFile(thumbnailFile);
    //   thumbnailUrl = uploadedThumbnail.Location;
    // }

    // const galleryUrls = [];
    // if (req.files['gallery']) {
    //   const galleryFiles = req.files['gallery'];
    //   for (const file of galleryFiles) {
    //     const uploadedGalleryImage = await uploadFile(file);
    //     galleryUrls.push(uploadedGalleryImage.Location);
    //   }
    // }


    // Checking required fields
    if (
      !productTitle ||
      !shortDescription ||
      !fullDescription ||
      !price ||
      !productCode ||
      !category ||
      !brandValue ||
      !subcategory,
      !returnPolicy,
      !specifications
    ) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    // Uploading the thumbnail file
    const thumbnailFile = req.files.thumbnail;
    let thumbnailUrl = "";
    if (thumbnailFile && thumbnailFile.size > 0) {
      thumbnailUrl = `${Date.now()}-${thumbnailFile.name.replace(/\s/g, "-")}`;
      const thumbnailResult = await uploadFile(
        thumbnailFile,
        thumbnailUrl,
        thumbnailFile.type
      );
      console.log(thumbnailResult, "thumbnailResult");
    }

    // Uploading gallery files
    const galleryFiles = req.files['gallery'];// Handle multiple files
    let galleryEntries = [];
    console.log(galleryFiles, "galleryFiles");
    for (const file of galleryFiles) {
      console.log(file, "file", typeof file, file instanceof File);
      const galleryUrl = `${Date.now()}-${file?.name.replace(/\s/g, "-")}`;
      const galleryUploadResult = await uploadFile(file, galleryUrl, file.type);

      console.log(galleryUploadResult, "galleryUploadResult");

      const galleryEntry = await ProductGalleryModel.create({
        image: galleryUrl,
      });
      console.log(galleryEntry, "galleryEntry");
      galleryEntries.push(galleryEntry._id); // Save the gallery entry IDs
    }

    const submitData = {
      productTitle,
      shortDescription,
      fullDescription,
      returnPolicy,
      specification : specifications,
      price: parseFloat(price),
      discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
      rewardPoints: rewardPoints ? parseInt(rewardPoints) : undefined,
      stock: parseInt(stock),
      productCode,
      metaTitle,
      metaKeywords,
      metaDescription,
      specialOffer,
      hasVariants,
      thumbnail: thumbnailUrl, // URL for thumbnail
      gallery: galleryEntries, // Array of gallery object IDs
      category,
      brandValue,
      productColorValue: productColorValue.split(","),
      productSizeValue: productSizeValue.split(","),
      productFlagValue,   
      subcategory,
      childCategory,
      isNew: isNew === "true",
      isRecommended: isRecommended === "true",
    };

    console.log(submitData, "submitData");


    const newProduct = new ProductModel(submitData);

    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(error, "create Product error");
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
  
    const formData = req.body; // Assuming you use middleware to parse form data

    const productData = await ProductModel.findById(id).populate("gallery");
    if (!productData) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const { productTitle, shortDescription, fullDescription, specifications, returnPolicy, price,
      discountPrice, rewardPoints, stock, productCode, metaTitle, metaKeywords, metaDescription,
      specialOffer, hasVariants, category, brandValue, productColorValue, productSizeValue,
      productFlagValue, subcategory, childCategory, isNew, isRecommended, galleryItemIds } = formData;
// Uploading the thumbnail file

try {
const thumbnailFile = req?.files?.thumbnail;
let thumbnailUrl = "";
if (thumbnailFile && thumbnailFile.size > 0) {
  thumbnailUrl = `${Date.now()}-${thumbnailFile.name.replace(/\s/g, "-")}`;
  const thumbnailResult = await uploadFile(
    thumbnailFile,
    thumbnailUrl,
    thumbnailFile.type
  );
  

  console.log(thumbnailResult, "thumbnailResult");
}

// Uploading gallery files
const galleryFiles = req.files['gallery'];
let galleryEntries = [];
for (const id of galleryItemIds.split(",")) {
  const galleryItem = await ProductGalleryModel.findById(id);
  console.log(galleryItem, "galleryItem");
  galleryEntries.push(`${galleryItem._id}`);
}

console.log(galleryFiles, "galleryFiles");

if (galleryFiles && galleryFiles.length > 1 ) {
for (const file of galleryFiles) {
  const galleryUrl = `${Date.now()}-${file?.name.replace(/\s/g, "-")}`;
  const galleryUploadResult = await uploadFile(file, galleryUrl, file.type);

  

  const galleryEntry = await ProductGalleryModel.create({
    image: galleryUrl,
  });
  console.log(galleryEntry, "galleryEntry");
  const copy_galleryEntry = {
    _id: galleryEntry._id,
  }

  console.log(copy_galleryEntry, "copy_galleryEntry");
  galleryEntries.push(copy_galleryEntry._id); // Save the gallery entry IDs
  // galleryEntries.push(galleryEntry._id); // Save the gallery entry IDs
}

} else if(galleryFiles) {
  console.log(galleryFiles, "galleryFiles single");
  const galleryUrl = `${Date.now()}-${galleryFiles?.name.replace(/\s/g, "-")}`;
  const galleryUploadResult = await uploadFile(galleryFiles, galleryUrl, galleryFiles.type);

  

  const galleryEntry = await ProductGalleryModel.create({
    image: galleryUrl,
  });
  console.log(galleryEntry, "galleryEntry");
  const copy_galleryEntry = {
    _id: `${galleryEntry._id}`,
  }

  console.log(copy_galleryEntry, "copy_galleryEntry");
  galleryEntries.push(copy_galleryEntry._id); // Save the gallery entry IDs
  // galleryEntries.push(galleryEntry._id); // Save the gallery entry IDs
}

console.log(galleryEntries, "galleryEntries");

const submitData = {
  productTitle,
  shortDescription,
  fullDescription,
  price: parseFloat(price),
  discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
  rewardPoints: rewardPoints ? parseInt(rewardPoints) : undefined,
  stock: parseInt(stock),
  productCode,
  metaTitle,
  metaKeywords,
  metaDescription,
  specialOffer,
  hasVariants,
  thumbnail: thumbnailUrl, // URL for thumbnail
  gallery: galleryEntries, // Array of gallery object IDs
  category,
  brandValue,
  productColorValue,
  productSizeValue,
  productFlagValue,
  subcategory,
  childCategory,

  returnPolicy,
  specifications,

  isNew: isNew === "true",
  isRecommended: isRecommended === "true",
};


console.log(submitData, "submitData");

const updatedProduct = await ProductModel.findByIdAndUpdate(
  id,
  submitData,
  {
    new: true,
  }
) 

if (!updatedProduct) {
  return NextResponse.json(
    { success: false, message: "Product not found" },
    { status: 404 }
  );
}

// Delete thumbnail from S3 if it exists
if (productData.thumbnail !== updatedProduct.thumbnail) {
  await deleteFile(productData.thumbnail);
}

// Delete gallery images from S3
if (productData.gallery && productData.gallery.length > 0) {
  for (const galleryImage of productData.gallery) {
    const isSameImage = updatedProduct.gallery.map(gallery => gallery.image).includes(galleryImage.image);
    if (isSameImage) {
      
      await deleteFile(galleryImage.image);
    }

  }
}

    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log(error, "error");
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