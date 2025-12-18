import { getUserById, userCreate } from "../services/user.service.js";
import { bodyToUser } from "../dtos/user.dto.js";
import { StatusCodes } from "http-status-codes";

// 유저 등록 API
export const handleCreateUser = async (req, res, next) => {
  console.log("유저 등록을 요청했습니다");
  console.log("body:", req.body);

  /*
    #swagger.summary = '유저 등록 API';
    #swagger.description = '유저 정보를 등록하거나 이메일이 이미 존재하면 정보를 갱신합니다.';
    #swagger.tags = ['User'];

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name", "email"],
            properties: {
              name: { type: "string", example: "홍길동" },
              email: { type: "string", example: "test@example.com" },
              imgUrl: {
                type: "string",
                nullable: true,
                example: "https://example.com/profile.jpg"
              }
            }
          }
        }
      }
    };

    #swagger.responses[200] = {
      description: "유저 등록 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  message: { type: "string", example: "회원가입 성공" },
                  data: {
                    type: "object",
                    properties: {
                      userId: { type: "number", example: 1 },
                      name: { type: "string", example: "홍길동" },
                      email: { type: "string", example: "test@example.com" },
                      imgUrl: {
                        type: "string",
                        nullable: true,
                        example: "https://example.com/profile.jpg"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    #swagger.responses[400] = {
      description: "잘못된 요청 (필수값 누락 / 이메일 형식 오류)"
    };

    #swagger.responses[500] = {
      description: "서버 오류"
    };
  */

  try {
    const user = await userCreate(bodyToUser(req.body));
    res.status(StatusCodes.OK).success(user);
  } catch (err) {
    next(err);
  }
};

// 유저 정보 조회 API
export const handleGetUser = async (req, res, next) => {

  /*
    #swagger.summary = '유저 프로필 조회 API';
    #swagger.description = 'userId를 기반으로 사용자 정보를 조회합니다.';
    #swagger.tags = ['User'];

    #swagger.parameters['userId'] = {
      in: 'path',
      description: '조회할 사용자 ID',
      required: true,
      schema: { type: 'integer' },
      example: 1
    };

    #swagger.responses[200] = {
      description: '유저 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  message: { type: "string", example: "유저 조회 성공" },
                  data: {
                    type: "object",
                    properties: {
                      userId: { type: "number", example: 1 },
                      name: { type: "string", example: "홍길동" },
                      email: { type: "string", example: "test@example.com" },
                      imgUrl: {
                        type: "string",
                        nullable: true,
                        example: "https://example.com/profile.jpg"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    #swagger.responses[400] = {
      description: "userId 누락"
    };

    #swagger.responses[404] = {
      description: "유저를 찾을 수 없음"
    };

    #swagger.responses[500] = {
      description: "서버 오류"
    };
  */

  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    res.status(StatusCodes.OK).success(user);
  } catch (err) {
    next(err);
  }
};