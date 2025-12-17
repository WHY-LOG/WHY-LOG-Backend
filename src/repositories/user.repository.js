import { prisma } from "../config/db.config.js";

// 유저 등록 API
export const addUser = async (data) => {
  try {
    return await prisma.$transaction(async (tx) => {
      // 이메일 중복 검사
      const existingUser = await tx.user.findUnique({
        where: { email: data.email },
      });
      if (existingUser) {
        // 기존 유저 정보 업데이트
        await tx.user.update({
          where: { id: existingUser.id },
          data: {
            name: data.name ?? existingUser.name,
            email: data.email ?? existingUser.email,
            imgUrl: data.imgUrl ?? existingUser.imgUrl
          },
        });

        return existingUser.id; 
      }

      // 유저 생성
      const createdUser = await tx.user.create({
        data: {
          email: data.email,
          name: data.name,
          imgUrl: data.imgUrl,
        },
        select: { id: true },
      });

      return createdUser.id;
    });
  } catch (err) {
    throw err; 
  }
};

// 유저 정보 조회 API
export const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id: Number(id) },
  });
};