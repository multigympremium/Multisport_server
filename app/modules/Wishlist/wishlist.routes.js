import express from "express";
import {
  getAllWishlists,
  createWishlist,
  getWishlistById,
  updateWishlistById,
  deleteWishlistById,
} from "./wishlist.controller.js";

const wishlistRoutes = express.Router();

// GET all wishlists
wishlistRoutes.get("/user/:id", getAllWishlists);

// POST a new wishlist
wishlistRoutes.post("/", createWishlist);

// GET a wishlist by ID
wishlistRoutes.get("/single/:id", getWishlistById);

// PUT (update) a wishlist by ID
wishlistRoutes.put("/:id", updateWishlistById);

// DELETE a wishlist by ID
wishlistRoutes.delete("/:id", deleteWishlistById);

export default wishlistRoutes;
