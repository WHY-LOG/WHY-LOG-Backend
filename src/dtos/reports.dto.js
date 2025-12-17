export const bodyToReports = (body) => {
    return {
        userId: body.userId,
        year: body.year
    };
}

export const responseFromReports = (body) => {
    return {
        reportId: body.id,
        year: body.year,
        standard: body.standard,
        graphData: body.graphData
    };
}