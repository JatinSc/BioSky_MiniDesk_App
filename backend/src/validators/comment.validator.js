const { z } = require("zod");

const createCommentSchema = z.object({
  authorName: z.string().min(1, "Author name is required"),
  message: z
    .string()
    .min(1, "Message must be at least 1 character")
    .max(500, "Message must be at most 500 characters"),
});

module.exports = {
  createCommentSchema,
};