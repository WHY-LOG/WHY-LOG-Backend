import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { swaggerSetup } from "./config/swagger.config.js";
import { handleCreateRecord, handleGetRecord, handleUpdateRecord, handleDeleteRecord } from "./controllers/record.controller.js";
import { handleCreateReport, handleUpdateReport } from "./controllers/report.controller.js";
import { handleCreateUser, handleDeleteUser, handleGetUser, handleUpdateUser } from "./controllers/user.controller.js";



dotenv.config();

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

swaggerSetup(app); //swagger 세팅

app.use((req, res, next) => {
  console.log(req.body);
  next();
})

// User
app.post("/api/user", handleCreateUser);
app.get("/api/user/:userId", handleGetUser);
app.put("/api/user/:userId", handleUpdateUser);
app.delete("/api/user/:userId", handleDeleteUser);

// Report
app.post("/api/user/:userId/reports", handleCreateReport);
app.put("/api/users/:userId/reports/:reportId", handleUpdateReport);

// Record
app.post("/api/users/:userId/records", handleCreateRecord)
app.get("/api/users/:userId/records", handleGetRecord)
app.put("/api/users/:userId/records/:recordId", handleUpdateRecord)
app.delete("/api/users/:userId/records/:recordId", handleDeleteRecord)

app.use((err, req, res, next) => {
  if(res.headersSent){
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});