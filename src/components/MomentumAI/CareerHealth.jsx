import {
    CheckCircle2,
    HeartPulse,
    Star,
    Target,
    Trophy
} from "lucide-react";

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


    const score = Math.min(
        Math.max(careerHealth || 0, 0),
        100
    );


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


    let status;

    if (score < 40) {
        status = "Needs Improvement";
    } else if (score < 70) {
        status = "Good Progress";
    } else {
        status = "Excellent";
    }


    return (
        <div className="dashboard-card">

            <h2 className="card-title-with-icon">

                <HeartPulse
                    size={22}
                    strokeWidth={2}
                />

                Career Health

            </h2>


            <h1 className="highlight-value">
                {score}%
            </h1>


            <div className="progress-bar">

                <div
                    className="progress-fill"
                    style={{
                        width: `${score}%`
                    }}
                />

            </div>


            <p>
                <strong>
                    {status}
                </strong>
            </p>


            <p className="coach-advice">
                Your score combines resume quality,
                ATS performance, job matching,
                skills and learning consistency.
            </p>


            <div className="career-stats">

                <div className="career-stat">

                    <h4 className="stat-label">

                        <Trophy size={16} />

                        Level

                    </h4>

                    <p>
                        {level}
                    </p>

                </div>


                <div className="career-stat">

                    <h4 className="stat-label">

                        <Star size={16} />

                        XP

                    </h4>

                    <p>
                        {xp} / {nextLevelXP}
                    </p>

                </div>

            </div>


            <div className="placement-box">

                <h4 className="stat-label">

                    <Target size={17} />

                    Placement Readiness

                </h4>

                <h2>
                    {placementReadiness}%
                </h2>

            </div>


            <hr />


            <h3>
                Score Breakdown
            </h3>


            {breakdown.length === 0 ? (

                <p className="coach-advice">
                    Complete your resume analysis
                    and career activities to build
                    your career health score.
                </p>

            ) : (

                <ul className="career-breakdown">

                    {breakdown.map((item, index) => (

                        <li key={index}>

                            <CheckCircle2 size={17} />

                            <span>
                                {item.title}{" "}
                                <strong>
                                    (+{item.points})
                                </strong>
                            </span>

                        </li>

                    ))}

                </ul>

            )}

        </div>
    );
}

export default CareerHealth;