export function calculateATS(parsedResume) {

    let score = 0;

    const sectionScores = {
        education: 0,
        skills: 0,
        projects: 0,
        experience: 0,
        certifications: 0,
        summary: 0,
        links: 0,
        completeness: 0
    };

    const skills = (parsedResume.skills || []).map(skill =>
        skill.toLowerCase()
    );

    // Education (10)
    if (parsedResume.education?.length)
        sectionScores.education = 10;

    // Skills (20)
    sectionScores.skills = Math.min(
        20,
        skills.length
    );

    // Projects (15)
    sectionScores.projects = Math.min(
        15,
        (parsedResume.projects?.length || 0) * 5
    );

    // Experience (15)
    sectionScores.experience = Math.min(
        15,
        (parsedResume.experience?.length || 0) * 15
    );

    // Certifications (10)
    sectionScores.certifications = Math.min(
        10,
        (parsedResume.certifications?.length || 0) * 2
    );

    // Summary (10)
    if (parsedResume.summary?.length > 50)
        sectionScores.summary = 10;

    // Links (10)
    let links = 0;

    if (parsedResume.personal?.github) links += 3;
    if (parsedResume.personal?.linkedin) links += 3;
    if (parsedResume.personal?.portfolio) links += 4;

    sectionScores.links = links;

    // Completeness (10)
    let complete = 0;

    if (parsedResume.personal?.email) complete += 2;
    if (parsedResume.personal?.phone) complete += 2;
    if (parsedResume.skills?.length) complete += 2;
    if (parsedResume.projects?.length) complete += 2;
    if (parsedResume.experience?.length) complete += 2;

    sectionScores.completeness = complete;

    score = Object.values(sectionScores)
        .reduce((a, b) => a + b, 0);

    return {

        atsScore: Math.min(score, 100),

        sectionScores

    };

}