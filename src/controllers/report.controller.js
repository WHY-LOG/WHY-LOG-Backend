import { StatusCodes } from "http-status-codes";
import { bodyToReport, responseFromReport, bodyToUpdateReport, bodyToGetReport, bodyToDeleteReport } from "../dtos/report.dto.js";
import { createReport, updateReport, getReports, deleteReport } from "../services/report.service.js";

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
             error: { errorCode: "R003", reason: "해당 연도의 레포트가 이미 존재합니다.", data: {} },
             success: null
        }
    }
    #swagger.responses[500] = {
        description: '서버 내부 오류',
        schema: {
            resultType: "FAIL",
            error: { errorCode: "R999", reason: "서버 내부 오류가 발생했습니다.", data: {} },
            success: null
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

export const handleGetReport = async (req, res, next) => {
    /* 
    #swagger.tags = ['Report']
    #swagger.summary = '리포트 조회 API'
    #swagger.description = '특정 리포트를 조회합니다.'
    #swagger.parameters['userId'] = { description: '유저 ID', type: 'integer' }
    #swagger.responses[200] = {
        description: '리포트 조회 성공',
        schema: {
            result: [
                {
                    reportId: 1,
                    year: 2025,
                    standard: "AI 코멘트...",
                    content: "사용자 입력 내용",
                    graphData: [
                        { categoryId: 1, categoryName: "비교", count: 10, percent: 30 }
                    ]
                }
            ]
        }
    }
    #swagger.responses[404] = {
        description: '리포트 없음',
        schema: {
            resultType: "FAIL",
            error: { errorCode: "R004", reason: "레포트가 존재하지 않습니다.", data: {} },
            success: null
        }
    }
    #swagger.responses[500] = {
        description: '서버 내부 오류',
        schema: {
            resultType: "FAIL",
            error: { errorCode: "R999", reason: "서버 내부 오류가 발생했습니다.", data: {} },
            success: null
        }
    }
    */
    console.log("리포트 조회를 요청하였습니다.");
    
    try {
        const reports = await getReports(bodyToGetReport({
            userId: parseInt(req.params.userId),
        }));
        // 배열의 각 요소를 DTO로 변환
        res.status(StatusCodes.OK).json({ result: reports.map(responseFromReport) });
    } catch(err) {
        next(err);
    }
}

export const handleUpdateReport = async (req, res, next) => {
    /* 
    #swagger.tags = ['Report']
    #swagger.summary = '리포트 수정 API'
    #swagger.description = '사용자가 입력한 리포트 내용을 수정합니다.'
    #swagger.parameters['userId'] = { description: '유저 ID', type: 'integer' }
    #swagger.parameters['reportId'] = { description: '리포트 ID', type: 'integer' }
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        content: { type: "string", example: "사용자 입력 내용" }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: '리포트 수정 성공',
        schema: {
            result: {
                reportId: 1,
                year: 2025,
                standard: "AI 코멘트...",
                content: "사용자 입력 내용",
                graphData: [
                    { categoryId: 1, categoryName: "비교", count: 10, percent: 30 }
                ]
            }
        }
    }
    #swagger.responses[404] = {
        description: '리포트 없음',
        schema: {
            resultType: "FAIL",
            error: { errorCode: "R004", reason: "레포트가 존재하지 않습니다.", data: {} },
            success: null
        }
    }
    #swagger.responses[500] = {
        description: '서버 내부 오류',
        schema: {
            resultType: "FAIL",
            error: { errorCode: "R999", reason: "서버 내부 오류가 발생했습니다.", data: {} },
            success: null
        }
    }
    */
    console.log("리포트 수정을 요청하였습니다.");
    console.log("body: ", req.body);

    try {
        const report = await updateReport(bodyToUpdateReport({
            userId: parseInt(req.params.userId),
            reportId: parseInt(req.params.reportId),
            content: req.body.content
        }));
        res.status(StatusCodes.OK).json({ result: responseFromReport(report) });
    } catch(err) {
        next(err);
    }
}

export const handleDeleteReport = async (req, res, next) => {
    /* 
    #swagger.tags = ['Report']
    #swagger.summary = '리포트 삭제 API'
    #swagger.description = '특정 리포트를 삭제합니다.'
    #swagger.parameters['userId'] = { description: '유저 ID', type: 'integer' }
    #swagger.responses[200] = {
        description: '리포트 삭제 성공',
        schema: {
            {
                "resultType": "SUCCESS",
                "error": null,
                "success": {
                    "reportId": 3
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: '리포트 없음',
        schema: {
            resultType: "FAIL",
            error: { errorCode: "R004", reason: "레포트가 존재하지 않습니다.", data: {} },
            success: null
        }
    }
    #swagger.responses[500] = {
        description: '서버 내부 오류',
        schema: {
            resultType: "FAIL",
            error: { errorCode: "R999", reason: "서버 내부 오류가 발생했습니다.", data: {} },
            success: null
        }
    }
    */
    console.log("리포트 삭제를 요청하였습니다.");

    try {
        const deletedId = await deleteReport(bodyToDeleteReport({
            userId: parseInt(req.params.userId),
            reportId: parseInt(req.params.reportId)
        }));
        res.status(StatusCodes.OK).success({reportId: deletedId});
    } catch(err) {
        next(err);
    }
}