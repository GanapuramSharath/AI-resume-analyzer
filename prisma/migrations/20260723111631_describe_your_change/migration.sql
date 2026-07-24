/*
  Warnings:

  - You are about to drop the column `stripeCustomerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSubscriptionId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paymentSubscriptionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_stripeCustomerId_key";

-- DropIndex
DROP INDEX "User_stripeSubscriptionId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripeCustomerId",
DROP COLUMN "stripeSubscriptionId",
ADD COLUMN     "paymentCustomerId" TEXT,
ADD COLUMN     "paymentSubscriptionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_paymentCustomerId_key" ON "User"("paymentCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_paymentSubscriptionId_key" ON "User"("paymentSubscriptionId");
