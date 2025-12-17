import { prisma } from "../config/db.config.js";

// 특정 유저가 가장 많이 등록한 카테고리 목록 조회
// Record -> RecordCategories -> Categories 경로로 집계
export const findMostUsedCategoriesByUserId = async (userId, limit = 5) => {
  const result = await prisma.recordCategories.groupBy({
    by: ["categoryId"],
    where: {
      record: {
        userId: userId,
      },
    },
    _count: {
      categoryId: true,
    },
    orderBy: {
      _count: {
        categoryId: "desc",
      },
    },
    take: limit,
  });

  // categoryId만 있으니 카테고리 이름도 가져오기
  const categoryIds = result.map((r) => r.categoryId);
  const categories = await prisma.categories.findMany({
    where: {
      id: { in: categoryIds },
    },
  });

  // 결과 합치기 (count + categoryName)
  return result.map((r) => {
    const category = categories.find((c) => c.id === r.categoryId);
    return {
      categoryId: r.categoryId,
      categoryName: category?.categoryName,
      count: r._count.categoryId,
    };
  });
};