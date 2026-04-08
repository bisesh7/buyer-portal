import express from "express";
import { register, login } from "../controllers/authController.js";
import {
  getAllProperties,
  getPropertyById,
} from "../controllers/propertiesController.js";

const router = express.Router();

// Auth
router.post("/register", register);
router.post("/login", login);

//Properties
router.get("/properties", getAllProperties);
router.get("/properties/:id", getPropertyById);

export default router;
