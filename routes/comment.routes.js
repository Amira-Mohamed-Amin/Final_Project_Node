import express from "express";

import {
  addComment,
  deleteComment,
} from "../controllers/comment.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";

import { createCommentSchema } from "../validations/comment.validation.js";

const router = express.Router();

router.post(
  "/posts/:postId/comments",
  authenticate,
  validate(createCommentSchema),
  addComment
);

router.delete(
  "/comments/:id",
  authenticate,
  deleteComment
);

export default router;