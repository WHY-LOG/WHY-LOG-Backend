import { getUserById, userCreate } from "../services/user.service.js";
import { bodyToUser } from "../dtos/user.dto.js";
import { StatusCodes } from "http-status-codes";

// 유저 등록 API
export const handleCreateUser = async (req, res, next) => {
  console.log("유저 등록을 요청했습니다");
  console.log("body:", req.body);

  try {
    const user = await userCreate(bodyToUser(req.body));
    res.status(StatusCodes.OK).success(user);
  } catch (err) {
    next(err);
  }
};

// 유저 정보 조회 API
export const handleGetUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    res.status(StatusCodes.OK).success(user);
  } catch (err) {
    next(err);
  }
};