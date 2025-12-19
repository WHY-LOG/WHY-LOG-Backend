import { prisma } from "../config/db.config.js";

// 유저 등록
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

// 유저 정보 조회
export const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id: Number(id) },
  });
};

// 유저 정보 수정
export const updateUserById = async (id, data) => {
  return prisma.user.update({
    where: { id: Number(id) },
    data: {
      name: data.name,
      email: data.email,
      imgUrl: data.imgUrl,
    },
  });
};

// 이메일로 유저 정보 조회
export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

// 유저 정보 삭제
export const deleteUserById = async (id) => {
  const userId = Number(id);

  return prisma.$transaction(async (tx) => {
    // 1. RecordCategories
    await tx.recordCategories.deleteMany({
      where: {
        record: {
          userId,
        },
      },
    });

    // 2. Record
    await tx.record.deleteMany({
      where: { userId },
    });

    // 3. ReportCategories
    await tx.reportCategories.deleteMany({
      where: {
        report: {
          userId,
        },
      },
    });

    // 4. Report
    await tx.report.deleteMany({
      where: { userId },
    });

    // 5. User
    return tx.user.delete({
      where: { id: userId },
    });
  });
};