import { useResume } from "../../context/ResumeContext";

function BurnoutStatus() {

    const {

        burnoutRisk,

        studyMinutes

    } = useResume();

    const recovery =

    burnoutRisk === "High"

        ? 35

        : burnoutRisk === "Medium"

        ? 65

        : 90;

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

                    {
                        burnoutRisk === "High"
                            ? "35%"
                            : burnoutRisk === "Medium"
                            ? "65%"
                            : "90%"
                    }

                </span>

            </p>

            <p>

                <strong>🎯 Focus Level:</strong>

                <span className="highlight-value">

                    {

                    studyMinutes > 240

                    ? "40%"

                    : studyMinutes > 150

                    ? "70%"

                    : "95%"

                    }

                </span>

            </p>

            <p>

                <strong>⏱ Study Time:</strong>

                <span className="highlight-value">

                    {Math.round(studyMinutes)} mins

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

            <p className="progress-text">
                {recovery}% Recovery
            </p>

            <div className="progress-bar">

                <div

                    className="progress-fill"

                    style={{

                        width: `${recovery}%`

                    }}

                ></div>

            </div>


        </div>

    );

}

export default BurnoutStatus;