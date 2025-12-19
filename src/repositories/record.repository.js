import { prisma } from '../config/db.config.js'

// userId, title, content, occurDate, updatedAt
export const createRecord = async (data) => {
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
        categories: record.recordCategories.map(rc => ({
            categoryId: rc.categories.id, 
            categoryName: rc.categories.categoryName
        }))
    }

    return formattedRecord;
}

// userId, categoryId
export const getRecords = async (data) => {
    const nextDate = new Date(data.occurDate);
    nextDate.setDate(data.occurDate.getDate() + 1);

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
                            id: true,
                            categoryName: true
                        }
                    }
                }
            }
        },
        where: {
            userId: data.userId,
            occurDate: {
                gte: data.occurDate,
                lt: nextDate
            },
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
        categories: record.recordCategories.map(rc => ({
            categoryId: rc.categories.id, 
            categoryName: rc.categories.categoryName
        }))
    }));

    return formattedRecords;
}

// userId, recordId, title?, content?, occurDate?, category?, updatedAt
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
        include: {
            recordCategories: {
                include: {
                    categories: true
                }
            }
        },
        where: {
            id: data.recordId,
            userId: data.userId
        },
    })
    
    const formattedRecord = {
        id: record.id,
        title: record.title,
        content: record.content,
        occurDate: record.occurDate,
        categories: record.recordCategories.map(rc => ({
            categoryId: rc.categories.id, 
            categoryName: rc.categories.categoryName
        }))
    }
    return formattedRecord;
}

// userId, recordId
export const existingRecord = async (data) => {
    const record = await prisma.record.findFirst({
        where: {
            id: data.recordId,
            userId: data.userId
        }
    })

    return record;
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

    return data.recordId
}