import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import ProductModel from "../Product/product.model.js";
import CategoryModel from "./productCategory.model.js";

// Get all categories or filter by query parameters
export const getCategories = async (req, res) => {
  try {
    const { slug, featureCategory, showOnNavbar } = req.query;

    const filter = {};
    if (slug) {
      filter.$or = [{ slug }, { categoryName: slug }];
    }
    if (featureCategory) filter.featureCategory = featureCategory;
    if (showOnNavbar) filter.showOnNavbar = showOnNavbar;

    const categories = await CategoryModel.find(filter);
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { categoryName, featureCategory, showOnNavbar, slug } = req.body;
    const categoryIcon = req.files?.categoryIcon;
    const categoryBanner = req.files?.categoryBanner;

    if (!categoryName || !featureCategory || !showOnNavbar || !slug) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    let iconKey = ``;
    let bannerKey = ``;

    if (categoryIcon) {
      iconKey = `categoryIcon/${Date.now()}-${categoryIcon.name.replace(
        /\s/g,
        "-"
      )}`;

      await uploadFile(categoryIcon, iconKey, categoryIcon.type);
    }

    if (categoryBanner) {
      bannerKey = `categoryIcon/${Date.now()}-${categoryBanner.name.replace(
        /\s/g,
        "-"
      )}`;

      await uploadFile(categoryBanner, bannerKey, categoryBanner.type);
    }

    const category = await CategoryModel.create({
      categoryName,
      featureCategory,
      showOnNavbar,
      categoryIcon: iconKey,
      categoryBanner: bannerKey,
      slug,
    });
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update a category by ID
export const updateCategoryById = async (req, res) => {
  try {
    const { categoryName, featureCategory, showOnNavbar, slug } = req.body;
    const categoryIcon = req.files?.categoryIcon;
    const categoryBanner = req.files?.categoryBanner;

    const category = await CategoryModel.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    const updateData = { categoryName, featureCategory, showOnNavbar, slug };

    if (categoryIcon) {
      const iconKey = `categoryIcon/${Date.now()}-${categoryIcon.name.replace(
        /\s/g,
        "-"
      )}`;
      await uploadFile(categoryIcon, iconKey, categoryIcon.type);
      await deleteFile(category.categoryIcon);
      updateData.categoryIcon = iconKey;
    }

    if (categoryBanner) {
      const bannerKey = `categoryIcon/${Date.now()}-${categoryBanner.name.replace(
        /\s/g,
        "-"
      )}`;
      await uploadFile(categoryBanner, bannerKey, categoryBanner.type);
      await deleteFile(category.categoryBanner);
      updateData.categoryBanner = bannerKey;
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a category by ID
export const deleteCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    const deleteIconResult = await deleteFile(category.categoryIcon);
    const deleteBannerResult = await deleteFile(category.categoryBanner);
    const deleteCategoryResult = await CategoryModel.deleteOne({
      _id: req.params.id,
    });

    console.log(deleteIconResult, "deleteIconResult");
    console.log(deleteBannerResult, "deleteBannerResult");
    console.log(deleteCategoryResult, "deleteCategoryResult");

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.log(error, "error");
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getProductQueries = async (req, res) => {
  try {
    // const result = await ProductModel.aggregate([
    //   // Unwind colorAndSize array
    //   {
    //     $unwind: {
    //       path: "$colorAndSize",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   // Unwind sizes inside each colorAndSize
    //   {
    //     $unwind: {
    //       path: "$colorAndSize.size",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   // Group by category, subcategory, and brand to aggregate colors, sizes, stock, and product count
    //   {
    //     $group: {
    //       _id: {
    //         category: "$category",
    //         subcategory: "$subcategory",
    //         brand: "$brandValue",
    //       },
    //       category: { $first: "$category" },
    //       subcategory: { $first: "$subcategory" },
    //       brand: { $first: "$brandValue" },
    //       colors: {
    //         $addToSet: {
    //           value: "$colorAndSize.color.value",
    //           label: "$colorAndSize.color.label",
    //         },
    //       },
    //       sizes: {
    //         $addToSet: {
    //           value: "$colorAndSize.size.value",
    //           label: "$colorAndSize.size.label",
    //         },
    //       },
    //       totalStock: { $sum: { $toInt: "$colorAndSize.quantity" } },
    //       productCount: { $sum: 1 },
    //     },
    //   },
    //   // Group by category to nest subcategories and brands
    //   {
    //     $group: {
    //       _id: "$category",
    //       category: { $first: "$category" },
    //       subcategories: {
    //         $addToSet: {
    //           subcategory: "$subcategory",
    //           stock: "$totalStock",
    //           productCount: "$productCount",
    //         },
    //       },
    //       brands: {
    //         $addToSet: {
    //           brand: "$brand",
    //           stock: "$totalStock",
    //           productCount: "$productCount",
    //         },
    //       },
    //       colors: { $addToSet: "$colors" },
    //       sizes: { $addToSet: "$sizes" },
    //       categoryStock: { $sum: "$totalStock" },
    //       categoryProductCount: { $sum: "$productCount" },
    //     },
    //   },
    //   // Flatten the final structure
    //   {
    //     $project: {
    //       _id: 0,
    //       category: 1,
    //       subcategories: 1,
    //       brands: 1,
    //       colors: {
    //         $reduce: {
    //           input: "$colors",
    //           initialValue: [],
    //           in: { $setUnion: ["$$value", "$$this"] },
    //         },
    //       },
    //       sizes: {
    //         $reduce: {
    //           input: "$sizes",
    //           initialValue: [],
    //           in: { $setUnion: ["$$value", "$$this"] },
    //         },
    //       },
    //       totalStock: "$categoryStock",
    //       productCount: "$categoryProductCount",
    //     },
    //   },
    // ]);

    // const result = await ProductModel.aggregate([
    //   // Unwind colorAndSize array
    //   {
    //     $unwind: {
    //       path: "$colorAndSize",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   // Unwind sizes inside each colorAndSize
    //   {
    //     $unwind: {
    //       path: "$colorAndSize.size",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   // Group by category, subcategory, and brand to aggregate colors, sizes, stock, and product count
    //   {
    //     $group: {
    //       _id: {
    //         category: "$category",
    //         subcategory: "$subcategory",
    //         brand: "$brandValue",
    //       },
    //       category: { $first: "$category" },
    //       subcategory: { $first: "$subcategory" },
    //       brand: { $first: "$brandValue" },
    //       colors: {
    //         $addToSet: {
    //           value: "$colorAndSize.color.value",
    //           label: "$colorAndSize.color.label",
    //         },
    //       },
    //       sizes: {
    //         $addToSet: {
    //           value: "$colorAndSize.size.value",
    //           label: "$colorAndSize.size.label",
    //         },
    //       },
    //       totalStock: { $sum: { $toInt: "$colorAndSize.quantity" } },
    //       productCount: { $sum: 1 },
    //     },
    //   },
    //   // Group by category to nest subcategories and brands
    //   {
    //     $group: {
    //       _id: "$category",
    //       categoryDetails: {
    //         $addToSet: {
    //           category: "$category",
    //           stock: "$totalStock",
    //           productCount: "$productCount",
    //         },
    //       },
    //       subcategories: {
    //         $addToSet: {
    //           subcategory: "$subcategory",
    //           stock: "$totalStock",
    //           productCount: "$productCount",
    //         },
    //       },
    //       brands: {
    //         $addToSet: {
    //           brand: "$brand",
    //           stock: "$totalStock",
    //           productCount: "$productCount",
    //         },
    //       },
    //       colors: { $addToSet: "$colors" },
    //       sizes: { $addToSet: "$sizes" },
    //       categoryStock: { $sum: "$totalStock" },
    //       categoryProductCount: { $sum: "$productCount" },
    //     },
    //   },
    //   // Flatten and deduplicate categories
    //   {
    //     $project: {
    //       _id: 0,
    //       category: {
    //         $reduce: {
    //           input: "$categoryDetails",
    //           initialValue: [],
    //           in: {
    //             $setUnion: ["$$value", ["$$this"]],
    //           },
    //         },
    //       },
    //       subcategories: 1,
    //       brands: 1,
    //       colors: {
    //         $reduce: {
    //           input: "$colors",
    //           initialValue: [],
    //           in: { $setUnion: ["$$value", "$$this"] },
    //         },
    //       },
    //       sizes: {
    //         $reduce: {
    //           input: "$sizes",
    //           initialValue: [],
    //           in: { $setUnion: ["$$value", "$$this"] },
    //         },
    //       },
    //       totalStock: "$categoryStock",
    //       productCount: "$categoryProductCount",
    //     },
    //   },
    // ]);

    // const result = await ProductModel.aggregate([
    //   // Unwind colorAndSize array
    //   {
    //     $unwind: {
    //       path: "$colorAndSize",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   // Unwind sizes inside each colorAndSize
    //   {
    //     $unwind: {
    //       path: "$colorAndSize.size",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   // Group by category, subcategory, and brand to aggregate colors, sizes, stock, and product count
    //   {
    //     $group: {
    //       _id: {
    //         category: "$category",
    //         subcategory: "$subcategory",
    //         brand: "$brandValue",
    //       },
    //       category: { $first: "$category" },
    //       subcategory: { $first: "$subcategory" },
    //       brand: { $first: "$brandValue" },
    //       colors: {
    //         $addToSet: {
    //           value: "$colorAndSize.color.value",
    //           label: "$colorAndSize.color.label",
    //         },
    //       },
    //       sizes: {
    //         $addToSet: {
    //           value: "$colorAndSize.size.value",
    //           label: "$colorAndSize.size.label",
    //         },
    //       },
    //       totalStock: { $sum: { $toInt: "$colorAndSize.quantity" } },
    //       productCount: { $sum: 1 },
    //     },
    //   },
    //   // Group by category to nest subcategories and brands
    //   {
    //     $group: {
    //       _id: "$category",
    //       categoryDetails: {
    //         $addToSet: {
    //           category: "$category",
    //           stock: "$totalStock",
    //           productCount: "$productCount",
    //         },
    //       },
    //       subcategories: {
    //         $addToSet: {
    //           subcategory: "$subcategory",
    //           stock: "$totalStock",
    //           productCount: "$productCount",
    //         },
    //       },
    //       brands: {
    //         $addToSet: {
    //           brand: "$brand",
    //           stock: "$totalStock",
    //           productCount: "$productCount",
    //         },
    //       },
    //       colors: { $addToSet: "$colors" },
    //       sizes: { $addToSet: "$sizes" },
    //       categoryStock: { $sum: "$totalStock" },
    //       categoryProductCount: { $sum: "$productCount" },
    //     },
    //   },
    //   // Flatten and deduplicate categories
    //   {
    //     $project: {
    //       _id: 0,
    //       category: {
    //         $reduce: {
    //           input: "$categoryDetails",
    //           initialValue: [],
    //           in: {
    //             $setUnion: ["$$value", ["$$this"]],
    //           },
    //         },
    //       },
    //       subcategories: 1,
    //       brands: 1,
    //       colors: {
    //         $reduce: {
    //           input: "$colors",
    //           initialValue: [],
    //           in: { $setUnion: ["$$value", "$$this"] },
    //         },
    //       },
    //       sizes: {
    //         $reduce: {
    //           input: "$sizes",
    //           initialValue: [],
    //           in: { $setUnion: ["$$value", "$$this"] },
    //         },
    //       },
    //       totalStock: "$categoryStock",
    //       productCount: "$categoryProductCount",
    //     },
    //   },
    // ]);

    // const result = await ProductModel.aggregate([
    //   // {
    //   //   $unwind: {
    //   //     path: "$colorAndSize",
    //   //     preserveNullAndEmptyArrays: true,
    //   //   },
    //   // },
    //   // {
    //   //   $unwind: {
    //   //     path: "$colorAndSize.size",
    //   //     preserveNullAndEmptyArrays: true,
    //   //   },
    //   // },
    //   {
    //     $group: {
    //       _id: {
    //         value: "$colorAndSize",
    //       },
    //       // category: { $first: "$category" },
    //       // subcategory: { $first: "$subcategory" },
    //       // brand: { $first: "$brandValue" },
    //       colors: {
    //         value: "$colorAndSize.color.value",
    //         label: "$colorAndSize.color.label",
    //         totalStock: {
    //           $sum: 1,
    //         },
    //         productCount: { $sum: 1 },
    //       },
    //       // sizes: {
    //       //   value: "$colorAndSize.size.value",
    //       //   label: "$colorAndSize.size.label",
    //       //   totalStock: {
    //       //     $sum: 1,
    //       //   },
    //       //   productCount: { $sum: 1 },
    //       // },
    //     },
    //   },
    //   // {
    //   //   $group: {
    //   //     _id: "$category",
    //   //     categoryDetails: {
    //   //       $addToSet: {
    //   //         category: "$category",
    //   //         stock: "$totalStock",
    //   //         productCount: "$productCount",
    //   //       },
    //   //     },
    //   //     subcategories: {
    //   //       $addToSet: {
    //   //         subcategory: "$subcategory",
    //   //         stock: "$totalStock",
    //   //         productCount: "$productCount",
    //   //       },
    //   //     },
    //   //     brands: {
    //   //       $addToSet: {
    //   //         brand: "$brand",
    //   //         stock: "$totalStock",
    //   //         productCount: "$productCount",
    //   //       },
    //   //     },
    //   //     colors: { $addToSet: "$colors" },
    //   //     sizes: { $addToSet: "$sizes" },
    //   //     categoryStock: { $sum: "$totalStock" },
    //   //     categoryProductCount: { $sum: "$productCount" },
    //   //   },
    //   // },
    //   {
    //     $project: {
    //       _id: 0,
    //       // category: {
    //       //   $reduce: {
    //       //     input: "$categoryDetails",
    //       //     initialValue: [],
    //       //     in: {
    //       //       $setUnion: ["$$value", ["$$this"]],
    //       //     },
    //       //   },
    //       // },
    //       // subcategories: 1,
    //       // brands: 1,
    //       colors: 1,
    //       // sizes: "$sizes",
    //       // totalStock: "$categoryStock",
    //       // productCount: "$categoryProductCount",
    //     },
    //   },
    // ]);

    const colors = await ProductModel.aggregate([
      {
        $unwind: {
          path: "$colorAndSize", // Unwind colorAndSize array
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: {
            value: "$colorAndSize.color.value", // Group by color value
            label: "$colorAndSize.color.label", // Group by color label
          },
          totalStock: { $sum: { $toInt: "$colorAndSize.quantity" } }, // Sum total stock for each color
          productCount: { $sum: 1 }, // Count products for each color
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          colorValue: "$_id.value", // Map to colorValue
          colorLabel: "$_id.label", // Map to colorLabel
          totalStock: 1, // Include total stock
          productCount: 1, // Include product count
        },
      },
    ]);
    const sizes = await ProductModel.aggregate([
      {
        $unwind: {
          path: "$colorAndSize", // Unwind colorAndSize array
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$colorAndSize.size", // Unwind the size array inside colorAndSize
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: {
            sizeValue: "$colorAndSize.size.value", // Group by size value
            sizeLabel: "$colorAndSize.size.label", // Group by size label
          },
          totalStock: { $sum: { $toInt: "$colorAndSize.quantity" } }, // Sum total stock for each size
          productCount: { $addToSet: "$_id" }, // Collect unique product IDs
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          sizeValue: "$_id.sizeValue", // Map to sizeValue
          sizeLabel: "$_id.sizeLabel", // Map to sizeLabel
          totalStock: 1, // Include total stock
          productCount: { $size: "$productCount" }, // Count unique products
        },
      },
    ]);

    const categories = await ProductModel.aggregate([
      {
        $group: {
          _id: {
            category: "$category",
          },
          category: { $first: "$category" },
          totalStock: {
            $sum: { $toInt: { $ifNull: ["$stock", 0] } }, // Assuming quantity is the field for stock
          },
          productCount: { $sum: 1 }, // Count products
        },
      },

      {
        $project: {
          _id: 0,
          category: "$category",
          stock: "$totalStock",
          productCount: "$productCount",
        },
      },
    ]);

    const subcategories = await ProductModel.aggregate([
      {
        $group: {
          _id: {
            subcategory: "$subcategory",
          },
          subcategory: { $first: "$subcategory" },
          totalStock: {
            $sum: { $toInt: { $ifNull: ["$stock", 0] } }, // Assuming quantity is the field for stock
          },
          productCount: { $sum: 1 }, // Count products
        },
      },
      // {
      //   $group: {
      //     _id: "$subcategory",
      //     subcategory: "$subcategory",
      //     stock: "$totalStock",
      //     productCount: "$productCount",
      //   },
      // },
      {
        $project: {
          _id: 0,
          subcategory: "$subcategory",
          stock: "$totalStock",
          productCount: "$productCount",
        },
      },
    ]);
    const brands = await ProductModel.aggregate([
      {
        $group: {
          _id: {
            brand: "$brandValue",
          },
          brand: { $first: "$brandValue" },
          totalStock: {
            $sum: { $toInt: { $ifNull: ["$stock", 0] } }, // Assuming quantity is the field for stock
          },
          productCount: { $sum: 1 }, // Count products
        },
      },

      {
        $project: {
          _id: 0,
          brand: "$brand",
          stock: "$totalStock",
          productCount: "$productCount",
        },
      },
    ]);
    const highestPrice = await ProductModel.aggregate([
      {
        $group: {
          _id: null, // No grouping key; consider all products
          highestPrice: { $max: "$price" }, // Find the maximum price
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          highestPrice: 1, // Include the highest price in the result
        },
      },
    ]);

    res
      .status(200)
      .json({ categories, subcategories, brands, sizes, colors, highestPrice });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// export const getProductQueries = async (req, res) => {
//   try {
//     const result = await ProductModel.aggregate([
//       // Unwind colorAndSize array
//       {
//         $unwind: {
//           path: "$colorAndSize",
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       // Unwind sizes inside each colorAndSize
//       {
//         $unwind: {
//           path: "$colorAndSize.size",
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       // Group by category, subcategory, and brand to aggregate colors, sizes, stock, and product count
//       {
//         $group: {
//           _id: {
//             category: "$category",
//             subcategory: "$subcategory",
//             brand: "$brandValue",
//           },
//           category: { $first: "$category" },
//           subcategory: { $first: "$subcategory" },
//           brand: { $first: "$brandValue" },
//           colors: {
//             $addToSet: {
//               value: "$colorAndSize.color.value",
//               label: "$colorAndSize.color.label",
//             },
//           },
//           sizes: {
//             $addToSet: {
//               value: "$colorAndSize.size.value",
//               label: "$colorAndSize.size.label",
//             },
//           },
//           totalStock: { $sum: { $toInt: "$colorAndSize.quantity" } },
//           productCount: { $sum: 1 },
//         },
//       },
//       // Group by category to nest subcategories and brands
//       {
//         $group: {
//           _id: "$category",
//           categoryDetails: {
//             $addToSet: {
//               category: "$category",
//               stock: "$totalStock",
//               productCount: "$productCount",
//             },
//           },
//           subcategories: {
//             $addToSet: {
//               subcategory: "$subcategory",
//               stock: "$totalStock",
//               productCount: "$productCount",
//             },
//           },
//           brands: {
//             $addToSet: {
//               brand: "$brand",
//               stock: "$totalStock",
//               productCount: "$productCount",
//             },
//           },
//           colors: { $addToSet: "$colors" },
//           sizes: { $addToSet: "$sizes" },
//           categoryStock: { $sum: "$totalStock" },
//           categoryProductCount: { $sum: "$productCount" },
//         },
//       },
//       // Flatten and deduplicate categories
//       {
//         $project: {
//           _id: 0,
//           category: {
//             $reduce: {
//               input: "$categoryDetails",
//               initialValue: [],
//               in: {
//                 $setUnion: ["$$value", ["$$this"]],
//               },
//             },
//           },
//           subcategories: 1,
//           brands: 1,
//           colors: {
//             $reduce: {
//               input: "$colors",
//               initialValue: [],
//               in: { $setUnion: ["$$value", "$$this"] },
//             },
//           },
//           sizes: {
//             $reduce: {
//               input: "$sizes",
//               initialValue: [],
//               in: { $setUnion: ["$$value", "$$this"] },
//             },
//           },
//           totalStock: "$categoryStock",
//           productCount: "$categoryProductCount",
//         },
//       },
//     ]);

//     const result2 = await ProductModel.aggregate([
//       {
//         $group: {
//           _id: {
//             category: "$category",
//             subcategory: "$subcategory",
//             brand: "$brandValue",
//           },
//           category: { $first: "$category" },
//           subcategory: { $first: "$subcategory" },
//           brand: { $first: "$brandValue" },
//           totalStock: { $sum: { $toInt: "$colorAndSize.quantity" } },
//           productCount: { $sum: 1 },
//         },
//       },
//       // Group by category to nest subcategories and brands
//       {
//         $group: {
//           _id: "$category",
//           categoryDetails: {
//             $addToSet: {
//               category: "$category",
//               stock: "$totalStock",
//               productCount: "$productCount",
//             },
//           },
//           subcategories: {
//             $addToSet: {
//               subcategory: "$subcategory",
//               stock: "$totalStock",
//               productCount: "$productCount",
//             },
//           },
//           brands: {
//             $addToSet: {
//               brand: "$brand",
//               stock: "$totalStock",
//               productCount: "$productCount",
//             },
//           },

//           categoryStock: { $sum: "$totalStock" },
//           categoryProductCount: { $sum: "$productCount" },
//         },
//       },
//       // Flatten and deduplicate categories
//       {
//         $project: {
//           _id: 0,
//           category: { $first: "$category" },
//           subcategories: 1,
//           brands: 1,
//           totalStock: "$categoryStock",
//           productCount: "$categoryProductCount",
//         },
//       },
//       // Sort by category name
//       {
//         $sort: {
//           category: 1,
//         },
//       },
//     ]);

//     console.log(JSON.stringify(result, null, 2));

//     res.status(200).json({ result, result2 });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };
