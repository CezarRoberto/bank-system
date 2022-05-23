/*
  Warnings:

  - You are about to drop the `_ClientsOnTransactions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `client_id` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ClientsOnTransactions" DROP CONSTRAINT "_ClientsOnTransactions_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClientsOnTransactions" DROP CONSTRAINT "_ClientsOnTransactions_B_fkey";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "client_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ClientsOnTransactions";

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
