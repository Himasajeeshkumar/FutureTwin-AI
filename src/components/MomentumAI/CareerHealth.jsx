import { useResume } from "../../context/ResumeContext";

function CareerHealth() {

    const {

    analysis,
    jobMatch,
    futureSimulation,
    skillGap,

    careerHealth,
    placementReadiness,

    level,
    xp,
    nextLevelXP

} = useResume();

    const score = careerHealth;
    
    const breakdown = [];

    if (analysis) {

        breakdown.push({
            title: "Resume Uploaded",
            points: 15
        });

    }

    if ((analysis?.resumeScore || 0) >= 80) {

        breakdown.push({
            title: "Strong Resume",
            points: 15
        });

    }

    if ((analysis?.atsScore || 0) >= 80) {

        breakdown.push({
            title: "ATS Optimized",
            points: 15
        });

    }

    if (jobMatch) {

        breakdown.push({
            title: "Job Match",
            points: 20
        });

    }
    if (skillGap) {

        breakdown.push({
            title: "Skill Gap",
            points: 15
        });

    }
    if (futureSimulation) {

        breakdown.push({
            title: "Future Simulator",
            points: 20
        });

    }
    let status = "";

    if (score < 40)
        status = "Needs Improvement";

    else if (score < 70)
        status = "Good Progress";

    else
        status = "Excellent";

    return (

        <div className="dashboard-card">

            <h2>

                ❤️ Career Health

            </h2>

            <h1 className="highlight-value">
                {score}%
            </h1>

            <div className="progress-bar">

                <div

                    className="progress-fill"

                    style={{

                        width:`${score}%`

                    }}

                >

                </div>

            </div>

            <p>

                <strong>

                    {status}

                </strong>

            </p>

            <p className="coach-advice">
                Your career health is calculated using your resume, ATS score, job matching, skills and learning consistency.
            </p>

            <div className="career-stats">

                <div className="career-stat">

                    <h4>🏆 Level</h4>

                    <p>{level}</p>

                </div>

                <div className="career-stat">

                    <h4>⭐ XP</h4>

                    <p>{xp} / {nextLevelXP}</p>

                </div>

            </div>

            <div className="placement-box">

                <h4>🎯 Placement Readiness</h4>

                <h2>{placementReadiness}%</h2>

            </div>

            <hr />

            <h3>

                Score Breakdown

            </h3>

            <ul>

                {

                    breakdown.map((item,index)=>(

                        <li key={index}>

                            ✅ {item.title}

                            (+{item.points})

                        </li>

                    ))

                }

            </ul>

        </div>

    );

}

export default CareerHealth;