import WishlistModel from "./wishlist.model.js";

// Handle GET request to get all wishlists
// export async function getAllWishlists(req, res) {
//   const { search, currentPage, limit } = req.query;
//   const filter = {};
//   if (search && search !== "all") {
//     filter.$or = [
//       { email: { $regex: new RegExp(search, "i") } },
//       { "product_id.productTitle": { $regex: new RegExp(search, "i") } },
//     ];
//   }
//   const page = parseInt(currentPage) || 1;
//   const limitation = parseInt(limit) || 15;

//   // Calculate total items and pages
//   try {
//     const totalItems = await WishlistModel.find(filter).countDocuments();
//     const totalPages = Math.ceil(totalItems / limitation);
//     const wishlists = await WishlistModel.find(filter)
//       .populate("product_id")
//       .populate("userId")
//       .skip((page - 1) * limitation)
//       .limit(limitation);

//     res.status(200).json({
//       success: true,
//       data: wishlists,
//       totalPages,
//       totalItems,
//       currentPage,
//     });
//   } catch (error) {
//     return res.status(400).json({ success: false, error: error.message });
//   }
// }

// export async function getAllWishlists(req, res) {
//   const { search, currentPage, limit } = req.query;

//   const page = parseInt(currentPage) || 1;
//   const limitation = parseInt(limit) || 15;

//   try {
//     // Fetch all wishlists and populate related data
//     const allWishlists = await WishlistModel.find()
//       .populate("product_id")
//       .populate("userId");

//     // Filter wishlists based on search criteria
//     let filteredWishlists = allWishlists;

//     if (search && search !== "all") {
//       const searchRegex = new RegExp(search, "i");

//       filteredWishlists = allWishlists.filter(
//         (wishlist) =>
//           searchRegex.test(wishlist.email) ||
//           (wishlist.product_id &&
//             searchRegex.test(wishlist.product_id.productTitle)) ||
//           (wishlist.product_id &&
//             searchRegex.test(wishlist.product_id.category)) ||
//           (wishlist.product_id &&
//             searchRegex.test(wishlist.product_id.subcategory)) ||
//           (wishlist.userId && searchRegex.test(wishlist.product_id.username))(
//             wishlist.userId && searchRegex.test(wishlist.product_id.contact_no)
//           )
//       );
//     }

//     // Pagination
//     const totalItems = filteredWishlists.length;
//     const totalPages = Math.ceil(totalItems / limitation);
//     const paginatedWishlists = filteredWishlists.slice(
//       (page - 1) * limitation,
//       page * limitation
//     );

//     res.status(200).json({
//       success: true,
//       data: paginatedWishlists,
//       totalPages,
//       totalItems,
//       currentPage: page,
//     });
//   } catch (error) {
//     return res.status(400).json({ success: false, error: error.message });
//   }
// }

export async function getAllWishlists(req, res) {
  const { search, currentPage, limit } = req.query;

  const page = parseInt(currentPage) || 1;
  const limitation = parseInt(limit) || 15;

  try {
    // Fetch all wishlists and populate related data
    const allWishlists = await WishlistModel.find()
      .populate("product_id")
      .populate("userId");

    // Filter wishlists based on search criteria
    let filteredWishlists = allWishlists;

    if (search && search !== "all") {
      const searchRegex = new RegExp(search, "i");

      filteredWishlists = allWishlists.filter(
        (wishlist) =>
          searchRegex.test(wishlist.email) ||
          (wishlist.product_id &&
            (searchRegex.test(wishlist.product_id.productTitle) ||
              searchRegex.test(wishlist.product_id.category) ||
              searchRegex.test(wishlist.product_id.subcategory))) ||
          (wishlist.userId &&
            (searchRegex.test(wishlist.userId.username) ||
              searchRegex.test(wishlist.userId.contact_no)))
      );
    }

    // Pagination
    const totalItems = filteredWishlists.length;
    const totalPages = Math.ceil(totalItems / limitation);
    const paginatedWishlists = filteredWishlists.slice(
      (page - 1) * limitation,
      page * limitation
    );

    res.status(200).json({
      success: true,
      data: paginatedWishlists,
      totalPages,
      totalItems,
      currentPage: page,
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

export async function getUserAllWishlists(req, res) {
  try {
    const wishlists = await WishlistModel.find({ userId: req.params.id })
      .populate("product_id")
      .populate("userId");
    return res.status(200).json({ success: true, data: wishlists });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// Handle POST request to create a wishlist
export async function createWishlist(req, res) {
  const { userId, email, product_id } = req.body;

  if (!userId || !email || !product_id) {
    return res.status(400).json({
      success: false,
      message: "Required fields missing",
    });
  }

  try {
    const submitData = { userId, email, product_id };
    const wishlistResult = await WishlistModel.create(submitData);

    if (wishlistResult) {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

// Handle GET request to get a wishlist by ID
export async function getWishlistById(req, res) {
  const id = req.params.id;
  try {
    const wishlist = await WishlistModel.findOne({ _id: id });

    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    }
    return res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// Handle PUT request to update a wishlist by ID
export async function updateWishlistById(req, res) {
  const id = req.params.id;
  const requestData = req.body;

  try {
    const updatedWishlist = await WishlistModel.findByIdAndUpdate(
      id,
      requestData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedWishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    }

    return res.status(200).json({ success: true, data: updatedWishlist });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// Handle DELETE request to delete a wishlist by ID
export async function deleteWishlistById(req, res) {
  const id = req.params.id;
  const userId = req.query.userId;
  try {
    const wishlistItem = await WishlistModel.findOne({
      product_id: id,
      userId,
    });

    if (!wishlistItem) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    }

    await WishlistModel.deleteOne({ product_id: id });

    return res
      .status(200)
      .json({ success: true, message: "Wishlist deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
