import { prisma } from '../config/db.config.js'

// userId, title, content, occurDate, updatedAt
export const createRecord = async (data) => {
    console.log(data);
    const record = await prisma.record.create({
        data: {
            userId: data.userId,
            title: data.title,
            content: data.content,
            occurDate: data.occurDate,
            recordCategories: {
                create: data.category.map(id => ({
                    categoryId: id
                }))
            }
        },
        include: {
            recordCategories: {
                include: {
                    categories: true
                }
            }
        }
    });

    const formattedRecord = {
        id: record.id,
        title: record.title,
        content: record.content,
        occurDate: record.occurDate,
        categories: record.recordCategories.map(rc => rc.categories.categoryName)
    }

    return formattedRecord;
}

// userId, categoryId
export const getRecord = async (data) => {
    const records = await prisma.record.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            occurDate: true,
            recordCategories: {
                select: {
                    categories: {
                        select: {
                            categoryName: true
                        }
                    }
                }
            }
        },
        where: {
            userId: data.userId,
            recordCategories: data.categoryId ? {
                some: {
                    categoryId: data.categoryId
                }
            }: undefined
        },
        orderBy: { 
            updatedAt: "desc"
        }
    });

    const formattedRecords = records.map(record => ({
        id: record.id,
        title: record.title,
        content: record.content,
        occurDate: record.occurDate,
        categories: record.recordCategories.map(rc => rc.categories.categoryName)
    }));

    return formattedRecords;
}

// recordId, title?, content?, occurDate?, category?, updatedAt
export const updateRecord = async (data) => {
    const record = await prisma.record.update({
        data: {
            title: data.title,
            content: data.content,
            occurDate: data.occurDate,
            recordCategories: {
                deleteMany: {},
                create: data.category.map(id => ({
                    categoryId: id
                }))
            }
        },
        where: {
            id: data.recordId,
        },
    })

    return record.id;
}

// recordId
export const deleteRecord = async (data) => {
    console.log(data);
    const deleteRecordCategory = prisma.recordCategories.deleteMany({
        where: {
            recordId: data.recordId
        }
    });

    const deleteRecord = prisma.record.delete({
        where: {
            id: data.recordId
        }
    });

    await prisma.$transaction([deleteRecordCategory, deleteRecord]);

    return deleteRecord.id
}