import { StatusCodes } from 'http-status-codes';
import { 
    createRecord as createRecordRepo, 
    getRecords as getRecordsRepo, 
    updateRecord as updateRecordRepo,
    deleteRecord as deleteRecordRepo,
    existingRecord } from '../repositories/record.repository.js'
import { findUserById } from '../repositories/user.repository.js';
import { responseFromRecord, responseFromDeletedRecord } from '../dtos/record.dtos.js';

export const createRecord = async (data) => {
    const user = await findUserById(data.userId);
    
    if (!user) {
        const err = new Error("생성된 유저를 찾을 수 없습니다.");
        err.statusCode = 404;
        err.errorCode = "U003";
        throw err;
    }
    
    try{
        const record = await createRecordRepo(data);
        return responseFromRecord(record);
    } catch (error) {
        const err = new Error("기록 생성 중 서버 오류.");
        err.StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR;
        err.errorCode = "C999";
        err.data = data;
        throw err;
    }
    
}

export const getRecord = async (data) => {
    const user = await findUserById(data.userId);
    
    if (!user) {
        const err = new Error("생성된 유저를 찾을 수 없습니다.");
        err.statusCode = 404;
        err.errorCode = "U003";
        throw err;
    }

    try{
        const records = await getRecordsRepo(data);
        const result = records.map(record => responseFromRecord(record))
        return result;
    } catch (error) {
        const err = new Error("기록 조회 중 서버 오류.");
        err.StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR;
        err.errorCode = "C999";
        throw err;
    }
}

export const updateRecord = async (data) => {
    const isExist = await existingRecord({userId: data.userId, recordId: data.recordId});
    
    if(!isExist) {
        const err = new Error("한 줄 기록을 찾을 수 없습니다.");
        err.StatusCodes = 404;
        err.errorCode = "C004";
        throw err;
    }

    try{
        const record = await updateRecordRepo(data);
        return responseFromRecord(record);
    } catch(error) {
        const err = new Error("기록 수정 중 서버 오류.");
        err.StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR;
        err.errorCode = "C999";
        throw err;
    }
}

export const deleteRecord = async (data) => {
    const isExist = await existingRecord({userId: data.userId, recordId: data.recordId});
    
    if(!isExist) {
        const err = new Error("한 줄 기록을 찾을 수 없습니다.");
        err.StatusCodes = 404;
        err.errorCode = "C004";
        throw err;
    }

    try{
        const deletedRecordId = await deleteRecordRepo(data);
        return responseFromDeletedRecord(deletedRecordId);
    } catch(error) {
        const err = new Error("기록 삭제 중 서버 오류.");
        err.StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR;
        err.errorCode = "C999";
        throw err;
    }
    
}