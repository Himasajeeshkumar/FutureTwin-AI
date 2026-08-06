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
    // Placement Readiness
    //---------------------------------------

    const placementReadiness = Math.round(

        careerHealth * 0.8 +

        Math.min(xp,100) * 0.2

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

    let coachMessage="";

    if(careerHealth<40){

        coachMessage="Start by uploading your resume and analyzing it.";

    }

    else if(careerHealth<70){

        coachMessage="You're improving well. Complete today's mission to boost your placement readiness.";

    }

    else{

        coachMessage="Excellent progress! Focus on DSA practice and maintain your consistency.";

    }

    //---------------------------------------

    return{

        careerHealth,

        placementReadiness,

        burnoutRisk,

        currentMission:mission,

        coachMessage

    };

}