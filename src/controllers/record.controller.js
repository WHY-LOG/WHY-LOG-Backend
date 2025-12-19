import { StatusCodes } from "http-status-codes";
import { bodyToRecord, bodyToGetRecord, bodyToUpdateRecord, bodyToDeleteRecord } from "../dtos/record.dtos.js";
import { createRecord, getRecord, updateRecord, deleteRecord } from "../services/record.service.js";

export const handleCreateRecord = async (req, res, next) => {
    /*
    #swagger.tags = ['Record']
    #swagger.summary = '한 줄 기록 생성 API'
    #swagger.description = '특정 유저의 한 줄 기록을 생성합니다.'
    #swagger.parameters['userId'] = { in: 'path', description: '유저 ID', type: 'integer' }
    #swagger.query['categoryId'] = { ignore: true }

    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        title: { 
                            type: "string", 
                            example: "번지점프 예약해놓고 취소했다.",
                            description: "기록 제목"
                        },
                        content: {
                            type: "string",
                            example: "버킷리스트 중 하나여서 번지점프 예약...",
                            description: "상세 내용"
                        },
                        category: {
                            type: "array",
                            example: [3, 4],
                            items: {
                                type: "integer"
                            },
                            description: "카테고리 아이디 배열"
                        },
                        occurDate: {
                            type: "string",
                            example: "2025-12",
                            description: "일어난 날짜 (YYYY-MM)"
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: "생성 성공 응답",
        schema: {
            resultType: "SUCCESS",
            error: "null",
            success: {
                RecordId: 1,
                title: "번지점프 예약해놓고 취소했다.",
                content: "버킷리스트 중 하나여서 번지점프 예약...",
                occurDate: "2025-12-01T00:00:00.000Z",
                categories: [
                    {
                        "categoryId": 3,
                        "categoryName": "기대"
                    },
                    {
                        "categoryId": 4,
                        "categoryName": "회피"
                    }
                ]
            }
        }
    }
    #swagger.responses[400] = {
        description: "필수 파라미터 누락",
        schema: {
            resultType: "FAIL",
            error: {
                errorCode: "C001",
                reason: "입력값이 유효하지 않습니다.",
                "data" : [
                    {
                        "field": "title",
                        "reason": "필드가 누락되었습니다."
                    }
                ]
            },
            success: "null"
        }
    }
    #swagger.responses[404] = {
        description: "존재하지 않는 유저",
        schema: {
            resultType: "FAIL",
            error: {
                errorCode: "U003",
                reason: "생성된 유저를 찾을 수 없습니다.",
                data : "null"
            },
            success: "null"
        }
    }
    #swagger.responses[500] = {
        description: "기록 생성 중 서버 오류 (다시 시도)",
        schema: {
            resultType: "FAIL",
            error: {
                errorCode: "C999",
                reason: "기록 생성 중 서버 오류.",
                data : {
                    userId: 1,
                    title: "번지점프 예약해놓고 취소했다.",
                    content: "버킷리스트 중 하나여서 번지점프 예약...",
                    occurDate: "2025-12-01T00:00:00.000Z",
                    updateDate: "2025-12-02T00:00:00.00Z",
                    categories: [3, 4]
                }
            },
            success: "null"
        }
    }
    */
    console.log("한 줄 기록 생성을 요청하였습니다.");
    console.log("body: ", req.body);
    
    try{
        const userId = req.params.userId;
        const result = await createRecord(bodyToRecord({userId, body: req.body}))
        res.status(StatusCodes.OK).success(result);
    } catch(err) {
        next(err);
    }
}

export const handleGetRecord = async (req, res, next) => {
    /*
    #swagger.auto = false
    #swagger.tags = ['Record']
    #swagger.summary = '한 줄 기록 조회 API'
    #swagger.description = '특정 유저의 연도와 월에 해당하는 한 줄 기록을 가져옵니다.'
    #swagger.parameters['userId'] = { in: 'path', description: '유저 ID', type: 'integer' }
    #swagger.parameters['year'] = { in: 'query', required: true, description: '조회할 연도', type: 'integer' }
    #swagger.parameters['month'] = { in: 'query', required: true, description: '조회할 월', type: 'integer' }
    #swagger.parameters['categoryId'] = { in: 'query', description: '필터링할 카테고리 ID', type: 'integer' }

    #swagger.responses[200] = {
        description: "조회 성공 응답",
        schema: {
            resultType: "SUCCESS",
            error: "null",
            success: [
                {
                    RecordId: 2,
                    title: "싸웠던 친구에게 다가가 화해를 하지 못했다.",
                    content: "사실 별거 아닌 거 그냥 먼저 얘기...",
                    occurDate: "2025-12-01T00:00:00.000Z",
                    categories: [
                        {
                            "categoryId": 3,
                            "categoryName": "기대"
                        },
                        {
                            "categoryId": 4,
                            "categoryName": "회피"
                        }
                    ]
                }
            ]
        }
    }
    #swagger.responses[404] = {
        description: "존재하지 않는 유저",
        schema: {
            resultType: "FAIL",
            error: {
                errorCode: "U003",
                reason: "생성된 유저를 찾을 수 없습니다.",
                data : "null"
            },
            success: "null"
        }
    }
    #swagger.responses[500] = {
        description: "기록 조회 중 서버 오류 (다시 시도)",
        schema: {
            resultType: "FAIL",
            error: {
                errorCode: "C999",
                reason: "기록 생성 중 서버 오류."
            },
            success: "null"
        }
    }
    */
    console.log("한 줄 기록 조회을 요청하였습니다.");

    try{
        const userId = req.params.userId;
        const {year, month, categoryId} = req.query;
        const result = await getRecord(bodyToGetRecord({userId, categoryId, year, month}))
        res.status(StatusCodes.OK).success(result);
    } catch(err) {
        next(err);
    }
    
}

export const handleUpdateRecord = async (req, res, next) => {
    /*
    #swagger.tags = ['Record']
    #swagger.summary = '한 줄 기록 수정 API'
    #swagger.description = '특정 유저의 한 줄 기록을 수정합니다.'
    #swagger.parameters['userId'] = { in: 'path', description: '유저 ID', type: 'integer' }
    #swagger.parameters['recordId'] = { in: 'path', description: '한 줄 기록 ID', type: 'integer'}

    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        title: { 
                            type: "string", 
                            example: "테스트 데이터",
                            description: "기록 제목"
                        },
                        content: {
                            type: "string",
                            example: "테스트 데이터",
                            description: "상세 내용"
                        },
                        category: {
                            type: "array",
                            example: [1, 2],
                            items: {
                                type: "integer"
                            },
                            description: "카테고리 아이디 배열"
                        },
                        occurDate: {
                            type: "string",
                            example: "2025-11",
                            description: "일어난 날짜 (YYYY-MM)"
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: "수정 성공 응답",
        schema: {
            resultType: "SUCCESS",
            error: "null",
            success: {
                RecordId: 1,
                title: "테스트 데이터",
                content: "테스트 데이터",
                occurDate: "2025-11-01T00:00:00.000Z",
                categories: [
                    {
                        "categoryId": 1,
                        "categoryName": "기대"
                    },
                    {
                        "categoryId": 2,
                        "categoryName": "회피"
                    }
                ]
            }
        }
    }
    #swagger.responses[400] = {
        description: "필수 파라미터 누락",
        schema: {
            resultType: "FAIL",
            error: {
                errorCode: "C001",
                reason: "입력값이 유효하지 않습니다.",
                "data" : [
                    {
                        "field": "title",
                        "reason": "필드가 누락되었습니다."
                    }
                ]
            },
            success: "null"
        }
    }
    #swagger.responses[404] = {
        description: "유저가 작성한 한 줄 기록의 ID가 아니거나 존재하지 않음",
        schema: {
            resultType: "FAIL",
            error: {
                errorCode: "C004",
                reason: "한 줄 기록을 찾을 수 없습니다.",
            },
            success: "null"
        }
    }
    #swagger.responses[500] = {
        description: "기록 수정 중 서버 오류 (다시 시도)",
        schema: {
            resultType: "FAIL",
            error: {
                errorCode: "C999",
                reason: "기록 수정 중 서버 오류.",
                data : {
                    userId: 1,
                    recordId: 1,
                    title: "테스트 데이터",
                    content: "테스트 데이터",
                    occurDate: "2025-11-01T00:00:00.000Z",
                    updateDate: "2025-12-02T00:00:00.00Z",
                    categories: [1, 2]
                }
            },
            success: "null"
        }
    }
    */
    console.log("한 줄 기록 수정을 요청하였습니다.");
    console.log("body: ", req.body);

    try{
        const {userId, recordId} = req.params
        const result = await updateRecord(bodyToUpdateRecord({userId, recordId, body: req.body}))
        res.status(StatusCodes.OK).success(result);
    } catch(err) {
        next(err);
    }    
}

export const handleDeleteRecord = async (req, res, next) => {
    /*
    #swagger.tags = ['Record']
    #swagger.summary = '한 줄 기록 삭제 API'
    #swagger.description = '특정 유저의 한 줄 기록을 삭제합니다.'
    #swagger.parameters['userId'] = { in: 'path', description: '유저 ID', type: 'integer' }
    #swagger.parameters['recordId'] = { in: 'path', description: '한 줄 기록 ID', type: 'integer'}

    #swagger.responses[200] = {
        description: "삭제 성공 응답",
        schema: {
            resultType: "SUCCESS",
            error: "null",
            success: {
                recordId: 1
            }
        }
    }
    #swagger.responses[404] = {
        description: "유저가 작성한 한 줄 기록의 ID가 아니거나 존재하지 않음",
        schema: {
            resultType: "FAIL",
            error: {
                errorCode: "C004",
                reason: "한 줄 기록을 찾을 수 없습니다.",
            },
            success: "null"
        }
    }
    #swagger.responses[500] = {
        description: "기록 수정 중 서버 오류 (다시 시도)",
        schema: {
            resultType: "FAIL",
            error: {
                errorCode: "C999",
                reason: "기록 수정 중 서버 오류.",
            },
            success: "null"
        }
    }
    */
    console.log("한 줄 기록 삭제을 요청하였습니다.");

    try{
        const {userId, recordId} = req.params
        const result = await deleteRecord(bodyToDeleteRecord({userId, recordId}))
        res.status(StatusCodes.OK).success(result);
    } catch(err) {
        next(err);
    }
}