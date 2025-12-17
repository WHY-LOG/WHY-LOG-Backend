export const createRecordDto = (data) => {
    return {
        userId: Number(data.userId),
        title: data.body.title,
        content: data.body.content,
        category: data.body.category,
        occurDate: new Date(data.body.occurDate),
        updatedAt: new Date()
    }
}

export const getRecordDto = (data) => {
    return {
        userId: Number(data.userId),
        categoryId: Number(data.categoryId)
    }
}

export const updateRecordDto = (data) => {
    return {
        userId: Number(data.userId),
        recordId: Number(data.recordId),
        title: data.body.title,
        content: data.body.content,
        category: data.body.category,
        occurDate: new Date(data.body.occurDate),
        updatedAt: new Date()
    }
}

export const deleteRecordDto = (data) => {
    return {
        userId: Number(data.userId),
        recordId: Number(data.recordId)
    }
}