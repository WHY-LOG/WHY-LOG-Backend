/*
  Warnings:

  - You are about to drop the `RecordCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReportCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `RecordCategory` DROP FOREIGN KEY `RecordCategory_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `RecordCategory` DROP FOREIGN KEY `RecordCategory_record_id_fkey`;

-- DropForeignKey
ALTER TABLE `ReportCategory` DROP FOREIGN KEY `ReportCategory_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `ReportCategory` DROP FOREIGN KEY `ReportCategory_report_id_fkey`;

-- DropTable
DROP TABLE `RecordCategory`;

-- DropTable
DROP TABLE `ReportCategory`;

-- CreateTable
CREATE TABLE `RecordCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `record_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    INDEX `record_id`(`record_id`),
    INDEX `catecory_id`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReportCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `report_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    INDEX `category_id`(`category_id`),
    INDEX `report_id`(`report_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecordCategories` ADD CONSTRAINT `RecordCategories_record_id_fkey` FOREIGN KEY (`record_id`) REFERENCES `Record`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecordCategories` ADD CONSTRAINT `RecordCategories_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportCategories` ADD CONSTRAINT `ReportCategories_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportCategories` ADD CONSTRAINT `ReportCategories_report_id_fkey` FOREIGN KEY (`report_id`) REFERENCES `Report`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
