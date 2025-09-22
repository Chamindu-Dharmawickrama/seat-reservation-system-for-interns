/*
  Warnings:

  - The values [CANCELLED] on the enum `ReservationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ReservationStatus_new" AS ENUM ('ACTIVE', 'UPCOMING', 'COMPLETED');
ALTER TABLE "public"."reservations" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."reservations" ALTER COLUMN "status" TYPE "public"."ReservationStatus_new" USING ("status"::text::"public"."ReservationStatus_new");
ALTER TYPE "public"."ReservationStatus" RENAME TO "ReservationStatus_old";
ALTER TYPE "public"."ReservationStatus_new" RENAME TO "ReservationStatus";
DROP TYPE "public"."ReservationStatus_old";
ALTER TABLE "public"."reservations" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;
