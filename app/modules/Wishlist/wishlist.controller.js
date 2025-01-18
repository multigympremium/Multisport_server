import WishlistModel from "./wishlist.model.js";

// Handle GET request to get all wishlists
export async function getAllWishlists(req, res) {
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
  try {
    const wishlistItem = await WishlistModel.findOne({ product_id: id });

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
