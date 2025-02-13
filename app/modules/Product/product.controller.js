import mongoose from "mongoose";
import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import BulkProductModel from "./bulkProduct.model.js";
import ProductModel from "./product.model.js";
import ProductGalleryModel from "./productGallery.model.js";

// export const getProducts = async (req, res) => {
//   const {
//     search,
//     size,
//     color,
//     brand,
//     newArrival,
//     product,
//     category,
//     subcategory,
//     currentPage,
//     limit,
//     isNew,
//     isRecommended,
//     isFeatured,
//   } = req.query;
//   const id = req.params.id;

//   const page = parseInt(currentPage) || 1;
//   const limitation = parseInt(limit) || 15;

//   console.log(limitation, "limitation");

//   try {
//     const filter = {};

//     // Filter by product ID
//     if (product) {
//       console.log(id, "id", search, "search", product, "product");
//       const productResult = await ProductModel.findById(product).populate(
//         "gallery"
//       );
//       if (!productResult) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Product not found" });
//       }
//       return res.status(200).json({ success: true, data: [productResult] });
//     }

//     // Search filter
//     if (search && search !== "all") {
//       filter.$or = [
//         { productTitle: { $regex: new RegExp(search, "i") } },
//         { category: { $regex: new RegExp(search, "i") } },
//         { subcategory: { $regex: new RegExp(search, "i") } },
//         { childCategory: { $regex: new RegExp(search, "i") } },
//         { productFlagValue: { $regex: new RegExp(search, "i") } },
//         { brandValue: { $regex: new RegExp(search, "i") } },
//       ];
//     }

//     // Filter by brand
//     if (brand) filter.brandValue = { $in: brand.split(",") };

//     // Filter by category and subcategory
//     if (category)
//       filter.category = {
//         $in: category.includes(",") ? category.split(",") : [category],
//       };
//     if (subcategory)
//       filter.subcategory = {
//         $in: subcategory.includes(",") ? subcategory.split(",") : [subcategory],
//       };

//     // Filter by color and size
//     if (color || size) {
//       filter.colorAndSize = {
//         $elemMatch: {
//           ...(color && { "color.label": { $in: color.split(",") } }),
//           ...(size && { "size.label": { $in: size.split(",") } }),
//         },
//       };
//     }

//     // Filter for new arrivals
//     if (newArrival === "true") {
//       filter.createdAt = {
//         $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // Last 30 days
//       };
//     }
//     if (isNew === "true") {
//       filter.isNew = true;
//     }

//     if (isRecommended === "true") {
//       filter.isRecommended = true;
//     }

//     console.log(filter, "filter");

//     if (isFeatured === "true" || isFeatured === true) {
//       filter.isFeatured = true;
//     }

//     let totalItems = await ProductModel.find(filter).countDocuments();
//     const totalPages = Math.ceil(totalItems / limitation);

//     // Fetch products
//     const products = await ProductModel.find(filter)
//       .populate("gallery")
//       .skip((page - 1) * limitation)
//       .limit(limitation);

//     res.status(200).json({
//       success: true,
//       data: products,
//       totalItems,
//       totalPages,
//       currentPage,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };
export const getProducts = async (req, res) => {
  const {
    search,
    size,
    color,
    brand,
    newArrival,
    product,
    category,
    subcategory,
    currentPage,
    limit,
    isNew,
    isRecommended,
    isFeatured,
    sort,
  } = req.query;

  const page = parseInt(currentPage) || 1;
  const limitation = parseInt(limit) || 15;

  try {
    const filter = {};

    if (product) {
      const productResult = await ProductModel.findById(product).populate(
        "gallery"
      );
      if (!productResult) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      return res.status(200).json({ success: true, data: [productResult] });
    }

    if (search && search !== "all") {
      filter.$or = [
        { productTitle: { $regex: new RegExp(search, "i") } },
        { category: { $regex: new RegExp(search, "i") } },
        { subcategory: { $regex: new RegExp(search, "i") } },
        { childCategory: { $regex: new RegExp(search, "i") } },
        { productFlagValue: { $regex: new RegExp(search, "i") } },
        { brandValue: { $regex: new RegExp(search, "i") } },
      ];
    }

    if (brand) filter.brandValue = { $in: brand.split(",") };
    if (category)
      filter.category = {
        $in: category.includes(",") ? category.split(",") : [category],
      };
    if (subcategory)
      filter.subcategory = {
        $in: subcategory.includes(",") ? subcategory.split(",") : [subcategory],
      };

    if (color || size) {
      filter.colorAndSize = {
        $elemMatch: {
          ...(color && { "color.label": { $in: color.split(",") } }),
          ...(size && { "size.label": { $in: size.split(",") } }),
        },
      };
    }

    if (newArrival === "true") {
      filter.createdAt = {
        $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      };
    }
    if (isNew === "true") filter.isNew = true;
    if (isRecommended === "true") filter.isRecommended = true;
    if (isFeatured === "true") filter.isFeatured = true;

    console.log(filter, "filter");

    let totalItems = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limitation);

    let sortOption = { createdAt: -1, _id: -1 }; // Ensure stable sorting
    if (sort) {
      const [field, order] = sort.split(":");
      sortOption = { [field]: order === "asc" ? 1 : -1, _id: -1 };
    }

    let products = await ProductModel.find(filter)
      .populate("gallery")
      .sort(sortOption) // Always sort to prevent duplicate items across pages
      .skip((page - 1) * limitation)
      .limit(limitation)
      .lean();

    res.status(200).json({
      success: true,
      data: products,
      totalItems,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getPublicProducts = async (req, res) => {
  const {
    search,
    size,
    color,
    brand,
    newArrival,
    product,
    category,
    subcategory,
    currentPage,
    limit,
    isNew,
    isRecommended,
    isFeatured,
    priceRange,
  } = req.query;
  const id = req.params.id;

  const page = parseInt(currentPage) || 1;
  const limitation = parseInt(limit) || 15;

  console.log(limitation, "limitation");

  try {
    const filter = { stock: { $ne: 0 } };

    // Filter by product ID
    if (product) {
      console.log(id, "id", search, "search", product, "product");
      const productResult = await ProductModel.findById(product).populate(
        "gallery"
      );
      if (!productResult) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      return res.status(200).json({ success: true, data: [productResult] });
    }

    // Search filter
    if (search && search !== "all") {
      filter.$or = [
        { productTitle: { $regex: new RegExp(search, "i") } },
        { category: { $regex: new RegExp(search, "i") } },
        { subcategory: { $regex: new RegExp(search, "i") } },
        { childCategory: { $regex: new RegExp(search, "i") } },
        { productFlagValue: { $regex: new RegExp(search, "i") } },
      ];
    }

    // Filter by brand
    if (brand) {
      filter.brandValue = {
        $in: brand.includes(",") ? brand.split(",") : [brand],
      };

      filter.stock = { $gte: 0 };
    }

    // Filter by category and subcategory
    if (category)
      filter.category = {
        $in: category.includes(",") ? category.split(",") : [category],
      };
    if (subcategory)
      filter.subcategory = {
        $in: subcategory.includes(",") ? subcategory.split(",") : [subcategory],
      };

    // Filter by color and size
    if (color || size) {
      filter.colorAndSize = {
        $elemMatch: {
          ...(color && { "color.label": { $in: color.split(",") } }),
          ...(size && { "size.label": { $in: size.split(",") } }),
        },
      };
    }

    // Filter for new arrivals
    if (newArrival === "true") {
      filter.createdAt = {
        $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // Last 30 days
      };
    }
    if (isNew === "true") {
      filter.isNew = true;
    }

    if (isRecommended === "true") {
      filter.isRecommended = true;
    }
    if (priceRange) {
      filter.price = {
        $gte: 0,
        $lte: priceRange,
      };
    }

    console.log(filter, "filter");

    if (isFeatured === "true" || isFeatured === true) {
      filter.isFeatured = true;
    }

    let totalItems = await ProductModel.find(filter).countDocuments();
    const totalPages = Math.ceil(totalItems / limitation);

    // Fetch products
    const products = await ProductModel.find(filter)
      .populate("gallery")
      // .skip((page - 1) * limitation)
      .limit(page * limitation);

    res.status(200).json({
      success: true,
      data: products,
      totalItems,
      totalPages,
      currentPage,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// // POST New Product
export const createProduct = async (req, res) => {
  const {
    productTitle,
    shortDescription,
    fullDescription,
    specifications,
    returnPolicy,
    price,
    discountPrice,
    rewardPoints,
    stock,
    productCode,
    metaTitle,
    metaKeywords,
    metaDescription,
    specialOffer,
    hasVariants,
    category,
    brandValue,
    productColorValue,
    productSizeValue,
    productFlagValue,
    subcategory,
    childCategory,
    isNew,
    isRecommended,
    modelOfBrandValue,
    galleryItemCount,
    colorAndSize,
    discount,
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
    if (!productTitle || !price || !stock) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    // Uploading the thumbnail file
    const thumbnailFile = req?.files?.thumbnail;
    let thumbnailUrl = "";
    if (thumbnailFile && thumbnailFile.size > 0) {
      thumbnailUrl = `product/${Date.now()}-${thumbnailFile.name.replace(
        /\s/g,
        "-"
      )}`;
      const thumbnailResult = await uploadFile(
        thumbnailFile,
        thumbnailUrl,
        thumbnailFile.type
      );
      console.log(thumbnailResult, "thumbnailResult");
    }

    // Uploading gallery files
    const galleryFiles = req.files?.gallery; // Handle multiple files
    let galleryEntries = [];
    console.log(galleryFiles, "galleryFiles");

    if (Number(galleryItemCount) > 1) {
      console.log(Number(galleryItemCount), "Number(galleryItemCount)");
      for (const file of galleryFiles) {
        console.log(file, "file", typeof file, file instanceof File);
        const galleryUrl = `product/${Date.now()}-${file?.name.replace(
          /\s/g,
          "-"
        )}`;
        const galleryUploadResult = await uploadFile(
          file,
          galleryUrl,
          file.type
        );

        console.log(galleryUploadResult, "galleryUploadResult");

        const galleryEntry = await ProductGalleryModel.create({
          image: galleryUrl,
        });
        console.log(galleryEntry, "galleryEntry");
        galleryEntries.push(galleryEntry._id); // Save the gallery entry IDs
      }
    } else if (galleryItemCount === 1) {
      console.log(Number(galleryItemCount), "single");
      const galleryUrl = `${Date.now()}-${galleryFiles?.name.replace(
        /\s/g,
        "-"
      )}`;
      const galleryUploadResult = await uploadFile(
        galleryFiles,
        galleryUrl,
        galleryFiles.type
      );

      console.log(galleryUploadResult, "galleryUploadResult");

      const galleryEntry = await ProductGalleryModel.create({
        image: galleryUrl,
      });
      console.log(galleryEntry, "galleryEntry");
      galleryEntries.push(galleryEntry._id);
    }

    const submitData = {
      productTitle,
      shortDescription,
      fullDescription,
      returnPolicy,
      specification: specifications,
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
      modelOfBrandValue,
      colorAndSize: JSON.parse(colorAndSize),
      discount,
    };

    console.log(submitData, "submitData");
    console.log(JSON.parse(colorAndSize), "colorAndSize");

    const newProduct = new ProductModel(submitData);

    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(error, "create Product error");
    res.status(400).json({ success: false, error: error.message });
  }
};

// export const getPublicProducts = async (req, res) => {
//   const {
//     search,
//     size,
//     color,
//     brand,
//     newArrival,
//     product,
//     category,
//     subcategory,
//     currentPage,
//     limit,
//     isNew,
//     isRecommended,
//     isFeatured,
//     priceRange,
//   } = req.query;
//   const id = req.params.id;

//   const page = parseInt(currentPage) || 1;
//   const limitation = parseInt(limit) || 15;

//   try {
//     const filter = { stock: { $gt: 0 } };

//     // Filter by product ID
//     if (product) {
//       const productResult = await ProductModel.findById(product).populate(
//         "gallery"
//       );
//       if (!productResult) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Product not found" });
//       }
//       return res.status(200).json({ success: true, data: [productResult] });
//     }

//     // Search filter
//     if (search && search !== "all") {
//       filter.$or = [
//         { productTitle: { $regex: new RegExp(search, "i") } },
//         { category: { $regex: new RegExp(search, "i") } },
//         { subcategory: { $regex: new RegExp(search, "i") } },
//         { childCategory: { $regex: new RegExp(search, "i") } },
//         { productFlagValue: { $regex: new RegExp(search, "i") } },
//       ];
//     }

//     // Filter by brand
//     if (brand) {
//       filter.brandValue = {
//         $in: brand.includes(",") ? brand.split(",") : [brand],
//       };
//     }

//     // Filter by category and subcategory
//     if (category) {
//       filter.category = {
//         $in: category.includes(",") ? category.split(",") : [category],
//       };
//     }
//     if (subcategory) {
//       filter.subcategory = {
//         $in: subcategory.includes(",") ? subcategory.split(",") : [subcategory],
//       };
//     }

//     // Filter by color and size
//     if (color || size) {
//       filter.colorAndSize = {
//         $elemMatch: {
//           ...(color && { "color.label": { $in: color.split(",") } }),
//           ...(size && { "size.label": { $in: size.split(",") } }),
//         },
//       };
//     }

//     // Filter for new arrivals
//     if (newArrival === "true") {
//       filter.createdAt = {
//         $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // Last 30 days
//       };
//     }

//     // Additional boolean filters
//     if (isNew === "true") {
//       filter.isNew = true;
//     }
//     if (isRecommended === "true") {
//       filter.isRecommended = true;
//     }
//     if (isFeatured === "true") {
//       filter.isFeatured = true;
//     }

//     // Filter by price range
//     if (priceRange) {
//       filter.price = {
//         $gte: 0,
//         $lte: parseFloat(priceRange),
//       };
//     }

//     // Calculate total items and pages
//     const totalItems = await ProductModel.countDocuments(filter);
//     const totalPages = Math.ceil(totalItems / limitation);

//     // Fetch products with pagination
//     const products = await ProductModel.find(filter)
//       .populate("gallery")
//       .skip((page - 1) * limitation)
//       .limit(limitation);

//     res.status(200).json({
//       success: true,
//       data: products,
//       totalItems,
//       totalPages,
//       currentPage: page,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// GET Request: Get product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id).populate("gallery");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// PUT Request: Update product by ID
// export const updateProductById = async (req, res) => {
//   const { id } = req.params;

//   const formData = req.body; // Assuming you use middleware to parse form data

//   const productData = await ProductModel.findById(id).populate("gallery");
//   if (!productData) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Product not found" });
//   }

//   const {
//     productTitle,
//     shortDescription,
//     fullDescription,
//     specifications,
//     returnPolicy,
//     price,
//     discountPrice,
//     rewardPoints,
//     stock,
//     productCode,
//     metaTitle,
//     metaKeywords,
//     metaDescription,
//     specialOffer,
//     hasVariants,
//     category,
//     brandValue,
//     productColorValue,
//     productSizeValue,
//     productFlagValue,
//     subcategory,
//     childCategory,
//     isNew,
//     isRecommended,
//     galleryItemIds,
//     modelOfBrandValue,
//     deletedGalleryItemIds,
//   } = formData;
//   // Uploading the thumbnail file

//   try {
//     const thumbnailFile = req?.files?.thumbnail;
//     let thumbnailUrl = "";
//     if (thumbnailFile && thumbnailFile.size > 0) {
//       thumbnailUrl = `${Date.now()}-${thumbnailFile.name.replace(/\s/g, "-")}`;
//       const thumbnailResult = await uploadFile(
//         thumbnailFile,
//         thumbnailUrl,
//         thumbnailFile.type
//       );

//       console.log(thumbnailResult, "thumbnailResult");
//     }

//     // Uploading gallery files
//     const galleryFiles = req.files?.gallery;
//     let galleryEntries = [];
//     for (const id of galleryItemIds.split(",")) {
//       const galleryItem = await ProductGalleryModel.findById(id);
//       console.log(galleryItem, "galleryItem");
//       galleryEntries.push(`${galleryItem._id}`);
//     }

//     console.log(galleryFiles, "galleryFiles");

//     if (galleryFiles && galleryFiles.length > 1) {
//       for (const file of galleryFiles) {
//         const galleryUrl = `${Date.now()}-${file?.name.replace(/\s/g, "-")}`;
//         const galleryUploadResult = await uploadFile(
//           file,
//           galleryUrl,
//           file.type
//         );

//         const galleryEntry = await ProductGalleryModel.create({
//           image: galleryUrl,
//         });
//         console.log(galleryEntry, "galleryEntry");
//         const copy_galleryEntry = {
//           _id: galleryEntry._id,
//         };

//         console.log(copy_galleryEntry, "copy_galleryEntry");
//         galleryEntries.push(copy_galleryEntry._id); // Save the gallery entry IDs
//         // galleryEntries.push(galleryEntry._id); // Save the gallery entry IDs
//       }
//     } else if (galleryFiles) {
//       console.log(galleryFiles, "galleryFiles single");
//       const galleryUrl = `${Date.now()}-${galleryFiles?.name.replace(
//         /\s/g,
//         "-"
//       )}`;
//       const galleryUploadResult = await uploadFile(
//         galleryFiles,
//         galleryUrl,
//         galleryFiles.type
//       );

//       const galleryEntry = await ProductGalleryModel.create({
//         image: galleryUrl,
//       });
//       console.log(galleryEntry, "galleryEntry");
//       const copy_galleryEntry = {
//         _id: `${galleryEntry._id}`,
//       };

//       console.log(copy_galleryEntry, "copy_galleryEntry");
//       galleryEntries.push(copy_galleryEntry._id); // Save the gallery entry IDs
//       // galleryEntries.push(galleryEntry._id); // Save the gallery entry IDs
//     }

//     console.log(galleryEntries, "galleryEntries");

//     const submitData = {
//       productTitle,
//       shortDescription,
//       fullDescription,
//       price: parseFloat(price),
//       discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
//       rewardPoints: rewardPoints ? parseInt(rewardPoints) : undefined,
//       stock: parseInt(stock),
//       productCode,
//       metaTitle,
//       metaKeywords,
//       metaDescription,
//       specialOffer,
//       hasVariants,
//       thumbnail: thumbnailUrl, // URL for thumbnail
//       gallery: galleryEntries, // Array of gallery object IDs
//       category,
//       brandValue,
//       productColorValue,
//       productSizeValue,
//       productFlagValue,
//       subcategory,
//       childCategory,

//       returnPolicy,
//       specifications,

//       isNew: isNew === "true",
//       isRecommended: isRecommended === "true",
//     };

//     if (modelOfBrandValue) {
//       submitData.modelOfBrandValue = modelOfBrandValue;
//     }

//     console.log(submitData, "submitData");

//     const updatedProduct = await ProductModel.findByIdAndUpdate(
//       id,
//       submitData,
//       {
//         new: true,
//       }
//     );

//     if (!updatedProduct) {
//       return NextResponse.json(
//         { success: false, message: "Product not found" },
//         { status: 404 }
//       );
//     }

//     if (deletedGalleryItemIds.split(",")?.length > 0) {
//       const deletedResponse = await ProductGalleryModel.deleteMany({
//         _id: { $in: deletedGalleryItemIds.split(",") },
//       });
//       console.log("Deleted gallery items:", deletedResponse);
//     } else if (deletedGalleryItemIds?.length > 0) {
//       const deletedResponse = await ProductGalleryModel.deleteOne({
//         _id: deletedGalleryItemIds,
//       });

//       console.log("Deleted gallery item one:", deletedResponse);
//     }

//     // Delete thumbnail from S3 if it exists
//     if (productData.thumbnail !== updatedProduct.thumbnail) {
//       await deleteFile(productData.thumbnail);
//     }

//     // Delete gallery images from S3
//     if (productData.gallery && productData.gallery.length > 0) {
//       for (const galleryImage of productData.gallery) {
//         const isSameImage = updatedProduct.gallery
//           .map((gallery) => gallery.image)
//           .includes(galleryImage.image);
//         if (isSameImage) {
//           await deleteFile(galleryImage.image);
//         }
//       }
//     }

//     return res.status(200).json({ success: true, data: updatedProduct });
//   } catch (error) {
//     console.log(error, "error");
//     return res.status(400).json({ success: false, error: error.message });
//   }
// };

export const updateProductById = async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    // Check if the product exists
    const productData = await ProductModel.findById(id).populate("gallery");
    if (!productData) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const {
      productTitle,
      shortDescription,
      fullDescription,
      specifications,
      returnPolicy,
      price,
      discountPrice,
      rewardPoints,
      stock,
      productCode,
      metaTitle,
      metaKeywords,
      metaDescription,
      specialOffer,
      hasVariants,
      category,
      brandValue,
      productColorValue,
      productSizeValue,
      productFlagValue,
      subcategory,
      childCategory,
      isNew,
      isRecommended,
      galleryItemIds = "",
      modelOfBrandValue,
      deletedGalleryItemIds = "",
      colorAndSize,
      discount,
    } = formData;

    if (!colorAndSize) {
      return res
        .status(400)
        .json({ success: false, message: "Color and Size is required" });
    }

    const thumbnailFile = req?.files?.thumbnail;
    let thumbnailUrl = "";

    // Uploading the thumbnail file
    if (thumbnailFile && thumbnailFile.size > 0) {
      thumbnailUrl = `product/${Date.now()}-${thumbnailFile.name.replace(
        /\s/g,
        "-"
      )}`;
      await uploadFile(thumbnailFile, thumbnailUrl, thumbnailFile.type);
    }

    // Process gallery files
    const galleryFiles = req.files?.gallery;
    let galleryEntries = [];

    // Process existing gallery item IDs
    if (galleryItemIds) {
      const validGalleryItemIds = galleryItemIds
        .split(",")
        .filter((id) => id.trim() !== ""); // Remove empty strings
      for (const id of validGalleryItemIds) {
        const galleryItem = await ProductGalleryModel.findById(id);
        if (galleryItem) {
          galleryEntries.push(galleryItem._id);
        }
      }
    }

    // Upload new gallery files
    if (galleryFiles) {
      const filesArray = Array.isArray(galleryFiles)
        ? galleryFiles
        : [galleryFiles];
      for (const file of filesArray) {
        const galleryUrl = `product/${Date.now()}-${file?.name.replace(
          /\s/g,
          "-"
        )}`;
        await uploadFile(file, galleryUrl, file.type);

        const galleryEntry = await ProductGalleryModel.create({
          image: galleryUrl,
        });
        galleryEntries.push(galleryEntry._id);
      }
    }

    // Build updated product data
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
      thumbnail: thumbnailUrl || productData.thumbnail,
      gallery: galleryEntries,
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
      colorAndSize: JSON.parse(colorAndSize),
    };

    if (modelOfBrandValue) {
      submitData.modelOfBrandValue = modelOfBrandValue;
    }
    if (discount) {
      submitData.discount = discount;
    }

    // Update the product
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      submitData,
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Failed to update product" });
    }

    // Delete gallery items if necessary
    if (deletedGalleryItemIds) {
      const validDeletedIds = deletedGalleryItemIds
        .split(",")
        .filter((id) => id.trim() !== ""); // Remove empty strings

      if (validDeletedIds.length > 0) {
        await ProductGalleryModel.deleteMany({ _id: { $in: validDeletedIds } });
      }
    }

    // Delete old thumbnail from S3 if it has changed
    if (productData.thumbnail !== updatedProduct.thumbnail) {
      await deleteFile(productData.thumbnail);
    }

    // Delete unused gallery images from S3
    const usedGalleryIds = updatedProduct.gallery.map((item) =>
      item.toString()
    );
    for (const galleryImage of productData.gallery) {
      if (!usedGalleryIds.includes(galleryImage.toString())) {
        await deleteFile(galleryImage.image);
      }
    }

    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE Request: Delete product by ID
export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productItem = await ProductModel.findById(id).populate("gallery");

    if (!productItem) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
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

    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const updateProductWishCount = async (req, res) => {
  try {
    const { id } = req.params;

    const existsProduct = await ProductModel.findById(id);
    if (!existsProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    // Update product
    await ProductModel.findByIdAndUpdate(id, {
      wishCount: existsProduct.wishCount + 1,
    });

    return res.status(200).json({
      success: true,
      message: "Product wish count updated successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const productBulkUpdate = async (req, res) => {
  try {
    const bulkData = req.body; // Array of items sent in the request body
    if (!Array.isArray(bulkData.data) || bulkData.data.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data format" });
    }

    // Insert new bulk data into the temporary collection
    const result = await BulkProductModel.insertMany(bulkData.data);

    // Use aggregation with $merge to combine data into the "products" collection
    await BulkProductModel.aggregate([
      {
        $match: {
          _id: { $in: result.map((item) => mongoose.Types.ObjectId(item._id)) },
        },
      },
      {
        $merge: {
          into: "products", // Target collection name
          whenMatched: "merge", // Merge documents when matched
          whenNotMatched: "insert", // Insert documents when not matched
        },
      },
    ]);

    // Fetch the newly inserted or updated records from the "products" collection
    const updatedRecords = await mongoose
      .model("products")
      .find({ _id: { $in: result.map((item) => item._id) } });

    res.status(201).json({
      success: true,
      message: "Data merged successfully",
      insertedCount: result.length,
      data: result,
      mergedData: updatedRecords,
      mergedCount: updatedRecords.length,
    });
  } catch (error) {
    console.error("Error merging bulk data:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to merge data", error });
  }
};

export const getNewArrivals = async (req, res) => {
  try {
    const newArrivals = await ProductModel.find({
      isNew: true,
      stock: { $gt: 0 },
    });
    const newItems = await ProductModel.find({ stock: { $gt: 0 } }).sort({
      createdAt: -1,
      updatedAt: -1,
    });

    const uniqueObjects = Array.from(
      new Set([...newArrivals, ...newItems].map((obj) => JSON.stringify(obj)))
    ).map((str) => JSON.parse(str));
    res.status(200).json({ success: true, products: uniqueObjects });
  } catch (error) {
    console.error("Error getting new arrivals:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get new arrivals", error });
  }
};

export const getNewFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await ProductModel.find({
      isFeatured: true,
      stock: { $gt: 0 },
    });
    const newItems = await ProductModel.find({ stock: { $gt: 0 } }).sort({
      createdAt: -1,
      updatedAt: -1,
    });

    const uniqueObjects = Array.from(
      new Set(
        [...featuredProducts, ...newItems].map((obj) => JSON.stringify(obj))
      )
    ).map((str) => JSON.parse(str));

    res.status(200).json({ success: true, products: uniqueObjects });
  } catch (error) {
    console.error("Error getting new arrivals:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get new arrivals", error });
  }
};

export const getNewPopularProducts = async (req, res) => {
  try {
    const foundItems = await ProductModel.find({ stock: { $gt: 0 } }).sort({
      sellingCount: -1,
      wishCount: -1,
    });

    res.status(200).json({ success: true, products: foundItems });
  } catch (error) {
    console.error("Error getting new arrivals:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get new arrivals", error });
  }
};

export const getBestSellingProducts = async (req, res) => {
  try {
    const foundItems = await ProductModel.find({ stock: { $gt: 0 } }).sort({
      sellingCount: -1,
      createdAt: -1,
      updatedAt: -1,
    });

    res.status(200).json({ success: true, products: foundItems });
  } catch (error) {
    console.error("Error getting new arrivals:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get new arrivals", error });
  }
};

export const getNewDiscountProducts = async (req, res) => {
  try {
    const allItems = await ProductModel.find({ stock: { $gt: 0 } });
    const foundItems = await ProductModel.find({
      specialOffer: true,
      stock: { $gt: 0 },
    }).sort({
      discount: -1,
      createdAt: -1,
      updatedAt: -1,
    });

    const uniqueObjects = Array.from(
      new Set([...foundItems, ...allItems].map((obj) => JSON.stringify(obj)))
    ).map((str) => JSON.parse(str));

    res.status(200).json({ success: true, products: uniqueObjects });
  } catch (error) {
    console.error("Error getting new arrivals:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get new arrivals", error });
  }
};

export const getNewRelatedProducts = async (req, res) => {
  const category = req.params.category;
  try {
    const allItems = await ProductModel.find({ stock: { $gt: 0 } });
    const foundItems = await ProductModel.find({
      category: category,
      stock: { $gt: 0 },
    }).sort({
      discount: -1,
      wishCount: -1,
      sellingCount: -1,
      updatedAt: -1,
    });

    const uniqueObjects = Array.from(
      new Set([...foundItems, ...allItems].map((obj) => JSON.stringify(obj)))
    ).map((str) => JSON.parse(str));

    res.status(200).json({ success: true, products: uniqueObjects });
  } catch (error) {
    console.error("Error getting new arrivals:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get new arrivals", error });
  }
};
