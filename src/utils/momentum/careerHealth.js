export function calculateCareerHealth({

    analysis,
    jobMatch,
    skillGap,
    futureSimulation

}) {

    let score = 0;

    // Resume Score (30%)
    if (analysis?.resumeScore) {
        score += analysis.resumeScore * 0.30;
    }

    // ATS Score (20%)
    if (analysis?.atsScore) {
        score += analysis.atsScore * 0.20;
    }

    // Job Match (20%)
    if (jobMatch?.matchScore) {
        score += jobMatch.matchScore * 0.20;
    }

    // Skill Gap (15%)
    if (skillGap?.score) {
        score += skillGap.score * 0.15;
    }

    // Future Simulator (15%)
    if (futureSimulation?.successScore) {
        score += futureSimulation.successScore * 0.15;
    }

    return Math.round(score);

}