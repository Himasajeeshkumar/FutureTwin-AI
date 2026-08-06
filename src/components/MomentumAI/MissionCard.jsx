import { useState } from "react";
import { useResume } from "../../context/ResumeContext";

function MissionCard() {

    const {

        currentMission

    } = useResume();

    const [started, setStarted] = useState(false);

    const mission = {

        difficulty: "⭐⭐⭐☆☆",

        duration: "45 mins",

        reward: 25,

        progress: 0

    };

    return (

        <div className="dashboard-card">

            <h2>🎯 Today's Mission</h2>

            <h3>

                {currentMission}

            </h3>

            <p>

                <strong>Difficulty:</strong>

                {mission.difficulty}

            </p>

            <p>

                <strong>Estimated Time:</strong>

                {mission.duration}

            </p>

            <p>

                <strong>Reward:</strong>

                +{mission.reward} XP

            </p>

            <hr />

            <p>

                Status :

                {started
                    ? " 🟢 In Progress"
                    : " ⚪ Not Started"}

            </p>

            <div className="progress-bar">

                <div

                    className="progress-fill"

                    style={{

                        width: `${mission.progress}%`

                    }}

                ></div>

            </div>

            <button

                onClick={() => setStarted(true)}

            >

                🚀 Start Mission

            </button>

        </div>

    );

}

export default MissionCard;