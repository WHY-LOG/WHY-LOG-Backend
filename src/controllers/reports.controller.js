import { StatusCodes } from "http-status-codes";
import { bodyToReports, responseFromReports } from "../dtos/reports.dto.js";
import { createReport } from "../services/reports.service.js";

export const handleCreateReports = async (req, res, next) => {
    console.log("레포트 생성을 요청하였습니다.");
    console.log("body: ", req.body);

    try{
        const report = await createReport(bodyToReports({
            userId: parseInt(req.params.userId),
            year: req.body.year
    }));
        res.status(StatusCodes.OK).json({ result: responseFromReports(report) });
    } catch(err) {
        next(err);
    }
}