require("dotenv").config();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();

  const ticket1 = await prisma.ticket.create({
    data: {
      title: "Unable to login to account",
      description:
        "I am unable to login to my account using my email and password. It keeps showing invalid credentials.",
      priority: "HIGH",
      status: "OPEN",
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      title: "Page not loading on mobile",
      description:
        "The dashboard page is not loading properly on mobile devices. It stays blank after login.",
      priority: "MEDIUM",
      status: "IN_PROGRESS",
    },
  });

  const ticket3 = await prisma.ticket.create({
    data: {
      title: "Feature request: Dark mode",
      description:
        "It would be great to have a dark mode option for the application, especially for night usage.",
      priority: "LOW",
      status: "RESOLVED",
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        ticketId: ticket1.id,
        authorName: "Support Agent",
        message:
          "We are looking into this issue. Could you confirm if you reset your password?",
      },
      {
        ticketId: ticket1.id,
        authorName: "User",
        message:
          "Yes, I tried resetting the password but it still doesn’t work.",
      },
      {
        ticketId: ticket2.id,
        authorName: "Support Agent",
        message:
          "Thanks for reporting. Our team is investigating mobile compatibility.",
      },
      {
        ticketId: ticket3.id,
        authorName: "Product Team",
        message:
          "Dark mode has been added to our roadmap. Thanks for the suggestion!",
      },
    ],
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
