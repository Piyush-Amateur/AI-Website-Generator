import express from "express";
import { generateWebsite } from "../controllers/generateController.js";

const router = express.Router();

router.post("/", generateWebsite);

export default router;
