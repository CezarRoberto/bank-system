/*
  Warnings:

  - Added the required column `amount` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `amount` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL;
