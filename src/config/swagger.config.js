import swaggerUi from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";

const options = {
  openapi: "3.0.0",
  disableLogs: true,
  writeOutputFile: false,
};

const doc = {
  info: {
    title: "WhyLog API",
    description: "WhyLog API 명세입니다.",
    version: "1.0.0",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

export const swaggerSetup = (app) => {
  // 1. Swagger UI 연결
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup({}, {
      swaggerOptions: {
        url: "/openapi.json",
      },
    })
  );

  // 2. JSON 문서 생성 및 제공
  app.get("/openapi.json", async (req, res) => {
    const outputFile = "/dev/null";
    const routes = ["./src/index.js"]; 
    
    const result = await swaggerAutogen(options)(outputFile, routes, doc);
    res.json(result ? result.data : null);
  });
};