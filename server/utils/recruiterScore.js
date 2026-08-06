export function calculateRecruiterScore(parsedResume) {

    let score = 0;

    score += Math.min(
        25,
        (parsedResume.projects?.length || 0) * 8
    );

    score += Math.min(
        25,
        (parsedResume.experience?.length || 0) * 15
    );

    score += Math.min(
        20,
        (parsedResume.skills?.length || 0)
    );

    score += Math.min(
        10,
        (parsedResume.certifications?.length || 0) * 2
    );

    if (parsedResume.summary?.length > 60)
        score += 10;

    score += 10;

    return Math.min(score, 100);

}