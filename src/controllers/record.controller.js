import { StatusCodes } from "http-status-codes";
import { createRecordDto, getRecordDto, updateRecordDto, deleteRecordDto } from "../dtos/record.dtos.js";
import { createRecord, getRecord, updateRecord, deleteRecord } from "../services/record.service.js";

export const handleCreateRecord = async (req, res, next) => {
    const userId = req.params.userId;
    const result = await createRecord(createRecordDto({userId, body: req.body}))

    res.status(StatusCodes.OK).success(result);
}

export const handleGetRecord = async (req, res, next) => {
    const userId = req.params.userId;
    const categoryId = req.query.categoryId;

    const result = await getRecord(getRecordDto({userId, categoryId}))

    res.status(StatusCodes.OK).success(result);
}

export const handleUpdateRecord = async (req, res, next) => {
    const {userId, recordId} = req.params
    const result = await updateRecord(updateRecordDto({userId, recordId, body: req.body}))

    res.status(StatusCodes.OK).success(result);
}

export const handleDeleteRecord = async (req, res, next) => {
    const {userId, recordId} = req.params
    const result = await deleteRecord(deleteRecordDto({userId, recordId}))

    res.status(StatusCodes.OK).success(result);
}