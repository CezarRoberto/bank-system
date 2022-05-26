/*
  Warnings:

  - Added the required column `credits` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "credits" TEXT NOT NULL;
