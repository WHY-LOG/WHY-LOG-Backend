import { StatusCodes } from "http-status-codes";
import { bodyToReport, responseFromReport } from "../dtos/report.dto.js";
import { createReport } from "../services/report.service.js";

export const handleCreateReport = async (req, res, next) => {
    /* 
    #swagger.tags = ['Report']
    #swagger.summary = '리포트 생성 API'
    #swagger.description = '특정 유저의 특정 연도에 대한 리포트를 생성합니다.'
    #swagger.parameters['userId'] = { description: '유저 ID', type: 'integer' }
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        year: { type: "integer", example: 2025 }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: '리포트 생성 성공',
        schema: {
            result: {
                reportId: 1,
                year: 2025,
                standard: "AI 코멘트...",
                graphData: [
                    { categoryId: 1, categoryName: "비교", count: 10, percent: 30 }
                ]
            }
        }
    }
    #swagger.responses[400] = {
        description: '필수 파라미터 누락',
        schema: {
            resultType: "FAIL",
            error: { errorCode: "R001", reason: "userId 또는 year 필드가 누락되었습니다.", data: {} },
            success: null
        }
    }
    #swagger.responses[404] = {
        description: '해당 연도의 기록 없음',
        schema: {
             resultType: "FAIL",
             error: { errorCode: "R002", reason: "해당 유저의 기록이 없습니다.", data: {} }
        }
    }
    #swagger.responses[409] = { 
        description: '이미 리포트가 존재함',
        schema: {
             resultType: "FAIL",
             error: { errorCode: "R003", reason: "해당 연도의 레포트가 이미 존재합니다.", data: {} }
        }
    }
    */
    console.log("레포트 생성을 요청하였습니다.");
    console.log("body: ", req.body);

    try{
        const report = await createReport(bodyToReport({
            userId: parseInt(req.params.userId),
            year: req.body.year
    }));
        res.status(StatusCodes.OK).json({ result: responseFromReport(report) });
    } catch(err) {
        next(err);
    }
}