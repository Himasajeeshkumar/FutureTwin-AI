import {
    Battery,
    Brain,
    Clock3,
    HeartPulse,
    ShieldCheck
} from "lucide-react";

import { useResume } from "../../context/ResumeContext";

function BurnoutStatus() {

    const {
        burnoutRisk,
        studyMinutes
    } = useResume();


    const energyLevel =
        burnoutRisk === "High"
            ? 35
            : burnoutRisk === "Medium"
                ? 65
                : 90;


    const focusLevel =
        studyMinutes > 240
            ? 40
            : studyMinutes > 150
                ? 70
                : 95;


    const recovery =
        burnoutRisk === "High"
            ? 35
            : burnoutRisk === "Medium"
                ? 65
                : 90;


    const riskClass =
        burnoutRisk?.toLowerCase() || "low";


    const recommendation =
        burnoutRisk === "High"
            ? "Take a break. You've been studying for a long time."
            : burnoutRisk === "Medium"
                ? "Keep going, but schedule a short break soon."
                : "Excellent pace. Maintain your consistency.";


    return (

        <div className="dashboard-card">

            <h2 className="card-title-with-icon">

                <HeartPulse
                    size={22}
                    strokeWidth={2}
                />

                Burnout Status

            </h2>


            <div className="burnout-detail">

                <strong>
                    Risk Level
                </strong>

                <span
                    className={`risk ${riskClass}`}
                >
                    {burnoutRisk}
                </span>

            </div>


            <div className="burnout-detail">

                <strong className="detail-label">

                    <Battery size={17} />

                    Energy Level

                </strong>

                <span className="highlight-value">
                    {energyLevel}%
                </span>

            </div>


            <div className="burnout-detail">

                <strong className="detail-label">

                    <Brain size={17} />

                    Focus Level

                </strong>

                <span className="highlight-value">
                    {focusLevel}%
                </span>

            </div>


            <div className="burnout-detail">

                <strong className="detail-label">

                    <Clock3 size={17} />

                    Study Time

                </strong>

                <span className="highlight-value">
                    {Math.round(studyMinutes)} mins
                </span>

            </div>


            <hr />


            <h3 className="card-title-with-icon">

                <ShieldCheck size={19} />

                AI Recommendation

            </h3>


            <p className="burnout-advice">
                {recommendation}
            </p>


            <h3>
                Recovery Score
            </h3>


            <p className="progress-text">
                {recovery}% Recovery
            </p>


            <div className="progress-bar">

                <div
                    className="progress-fill"
                    style={{
                        width: `${recovery}%`
                    }}
                />

            </div>

        </div>

    );
}

export default BurnoutStatus;