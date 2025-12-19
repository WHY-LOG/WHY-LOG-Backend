import { StatusCodes } from "http-status-codes";

export const createRecordDto = (data) => {
    const errors = [];

    const validateTarget = {
        userId: data.userId,
        ...data.body
    };

    const requireFields = ["userId", "title", "content", "occurDate", "category"];

    for(const field of requireFields){
        if(!validateTarget[field]) errors.push(({field: field, reason: "필드가 누락되었습니다."}));
    }

    if(validateTarget.occurDate){
        const regex = /^\d{4}-\d{2}$/;
        if(!regex.test(validateTarget.occurDate)) errors.push(({field: "occurDate", reason: "날짜 형식은 YYYY-MM 이어야 합니다."}));
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
    const errors = [];
    console.log(data);
    const requireFields = ["userId", "year", "month"]; 

    for(const field of requireFields){
        if(!data[field]) errors.push(({field: field, reason: "필드가 누락되었습니다."}));
    }

    if(Number(data.month) < 1 || Number(data.month) > 12) {
        errors.push({field: "month", reason: "월은 1-12 사이의 값이어야 합니다."})
    }

    if(errors.length > 0) {
        const err = new Error("입력값이 유효하지 않습니다.");
        err.statusCode = StatusCodes.BAD_REQUEST;
        err.errorCode = "C001";
        err.data = errors;
        throw err;
    }

    const paddedMonth = String(data.month).padStart(2, '0');

    return {
        userId: Number(data.userId),
        categoryId: Number(data.categoryId),
        occurDate: new Date(`${data.year}-${paddedMonth}`)
    }
}

export const updateRecordDto = (data) => {
    const errors = [];

    const validateTarget = {
        userId: data.userId,
        recordId: data.recordId,
        ...data.body
    };

    const requireFields = ["userId", "recordId", "title", "content", "occurDate", "category"];

    for(const field of requireFields){
        if(!validateTarget[field]) errors.push(({field: field, reason: "필드가 누락되었습니다."}));
    }

    if(validateTarget.occurDate){
        const regex = /^\d{4}-\d{2}$/;
        if(!regex.test(validateTarget.occurDate)) errors.push(({field: "occurDate", reason: "날짜 형식은 YYYY-MM 이어야 합니다."}));
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
        recordId: Number(data.recordId),
        title: data.body.title,
        content: data.body.content,
        category: data.body.category,
        occurDate: new Date(data.body.occurDate),
        updatedAt: new Date()
    }
}

export const deleteRecordDto = (data) => {
    const errors = [];

    const requireFields = ["userId", "recordId"];

    for(const field of requireFields){
        if(!data[field]) errors.push(({field: field, reason: "필드가 누락되었습니다."}));
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
        recordId: Number(data.recordId)
    }
}