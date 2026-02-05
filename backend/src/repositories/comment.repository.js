const prisma = require("../lib/prisma");

async function createComment(data) {
  return prisma.comment.create({
    data,
  });
}

module.exports = {
  createComment,
};