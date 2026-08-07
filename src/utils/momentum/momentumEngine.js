export function calculateMomentum(data) {

    const {

        analysis,
        jobMatch,
        skillGap,
        futureSimulation,
        studyMinutes,
        completedMissions,
        xp

    } = data;

    let careerHealth = 0;

    // Resume Uploaded
    if (analysis)
        careerHealth += 15;

    // Resume Score
    if ((analysis?.resumeScore || 0) >= 80)
        careerHealth += 15;

    // ATS Score
    if ((analysis?.atsScore || 0) >= 80)
        careerHealth += 15;

    // Job Match
    if (jobMatch)
        careerHealth += 20;

    // Skill Gap
    if (skillGap)
        careerHealth += 15;

    // Future Simulator
    if (futureSimulation)
        careerHealth += 20;

    if (careerHealth > 100)
        careerHealth = 100;

    //---------------------------------------
    // XP & Level
    //---------------------------------------

    let level = 1;
let nextLevelXP = 100;

if (xp >= 800) {

    level = 5;
    nextLevelXP = 1200;

} else if (xp >= 500) {

    level = 4;
    nextLevelXP = 800;

} else if (xp >= 250) {

    level = 3;
    nextLevelXP = 500;

} else if (xp >= 100) {

    level = 2;
    nextLevelXP = 250;

}

    //---------------------------------------
    // Placement Readiness
    //---------------------------------------

    const placementReadiness = Math.min(

        100,

        Math.round(

            careerHealth * 0.7 +

            Math.min(xp,100) * 0.15 +

            ((analysis?.atsScore || 0) * 0.15)

        )

    );

    //---------------------------------------
    // Burnout
    //---------------------------------------

    let burnoutRisk = "Low";

    if(studyMinutes>240){

        burnoutRisk="High";

    }

    else if(studyMinutes>150){

        burnoutRisk="Medium";

    }

    //---------------------------------------
    // Today's Mission
    //---------------------------------------

    let mission="Upload Resume";

    if(analysis){

        mission="Improve Resume";

    }

    if((analysis?.atsScore||0)>=80){

        mission="Analyze Job Match";

    }

    if(jobMatch){

        mission="Complete Skill Gap Analysis";

    }

    if(skillGap){

        mission="Run Future Simulator";

    }

    if(futureSimulation){

        mission="Solve 2 DSA Problems";

    }

    //---------------------------------------
    // AI Coach
    //---------------------------------------

    let coachMessage = "";

    if (!analysis) {

        coachMessage =
            "Upload your resume to begin your AI career journey.";

    } else if ((analysis?.atsScore || 0) < 80) {

        coachMessage =
            "Improve your ATS score to increase your chances of getting shortlisted.";

    } else if (!jobMatch) {

        coachMessage =
            "Run Job Match Analysis to see how well your resume matches your dream job.";

    } else if (!skillGap) {

        coachMessage =
            "Complete Skill Gap Analysis to discover the technologies you should learn next.";

    } else if (!futureSimulation) {

        coachMessage =
            "Run Future Simulator to visualize your career growth and salary potential.";

    } else if (careerHealth < 70) {

        coachMessage =
            "Keep improving your profile. Every completed task increases your placement readiness.";

    } else {

        coachMessage =
            "Excellent progress! Stay consistent with DSA, projects, and interview preparation.";
    }

    //---------------------------------------
// Achievements
//---------------------------------------

const achievements = [];

if (analysis)

    achievements.push("🥉 First Resume");

if ((analysis?.atsScore || 0) >= 80)

    achievements.push("🥈 ATS Expert");

if (jobMatch)

    achievements.push("💼 Job Ready");

if (skillGap)

    achievements.push("🧠 Skill Master");

if (futureSimulation)

    achievements.push("🚀 Future Planner");

if (xp >= 500)

    achievements.push("🏆 Consistency Master");

    //---------------------------------------
// Overall Progress
//---------------------------------------

const completedPercent = Math.round(

    (

        (analysis ? 1 : 0) +

        (jobMatch ? 1 : 0) +

        (skillGap ? 1 : 0) +

        (futureSimulation ? 1 : 0)

    ) / 4 * 100

);

//---------------------------------------
// Today's XP
//---------------------------------------

const todayXP = Math.min(

    xp,

    100

);

    //---------------------------------------

    return {

    careerHealth,

    placementReadiness,

    burnoutRisk,

    currentMission: mission,

    coachMessage,

    level,

    nextLevelXP,

    achievements,

    completedPercent,

    todayXP

};

}