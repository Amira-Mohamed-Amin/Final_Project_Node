import Comment from "../models/Comment.model.js";

export const addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    const comment = await Comment.create({
      content,
      user: req.user.id,
      post: postId,
    });

    return res.status(201).json({
      message: "Comment added successfully",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const isOwner = comment.user.toString() === req.user.id.toString();
const isAdmin = req.user.role === "admin";

if (!isOwner && !isAdmin) {
  return res.status(403).json({
    message: "You are not authorized to delete this comment",
  });
}

    await Comment.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};