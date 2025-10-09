/*
  Warnings:

  - A unique constraint covering the columns `[traineeId]` on the table `allowed_emails` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."allowed_emails" ADD COLUMN     "traineeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "allowed_emails_traineeId_key" ON "public"."allowed_emails"("traineeId");
