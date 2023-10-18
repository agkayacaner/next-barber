/*
  Warnings:

  - You are about to drop the column `endTime` on the `WorkingHours` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `WorkingHours` table. All the data in the column will be lost.
  - Added the required column `hour` to the `WorkingHours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkingHours" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "hour" TEXT NOT NULL;
