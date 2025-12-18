import { StatusCodes } from "http-status-codes";
import { addUser, deleteUserById, findUserByEmail, findUserById, updateUserById } from "../repositories/user.repository.js";
import { responseFromUser } from "../dtos/user.dto.js";

// 유저 등록 API
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

// 유저 정보 조회 API
export const getUserById = async (userId) => {
  if (!userId) {
    const err = new Error("userId가 누락되었습니다.");
    err.statusCode = StatusCodes.BAD_REQUEST;
    err.errorCode = "U001";
    throw err;
  }

  const user = await findUserById(userId);

  if (!user) {
    const err = new Error("유저를 찾을 수 없습니다.");
    err.statusCode = StatusCodes.NOT_FOUND;
    err.errorCode = "U003";
    throw err;
  }

  return responseFromUser(user);
};

// 유저 정보 수정 API
export const updateUser = async (userId, data) => {
  if (!userId) {
    const err = new Error("userId가 누락되었습니다.");
    err.statusCode = StatusCodes.BAD_REQUEST;
    err.errorCode = "U001";
    throw err;
  }

  const user = await findUserById(userId);
  if (!user) {
    const err = new Error("유저를 찾을 수 없습니다.");
    err.statusCode = StatusCodes.NOT_FOUND;
    err.errorCode = "U003";
    throw err;
  }

  if (data.email) {
    const existing = await findUserByEmail(data.email);
    if (existing && existing.id !== Number(userId)) {
      const err = new Error("이미 사용 중인 이메일입니다.");
      err.statusCode = StatusCodes.CONFLICT;
      err.errorCode = "U004";
      throw err;
    }
  }

  const isChanged =
    (data.name && data.name !== user.name) ||
    (data.email && data.email !== user.email) ||
    (data.imgUrl && data.imgUrl !== user.imgUrl);

  if (!isChanged) {
    const err = new Error("변경된 정보가 없습니다.");
    err.statusCode = StatusCodes.BAD_REQUEST;
    err.errorCode = "U005";
    throw err;
  }

  const updated = await updateUserById(userId, data);
  return responseFromUser(updated);
};

// 유저 정보 삭제 API
export const deleteUser = async (userId) => {
  if (!userId) {
    const err = new Error("userId가 누락되었습니다.");
    err.statusCode = StatusCodes.BAD_REQUEST;
    err.errorCode = "U001";
    throw err;
  }

  const user = await findUserById(userId);
  if (!user) {
    const err = new Error("유저를 찾을 수 없습니다.");
    err.statusCode = StatusCodes.NOT_FOUND;
    err.errorCode = "U003";
    throw err;
  }

  await deleteUserById(userId);
};