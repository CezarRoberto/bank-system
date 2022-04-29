-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAW');

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL DEFAULT E'DEPOSIT',
    "amount" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClientsOnTransactions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "transactions_id_key" ON "transactions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ClientsOnTransactions_AB_unique" ON "_ClientsOnTransactions"("A", "B");

-- CreateIndex
CREATE INDEX "_ClientsOnTransactions_B_index" ON "_ClientsOnTransactions"("B");

-- AddForeignKey
ALTER TABLE "_ClientsOnTransactions" ADD CONSTRAINT "_ClientsOnTransactions_A_fkey" FOREIGN KEY ("A") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientsOnTransactions" ADD CONSTRAINT "_ClientsOnTransactions_B_fkey" FOREIGN KEY ("B") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
