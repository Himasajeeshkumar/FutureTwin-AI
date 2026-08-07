import { useState } from "react";
import { useResume } from "../../context/ResumeContext";

function MissionCard() {

    const {

    currentMission,

    xp,
    setXP,

    completedMissions,
    setCompletedMissions

} = useResume();

    const [started, setStarted] = useState(

    completedMissions.includes(currentMission)

);

    const mission = {

    difficulty: "⭐⭐⭐☆☆",

    duration: "45 mins",

    reward: 25,

    progress: started ? 100 : 0

};

const completeMission = () => {

    if (started) return;

    setStarted(true);

    setXP(xp + mission.reward);

    setCompletedMissions([

        ...completedMissions,

        currentMission

    ]);

};

    return (

        <div className="dashboard-card">

            <h2>🎯 Today's Mission</h2>

            <h3>

                {currentMission}

            </h3>

            <p className="coach-advice">
            Complete today's focused task to gain XP and improve your placement readiness.
            </p>

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
                    ? " 🟢 Completed"
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

                onClick={completeMission}

                disabled={started}

            >

                {started

                    ? "✅ Mission Completed"

                    : "🚀 Complete Mission"}

            </button>

        </div>

    );

}

export default MissionCard;