export function scoreResume(parsedResume) {

    let score = {
        education: 0,
        experience: 0,
        projects: 0,
        skills: 0,
        certifications: 0,
        formatting: 0,
        atsCompatibility: 0
    };

    // Education (10)
    if (parsedResume.education?.length > 0)
        score.education = 10;

    // Experience (20)
    score.experience = Math.min(
        parsedResume.experience.length * 10,
        20
    );

    // Projects (20)
    score.projects = Math.min(
        parsedResume.projects.length * 7,
        20
    );

    // Skills (20)
    score.skills = Math.min(
        parsedResume.skills.length,
        20
    );

    // Certifications (10)
    score.certifications = Math.min(
        parsedResume.certifications.length * 2,
        10
    );

    // Formatting (10)
    score.formatting = 8;

    // ATS Compatibility (10)
    score.atsCompatibility = 0;

    if (parsedResume.personal?.name) score.atsCompatibility += 2;
    if (parsedResume.personal?.email) score.atsCompatibility += 2;
    if (parsedResume.personal?.phone) score.atsCompatibility += 2;
    if (parsedResume.personal?.linkedin) score.atsCompatibility += 2;
    if (parsedResume.personal?.github) score.atsCompatibility += 2;

    const resumeScore =
        score.education +
        score.experience +
        score.projects +
        score.skills +
        score.certifications +
        score.formatting +
        score.atsCompatibility;

    return {

        resumeScore,

        atsScore: resumeScore,

        scoreBreakdown: score

    };

}