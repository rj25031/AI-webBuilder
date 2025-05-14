import express from "express";
import { generateWebsite } from "../controller/AIcontoller.js";

const router = express.Router();

router.post("/generate", generateWebsite);

export default router;
