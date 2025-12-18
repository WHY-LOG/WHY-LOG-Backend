import { StatusCodes } from "http-status-codes";

export const createRecordDto = (data) => {
    const errors = [];
    const requireFields = ["userId", "title", "content", "occurDate", "category"];

    for(const field of requireFields){
        if(!data.body[field]) errors.push(({field: field, reason: "필드가 누락되었습니다."}));
    }

    try{
        const regex = /^\d{4}-\d{2}$/;
        if(!regex.test(data.body.occurDate)) errors.push(({field: "occurDate", reason: "occurDate 형식이 올바르지 않습니다"}));
    } catch (err) {
        errors.push(({field: "occurDate", reason: "올바르지 않은 날짜입니다"}));
    }

    if(errors.length > 0) {
        const err = new Error("입력값이 유효하지 않습니다.");
        err.statusCode = StatusCodes.BAD_REQUEST;
        err.errorCode = "C001";
        err.data = errors;
        throw err;
    }

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

    if(!data.userId) {
        const err = new Error("입력값이 유효하지 않습니다.");
        err.statusCode = StatusCodes.BAD_REQUEST;
        err.errorCode = "C001";
        err.data = {field: "userId", reason: "userId 형식이 올바르지 않습니다"};
        throw err;
    }

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