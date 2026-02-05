const { z } = require("zod");

const createTicketSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(80, "Title must be at most 80 characters"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must be at most 2000 characters"),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});


const updateTicketSchema = z
  .object({
    title: z
      .string()
      .min(5, "Title must be at least 5 characters")
      .max(80, "Title must be at most 80 characters")
      .optional(),

    description: z
      .string()
      .min(20, "Description must be at least 20 characters")
      .max(2000, "Description must be at most 2000 characters")
      .optional(),

    status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED"]).optional(),

    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

module.exports = {
  createTicketSchema,
  updateTicketSchema, 
};
