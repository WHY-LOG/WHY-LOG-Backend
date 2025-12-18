export const createReportPrompts = (records) => {
    const contents = records.map(r => r.content).join("\n---\n");

    return `
다음은 한 사용자가 작성한 판단 기록들입니다:

${contents}

이 기록들을 분석하여, 이 사용자의 판단 기준이나 성향을 한 문장으로 요약해주세요.
문장의 끝은 명사형으로 끝나지 않고, "~입니다." 또는 "~합니다." 처럼 평서문으로 끝나야 합니다.
예시: "당신은 타인의 시선보다 자신의 성장을 우선시하는 경향이 있습니다."
`;
}