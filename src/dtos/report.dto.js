export const bodyToReport = (body) => {
    return {
        userId: body.userId,
        year: body.year
    };
}

export const responseFromReport = (body) => {
    return {
        reportId: body.id,
        year: body.year,
        standard: body.standard,
        graphData: body.graphData
    };
}