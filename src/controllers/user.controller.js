import { deleteUser, getUserById, updateUser, userCreate } from "../services/user.service.js";
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
    };

    #swagger.responses[400] = {
      description: "잘못된 요청 (필수값 누락 / 이메일 형식 오류)",
      content: {
        "application/json": {
          examples: {
            missingField: {
              summary: "name 또는 email 누락",
              value: {
                resultType: "FAIL",
                error: {
                  errorCode: "U001",
                  reason: "name 또는 email이 누락되었습니다.",
                  data: null
                },
                success: null
              }
            },
            invalidEmail: {
              summary: "이메일 형식 오류",
              value: {
                resultType: "FAIL",
                error: {
                  errorCode: "U002",
                  reason: "이메일 형식이 올바르지 않습니다.",
                  data: null
                },
                success: null
              }
            }
          }
        }
      }
    };

    #swagger.responses[500] = {
      description: "서버 내부 오류",
      content: {
        "application/json": {
          example: {
            resultType: "FAIL",
            error: {
              errorCode: "U999",
              reason: "유저 생성 중 서버 오류",
              data: null
            },
            success: null
          }
        }
      }
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
      description: "유저 조회 성공",
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
    };

    #swagger.responses[400] = {
      description: "잘못된 요청 (userId 누락)",
      content: {
        "application/json": {
          example: {
            resultType: "FAIL",
            error: {
              errorCode: "U001",
              reason: "userId가 누락되었습니다.",
              data: null
            },
            success: null
          }
        }
      }
    };

    #swagger.responses[404] = {
      description: "유저를 찾을 수 없음",
      content: {
        "application/json": {
          example: {
            resultType: "FAIL",
            error: {
              errorCode: "U003",
              reason: "유저를 찾을 수 없습니다.",
              data: null
            },
            success: null
          }
        }
      }
    };

    #swagger.responses[500] = {
      description: "서버 내부 오류",
      content: {
        "application/json": {
          example: {
            resultType: "FAIL",
            error: {
              errorCode: "U999",
              reason: "유저 생성 중 서버 오류",
              data: null
            },
            success: null
          }
        }
      }
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

// 유저 정보 수정 API
export const handleUpdateUser = async (req, res, next) => {
  /*
    #swagger.summary = '유저 정보 수정 API';
    #swagger.description = 'userId를 기반으로 유저 정보를 수정합니다.';
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
      description: "유저 정보 수정 성공",
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
    };

    #swagger.responses[404] = {
      description: "유저를 찾을 수 없음",
      content: {
        "application/json": {
          example: {
            resultType: "FAIL",
            error: {
              errorCode: "U003",
              reason: "유저를 찾을 수 없습니다.",
              data: null
            },
            success: null
          }
        }
      }
    };

    #swagger.responses[409] = {
      description: "이메일 중복",
      content: {
        "application/json": {
          example: {
            resultType: "FAIL",
            error: {
              errorCode: "U004",
              reason: "이미 사용 중인 이메일입니다.",
              data: null
            },
            success: null
          }
        }
      }
    };

    #swagger.responses[500] = {
      description: "서버 내부 오류",
      content: {
        "application/json": {
          example: {
            resultType: "FAIL",
            error: {
              errorCode: "U999",
              reason: "유저 생성 중 서버 오류",
              data: null
            },
            success: null
          }
        }
      }
    };
  */

  try {
    const { userId } = req.params;
    const user = await updateUser(userId, bodyToUser(req.body));
    res.status(StatusCodes.OK).success(user);
  } catch (err) {
    next(err);
  }
};

// 유저 정보 삭제 API
export const handleDeleteUser = async (req, res, next) => {
  /*
    #swagger.summary = '유저 정보 삭제 API';
    #swagger.description = 'userId를 기반으로 유저 정보를 삭제합니다.';
    #swagger.tags = ['User'];

    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      schema: { type: 'integer' },
      example: 1
    };

    #swagger.responses[200] = {
      description: "유저 삭제 성공",
      content: {
        "application/json": {
          example: {
            resultType: "SUCCESS",
            error: null,
            success: {
              message: "유저 삭제 완료"
            }
          }
        }
      }
    };

    #swagger.responses[400] = {
      description: "userId 누락",
      content: {
        "application/json": {
          example: {
            resultType: "FAIL",
            error: {
              errorCode: "U001",
              reason: "userId가 누락되었습니다.",
              data: null
            },
            success: null
          }
        }
      }
    };

    #swagger.responses[404] = {
      description: "유저를 찾을 수 없음",
      content: {
        "application/json": {
          example: {
            resultType: "FAIL",
            error: {
              errorCode: "U003",
              reason: "유저를 찾을 수 없습니다.",
              data: null
            },
            success: null
          }
        }
      }
    };

    #swagger.responses[500] = {
      description: "서버 내부 오류",
      content: {
        "application/json": {
          example: {
            resultType: "FAIL",
            error: {
              errorCode: "U999",
              reason: "유저 생성 중 서버 오류",
              data: null
            },
            success: null
          }
        }
      }
    };
  */

  try {
    const { userId } = req.params;
    await deleteUser(userId);
    res.status(StatusCodes.OK).success({ message: "유저 삭제 완료" });
  } catch (err) {
    next(err);
  }
};