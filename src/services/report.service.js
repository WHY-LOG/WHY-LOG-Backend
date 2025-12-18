import { StatusCodes } from "http-status-codes";
import { addReport, findMostUsedCategoriesByUserIdAndYear, findRecordContentsByUserIdAndYear } from "../repositories/report.repository.js"
import { generateAIResponse } from "./gemini.service.js";
import { createReportPrompts } from "../utils/prompts.js";
export const createReport = async (data) => {

    //req 필드 검사
    if(!data.userId || !data.year) {
        const err = new Error("userId 또는 year 필드가 누락되었습니다.");
        err.statusCode = StatusCodes.BAD_REQUEST;
        err.errorCode = "R001";
        err.data = data;
        throw err;
    }

    //모든 카테고리 집계
    const allCategories = await findMostUsedCategoriesByUserIdAndYear(data.userId, data.year, 100);

    //만약 해당 userId의 기록이 없다면:
    if (allCategories.length === 0) {
        const err = new Error("해당 유저의 기록이 없습니다.");
        err.statusCode = StatusCodes.NOT_FOUND;
        err.errorCode = "R002";
        err.data = data;
        throw err;
    }

    //총 카테고리 개수
    const totalCount = allCategories.reduce((sum, cat) => sum + cat.count, 0);
    
    //그래프 데이터 생성:
    //카테고리 ID, 카테고리 이름, 카테고리 개수, 퍼센테이지
    const graphData = allCategories.map(cat => ({
        categoryId: cat.categoryId,
        categoryName: cat.categoryName,
        count: cat.count,
        percent: Math.round((cat.count / totalCount) * 100) 
    }));

    const records = await findRecordContentsByUserIdAndYear(data.userId, data.year);
    // const top3Category = allCategories.slice(0,3);

    const prompt = createReportPrompts(records);
    //ai가 판단한 기준
    const standard = await generateAIResponse(prompt);

    //userId, year, standard, content(초기 생성에는 기본 null값) 
    const newReport = await addReport({
        userId: data.userId,
        year: data.year,
        standard: standard,
        content: ""
    });

    if (!newReport) {
        const err = new Error("해당 연도의 레포트가 이미 존재합니다.");
        err.StatusCodes = StatusCodes.CONFLICT;
        err.errorCode = "R003";
        err.data = data;
        throw err;
    }

    return {
        reportId: newReport.id,
        year: newReport.year,
        standard: newReport.standard,
        graphData: graphData
    };
}