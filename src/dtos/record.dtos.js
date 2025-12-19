import { StatusCodes } from "http-status-codes";

export const bodyToRecord = (body) => {
    const errors = [];

    const validateTarget = {
        userId: body.userId,
        ...body.body
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
        userId: Number(body.userId),
        title: body.body.title,
        content: body.body.content,
        category: body.body.category,
        occurDate: new Date(body.body.occurDate),
        updatedAt: new Date()
    }
}

export const bodyToGetRecord = (body) => {
    const errors = [];
    const requireFields = ["userId", "year", "month"]; 

    for(const field of requireFields){
        if(!body[field]) errors.push(({field: field, reason: "필드가 누락되었습니다."}));
    }

    if(Number(body.month) < 1 || Number(body.month) > 12) {
        errors.push({field: "month", reason: "월은 1-12 사이의 값이어야 합니다."})
    }

    if(errors.length > 0) {
        const err = new Error("입력값이 유효하지 않습니다.");
        err.statusCode = StatusCodes.BAD_REQUEST;
        err.errorCode = "C001";
        err.data = errors;
        throw err;
    }

    const paddedMonth = String(body.month).padStart(2, '0');

    return {
        userId: Number(body.userId),
        categoryId: Number(body.categoryId),
        occurDate: new Date(`${body.year}-${paddedMonth}`)
    }
}

export const bodyToUpdateRecord = (body) => {
    const errors = [];

    const validateTarget = {
        userId: body.userId,
        recordId: body.recordId,
        ...body.body
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
        userId: Number(body.userId),
        recordId: Number(body.recordId),
        title: body.body.title,
        content: body.body.content,
        category: body.body.category,
        occurDate: new Date(body.body.occurDate),
        updatedAt: new Date()
    }
}

export const bodyToDeleteRecord = (body) => {
    const errors = [];

    const requireFields = ["userId", "recordId"];

    for(const field of requireFields){
        if(!body[field]) errors.push(({field: field, reason: "필드가 누락되었습니다."}));
    }

    if(errors.length > 0) {
        const err = new Error("입력값이 유효하지 않습니다.");
        err.statusCode = StatusCodes.BAD_REQUEST;
        err.errorCode = "C001";
        err.data = errors;
        throw err;
    }
    
    return {
        userId: Number(body.userId),
        recordId: Number(body.recordId)
    }
}

export const responseFromRecord = (body) => {
    return {
        RecordId: body.id,
        title: body.title,
        content: body.content,
        occurDate: body.occurDate,
        categories: body.categories 
    }
}

export const responseFromDeletedRecord = (body) => {
    return {
        RecordId: body
    }
}