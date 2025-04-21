import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addPosts, deletePost, getPost, getPosts, updatePost } from "../controllers/postControler.js";
const router= express.Router();

router.get("/",getPosts);
router.get("/:id",getPost);
router.post("/",verifyToken, addPosts);
router.put("/:id",verifyToken,updatePost);
router.delete("/:id",verifyToken,deletePost);

export default router;