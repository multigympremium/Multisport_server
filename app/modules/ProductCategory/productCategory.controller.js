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

    if (
      !categoryName ||
      !featureCategory ||
      !showOnNavbar ||
      !slug ||
      !categoryIcon ||
      !categoryBanner
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const iconKey = `categoryIcon/${Date.now()}-${categoryIcon.name.replace(
      /\s/g,
      "-"
    )}`;
    const bannerKey = `categoryIcon/${Date.now()}-${categoryBanner.name.replace(
      /\s/g,
      "-"
    )}`;

    await uploadFile(categoryIcon, iconKey, categoryIcon.type);
    await uploadFile(categoryBanner, bannerKey, categoryBanner.type);

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

export const getProductCategories = async (req, res) => {
  try {
    const result = await ProductModel.aggregate([
      // Unwind colorAndSize array
      {
        $unwind: {
          path: "$colorAndSize",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Unwind sizes inside each colorAndSize
      {
        $unwind: {
          path: "$colorAndSize.size",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Group by category, subcategory, and brand to aggregate colors, sizes, stock, and product count
      {
        $group: {
          _id: {
            category: "$category",
            subcategory: "$subcategory",
            brand: "$brandValue",
          },
          category: { $first: "$category" },
          subcategory: { $first: "$subcategory" },
          brand: { $first: "$brandValue" },
          colors: {
            $addToSet: {
              value: "$colorAndSize.color.value",
              label: "$colorAndSize.color.label",
            },
          },
          sizes: {
            $addToSet: {
              value: "$colorAndSize.size.value",
              label: "$colorAndSize.size.label",
            },
          },
          totalStock: { $sum: { $toInt: "$colorAndSize.quantity" } },
          productCount: { $sum: 1 },
        },
      },
      // Group by category to nest subcategories and brands
      {
        $group: {
          _id: "$category",
          category: { $first: "$category" },
          subcategories: {
            $addToSet: {
              subcategory: "$subcategory",
              stock: "$totalStock",
              productCount: "$productCount",
            },
          },
          brands: {
            $addToSet: {
              brand: "$brand",
              stock: "$totalStock",
              productCount: "$productCount",
            },
          },
          colors: { $addToSet: "$colors" },
          sizes: { $addToSet: "$sizes" },
          categoryStock: { $sum: "$totalStock" },
          categoryProductCount: { $sum: "$productCount" },
        },
      },
      // Flatten the final structure
      {
        $project: {
          _id: 0,
          category: 1,
          subcategories: 1,
          brands: 1,
          colors: {
            $reduce: {
              input: "$colors",
              initialValue: [],
              in: { $setUnion: ["$$value", "$$this"] },
            },
          },
          sizes: {
            $reduce: {
              input: "$sizes",
              initialValue: [],
              in: { $setUnion: ["$$value", "$$this"] },
            },
          },
          totalStock: "$categoryStock",
          productCount: "$categoryProductCount",
        },
      },
    ]);

    console.log(JSON.stringify(result, null, 2));

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
