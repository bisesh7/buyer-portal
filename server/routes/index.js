import express from "express";
import { register, login } from "../controllers/authController.js";
import {
  getAllProperties,
  getPropertyById,
} from "../controllers/propertiesController.js";
import {
  getFavoritesByUserId,
  addFavorite,
  removeFavorite,
} from "../controllers/favController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Auth
router.post("/register", register);
router.post("/login", login);

//Properties
router.get("/properties", getAllProperties);
router.get("/properties/:id", getPropertyById);

//Favorites
router.get("/favorites", auth, getFavoritesByUserId);
router.post("/favorites/:property_id", auth, addFavorite);
router.delete("/favorites/:property_id", auth, removeFavorite);

export default router;
