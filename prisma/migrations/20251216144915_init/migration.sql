/*
  Warnings:

  - You are about to alter the column `content` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Report` MODIFY `content` VARCHAR(191) NOT NULL;
