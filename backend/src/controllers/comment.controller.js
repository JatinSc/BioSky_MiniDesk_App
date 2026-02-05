const { createCommentSchema } = require("../validators/comment.validator");
const commentService = require("../services/comment.service");

async function addComment(req, res, next) {
  try {
    const { id: ticketId } = req.params;

    const validatedData = createCommentSchema.parse(req.body);

    const comment = await commentService.addComment(
      ticketId,
      validatedData
    );

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    // Zod validation errors → 400
    if (error.name === "ZodError") {
      error.statusCode = 400;
    }
    next(error);
  }
}

module.exports = {
  addComment,
};
