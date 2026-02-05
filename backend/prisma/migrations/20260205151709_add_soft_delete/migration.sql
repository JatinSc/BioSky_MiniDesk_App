-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Ticket_isDeleted_idx" ON "Ticket"("isDeleted");
