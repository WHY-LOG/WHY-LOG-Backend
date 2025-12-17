import { 
    createRecord as createRecordRepo, 
    getRecord as getRecordRepo, 
    updateRecord as updateRecordRepo,
    deleteRecord as deleteRecordRepo } from '../repositories/record.repository.js'

export const createRecord = async (data) => {
    const record = await createRecordRepo(data);

    return record;
}

export const getRecord = async (data) => {
    const records = await getRecordRepo(data);

    return records;
}

export const updateRecord = async (data) => {
    const record = await updateRecordRepo(data);

    return record;
}

export const deleteRecord = async (data) => {
    const deletedRecordId = await deleteRecordRepo(data);

    return deletedRecordId
}