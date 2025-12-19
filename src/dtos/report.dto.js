export const bodyToReport = (body) => {
    return {
        userId: body.userId,
        year: body.year
    };
}

export const bodyToUpdateReport = (body) => {
    return {
        userId: body.userId,
        reportId: body.reportId,
        content: body.content
    };
}

export const responseFromReport = (body) => {
    return {
        reportId: body.id,
        year: body.year,
        standard: body.standard,
        content: body.content,
        graphData: body.graphData
    };
}