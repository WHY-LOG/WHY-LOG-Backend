/*
  Warnings:

  - You are about to drop the `Record_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Record_categories` DROP FOREIGN KEY `Record_categories_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Record_categories` DROP FOREIGN KEY `Record_categories_record_id_fkey`;

-- DropForeignKey
ALTER TABLE `Report_categories` DROP FOREIGN KEY `Report_categories_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Report_categories` DROP FOREIGN KEY `Report_categories_report_id_fkey`;

-- AlterTable
ALTER TABLE `Record` MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `Record_categories`;

-- DropTable
DROP TABLE `Report_categories`;

-- CreateTable
CREATE TABLE `RecordCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `record_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    INDEX `record_id`(`record_id`),
    INDEX `catecory_id`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReportCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `report_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    INDEX `category_id`(`category_id`),
    INDEX `report_id`(`report_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecordCategory` ADD CONSTRAINT `RecordCategory_record_id_fkey` FOREIGN KEY (`record_id`) REFERENCES `Record`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecordCategory` ADD CONSTRAINT `RecordCategory_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportCategory` ADD CONSTRAINT `ReportCategory_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportCategory` ADD CONSTRAINT `ReportCategory_report_id_fkey` FOREIGN KEY (`report_id`) REFERENCES `Report`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
