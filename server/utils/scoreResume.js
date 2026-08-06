export function scoreResume(parsedResume) {

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

   const skills = (parsedResume.skills || []).flatMap(skill => {

    if (typeof skill === "string") {
        return [skill];
    }

    return skill.items || [];

});

const normalizedSkills = skills.map(skill => skill.toLowerCase());

    // -----------------------------
    // Education (10)
    // -----------------------------
    if (parsedResume.education?.length > 0) {
        sectionScores.education = 10;
    }

    // -----------------------------
    // Skills (25)
    // -----------------------------

    const importantSkills = [
        "python",
        "java",
        "sql",
        "git",
        "github",
        "react",
        "node",
        "express",
        "docker",
        "aws"
    ];

    let skillScore = 0;

    importantSkills.forEach(skill => {

        if (normalizedSkills.some(s => s.includes(skill))) {
            skillScore += 2.5;
        }

    });

    sectionScores.skills = Math.min(25, Math.round(skillScore));

    // -----------------------------
    // Projects (15)
    // -----------------------------

    const projectCount = parsedResume.projects?.length || 0;

    if (projectCount >= 5)
        sectionScores.projects = 15;

    else if (projectCount >= 3)
        sectionScores.projects = 12;

    else if (projectCount >= 2)
        sectionScores.projects = 8;

    else if (projectCount >= 1)
        sectionScores.projects = 5;

    // -----------------------------
    // Experience (15)
    // -----------------------------

    const exp = parsedResume.experience?.length || 0;

    if (exp >= 2)
        sectionScores.experience = 15;

    else if (exp === 1)
        sectionScores.experience = 10;

    // -----------------------------
    // Certifications (10)
    // -----------------------------

    const certs = parsedResume.certifications?.length || 0;

    if (certs >= 5)
        sectionScores.certifications = 10;

    else if (certs >= 3)
        sectionScores.certifications = 8;

    else if (certs >= 1)
        sectionScores.certifications = 5;

    // -----------------------------
    // Summary (10)
    // -----------------------------

    if (
        parsedResume.summary &&
        parsedResume.summary.length >= 40
    ) {
        sectionScores.summary = 10;
    }

    // -----------------------------
    // Links (5)
    // -----------------------------

    let links = 0;

    if (parsedResume.personal?.linkedin)
        links++;

    if (parsedResume.personal?.github)
        links++;

    if (parsedResume.personal?.portfolio)
        links++;

    sectionScores.links = Math.min(5, links * 2);

    // -----------------------------
    // Resume Completeness (10)
    // -----------------------------

    let complete = 0;

    if (parsedResume.personal?.email)
        complete++;

    if (parsedResume.personal?.phone)
        complete++;

    if (parsedResume.education?.length)
        complete++;

    if (parsedResume.skills?.length)
        complete++;

    if (parsedResume.projects?.length)
        complete++;

    sectionScores.completeness = complete * 2;

    // -----------------------------
    // Final Score
    // -----------------------------

    Object.values(sectionScores).forEach(value => {
        score += value;
    });

    // -----------------------------
    // Smart deductions
    // -----------------------------

    if (!normalizedSkills.some(s => s.includes("docker")))
        score -= 2;

    if (!normalizedSkills.some(s => s.includes("aws")))
        score -= 2;

    if (!normalizedSkills.some(s => s.includes("kubernetes")))
        score -= 2;

    if (!normalizedSkills.some(s => s.includes("communication")))
        score -= 1;

    score = Math.max(0, Math.min(100, score));

    // ATS Score
// ATS Score
const atsScore = score;

// Resume Score (Human Evaluation)
let resumeScore = Math.round(

    atsScore * 0.45 +

    Math.min((parsedResume.projects?.length || 0) * 6, 18) +

    Math.min((parsedResume.experience?.length || 0) * 8, 16) +

    Math.min((parsedResume.certifications?.length || 0) * 2, 10) +

    Math.min(normalizedSkills.length, 12)

);

// Even an excellent resume shouldn't easily reach 100
resumeScore = Math.min(95, resumeScore);

// Recruiter Score
const recruiterScore = Math.round(
    (atsScore + resumeScore) / 2
);

// Interview Readiness
const interviewReadiness = Math.round(
    recruiterScore * 0.95
);

// Verdict
let verdict = "Needs Improvement";

if (recruiterScore >= 90) {
    verdict = "Excellent";
}
else if (recruiterScore >= 80) {
    verdict = "Strong Candidate";
}
else if (recruiterScore >= 70) {
    verdict = "Good";
}

return {
    atsScore,
    resumeScore,
    recruiterScore,
    interviewReadiness,
    verdict,
    sectionScores
};

}