import { prisma } from "../config/db.config.js";

export const addReport = async (data) => {
    const report = await prisma.report.findFirst( {where: {
         userId: data.userId,
         year: data.year
     }});
    if (report) {
        return null;
    }
    const created = await prisma.report.create({
        data: {
            year: data.year,
            standard: data.standard,
            content: data.content,
            user: { connect: { id: data.userId } }
        }
    });
    
    if (data.graphData && data.graphData.length > 0) {
        await prisma.reportCategories.createMany({
          data: data.graphData.map(item => ({
            reportId: created.id,
            categoryId: item.categoryId,
            percent: item.percent,
          }))
        });
    }

    return created;
  };

// 특정 유저가 가장 많이 등록한 카테고리 목록 조회
export const findMostUsedCategoriesByUserIdAndYear = async (userId, year, limit = 5) => {

  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31T23:59:59`);

  const result = await prisma.recordCategories.groupBy({
    by: ["categoryId"],
    where: {
      record: {
        userId: userId,
        occurDate: {
            gte: startDate,
            lte: endDate,
          },
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

  //카테고리 이름 가져오기
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

export const findRecordContentsByUserIdAndYear = async (userId, year) => {
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31T23:59:59`);

  return await prisma.record.findMany({
    where: {
      userId: userId,
      occurDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      content: true,
    },
  });
}

export const existingReport = async (data) => {
  const report = await prisma.report.findFirst({
    where: {
      id: data.reportId,
      userId: data.userId,
    }
  });

  return report;
}

export const updateReport = async (data) => {
  const report = await prisma.report.update({
    where: {
      id: data.reportId,
    },
    data: {
      content: data.content
    },
    include: {
      reportCategories: {
        include: {
          categories: true
        }
      }
    }
  });
  return report;
}