import { useResume } from "../../context/ResumeContext";

function BurnoutStatus() {

    const {

        burnoutRisk,

        studyMinutes

    } = useResume();

    return (

        <div className="dashboard-card">

            <h2>😴 Burnout Status</h2>

            <p>

                <strong>Risk Level:</strong>{" "}

                <span className={`risk ${burnoutRisk.toLowerCase()}`}>

                    {burnoutRisk}

                </span>

            </p>

            <p>

                <strong>⚡ Energy Level:</strong>

                <span className="highlight-value">

                    85%

                </span>

            </p>

            <p>

                <strong>🎯 Focus Level:</strong>

                <span className="highlight-value">

                    91%

                </span>

            </p>

            <p>

                <strong>⏱ Study Time:</strong>

                <span className="highlight-value">

                    {studyMinutes} mins

                </span>

            </p>

            <hr />

            <h3>🤖 AI Recommendation</h3>

            <p className="burnout-advice">

                {burnoutRisk === "High"
                    ? "Take a break. You've been studying for a long time."
                    : burnoutRisk === "Medium"
                    ? "Keep going, but schedule a short break soon."
                    : "Excellent pace! Maintain your consistency."}

            </p>

            <h3>Recovery Score</h3>

            <div className="progress-bar">

                <div

                    className="progress-fill"

                    style={{

                        width:

                            burnoutRisk === "High"
                                ? "35%"
                                : burnoutRisk === "Medium"
                                ? "65%"
                                : "90%"

                    }}

                ></div>

            </div>

        </div>

    );

}

export default BurnoutStatus;