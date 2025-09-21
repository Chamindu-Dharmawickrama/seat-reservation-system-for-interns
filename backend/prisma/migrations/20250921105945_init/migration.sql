/*
  Warnings:

  - The values [UNAVAILABLE] on the enum `SeatStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `endTime` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `reservations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[seatId,date]` on the table `reservations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."TimeSlot" AS ENUM ('FULLDAY', 'MORNING', 'AFTERNOON');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."SeatStatus_new" AS ENUM ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE');
ALTER TABLE "public"."seats" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."seats" ALTER COLUMN "status" TYPE "public"."SeatStatus_new" USING ("status"::text::"public"."SeatStatus_new");
ALTER TYPE "public"."SeatStatus" RENAME TO "SeatStatus_old";
ALTER TYPE "public"."SeatStatus_new" RENAME TO "SeatStatus";
DROP TYPE "public"."SeatStatus_old";
ALTER TABLE "public"."seats" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;

-- DropIndex
DROP INDEX "public"."reservations_seatId_date_startTime_endTime_key";

-- AlterTable
ALTER TABLE "public"."reservations" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "time" "public"."TimeSlot" NOT NULL DEFAULT 'FULLDAY';

-- CreateIndex
CREATE UNIQUE INDEX "reservations_seatId_date_key" ON "public"."reservations"("seatId", "date");
