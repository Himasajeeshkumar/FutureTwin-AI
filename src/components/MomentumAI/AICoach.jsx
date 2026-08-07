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
            Good to see you! 👋
            </h3>

            <hr />

            <h3>Today's Progress</h3>

            <ul className="coach-list">

                <li>

                    {placementReadiness >= 25 ? "✅" : "⬜"}

                    {" "}Resume Analysis

                </li>

                <li>

                    {placementReadiness >= 50 ? "✅" : "⬜"}

                    {" "}Job Match

                </li>

                <li>

                    {placementReadiness >= 75 ? "✅" : "⬜"}

                    {" "}Skill Gap

                </li>

                <li>

                    {placementReadiness >= 100 ? "✅" : "⬜"}

                    {" "}Future Simulator

                </li>

            </ul>

            <hr />

            <h3>Today's Recommendation</h3>

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