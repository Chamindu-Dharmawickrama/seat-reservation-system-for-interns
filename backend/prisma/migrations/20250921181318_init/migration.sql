/*
  Warnings:

  - Added the required column `purpose` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."reservations" ADD COLUMN     "purpose" TEXT NOT NULL;
