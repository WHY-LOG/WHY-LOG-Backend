/*
  Warnings:

  - You are about to drop the column `platform` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userReferenceId` on the `User` table. All the data in the column will be lost.
  - Changed the type of `occur_date` on the `Record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `user_id` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_userReferenceId_key` ON `User`;

-- AlterTable
ALTER TABLE `Record` DROP COLUMN `occur_date`,
    ADD COLUMN `occur_date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Report` ADD COLUMN `user_id` INTEGER NOT NULL,
    ADD COLUMN `year` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `platform`,
    DROP COLUMN `refreshToken`,
    DROP COLUMN `userReferenceId`,
    ADD COLUMN `img_url` VARCHAR(200) NULL;

-- CreateIndex
CREATE INDEX `Report_user_id_idx` ON `Report`(`user_id`);

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
