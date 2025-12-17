import { StatusCodes } from "http-status-codes";
import { addUser, findUserById } from "../repositories/user.repository.js";
import { responseFromUser } from "../dtos/user.dto.js";

export const userCreate = async (data) => {
  if (!data.email || !data.name) {
    const err = new Error("name 또는 email이 누락되었습니다.");
    err.statusCode = StatusCodes.BAD_REQUEST;
    err.errorCode = "U001";
    err.data = data;
    throw err;
  }

  if (!data.email.includes("@")) {
    const err = new Error("이메일 형식이 올바르지 않습니다.");
    err.statusCode = StatusCodes.BAD_REQUEST;
    err.errorCode = "U002";
    err.data = data;
    throw err;
  }

  try {
    const userId = await addUser(data);

    const user = await findUserById(userId);

    if (!user) {
      const err = new Error("생성된 유저를 찾을 수 없습니다.");
      err.statusCode = 404;
      err.errorCode = "U003";
      throw err;
    }

    return responseFromUser(user);
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `유저 생성 중 서버 오류. (${err.message})`,
      null,
      "U999"
    );
  }
};