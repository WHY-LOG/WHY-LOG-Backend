import { StatusCodes } from "http-status-codes";
import { createRecordDto, getRecordDto, updateRecordDto, deleteRecordDto } from "../dtos/record.dtos.js";
import { createRecord, getRecord, updateRecord, deleteRecord } from "../services/record.service.js";

export const handleCreateRecord = async (req, res, next) => {
    console.log("한 줄 기록 생성을 요청하였습니다.");
    console.log("body: ", req.body);
    
    try{
        const userId = req.params.userId;
        const result = await createRecord(createRecordDto({userId, body: req.body}))
        res.status(StatusCodes.OK).success(result);
    } catch(err) {
        next(err);
    }
}

export const handleGetRecord = async (req, res, next) => {
    console.log("한 줄 기록 조회을 요청하였습니다.");

    try{
        const userId = req.params.userId;
        const categoryId = req.query.categoryId;
        const result = await getRecord(getRecordDto({userId, categoryId}))
        res.status(StatusCodes.OK).success(result);
    } catch(err) {
        next(err);
    }
    
}

export const handleUpdateRecord = async (req, res, next) => {
    console.log("한 줄 기록 수정을 요청하였습니다.");
    console.log("body: ", req.body);

    try{
        const {userId, recordId} = req.params
        const result = await updateRecord(updateRecordDto({userId, recordId, body: req.body}))
        res.status(StatusCodes.OK).success(result);
    } catch(err) {
        next(err);
    }    
}

export const handleDeleteRecord = async (req, res, next) => {
    console.log("한 줄 기록 삭제을 요청하였습니다.");

    try{
        const {userId, recordId} = req.params
        const result = await deleteRecord(deleteRecordDto({userId, recordId}))
        res.status(StatusCodes.OK).success(result);
    } catch(err) {
        next(err);
    }
}