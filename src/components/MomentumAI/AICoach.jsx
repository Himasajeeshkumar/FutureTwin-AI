import { useResume } from "../../context/ResumeContext";

function AICoach() {

    const {

        coachMessage,

        currentMission,

        placementReadiness

    } = useResume();

    return (

        <div className="dashboard-card">

            <h2>🤖 AI Coach</h2>

            <h3>

                Hello Future Professional 👋

            </h3>

            <hr />

            <h3>Today's Summary</h3>

            <ul className="coach-list">

                <li>📄 Resume Analysis</li>

                <li>💼 Job Match</li>

                <li>🎯 Momentum Tracking</li>

            </ul>

            <hr />

            <h3>AI Advice</h3>

            <p className="coach-advice">

                {coachMessage}

            </p>

            <hr />

            <h3>Next Mission</h3>

            <p>

                🎯 {currentMission}

            </p>

            <p className="coach-reward">

                Placement Readiness

                <strong>

                    {" "} {placementReadiness}%

                </strong>

            </p>

        </div>

    );

}

export default AICoach;