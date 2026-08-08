import {
    CheckCircle2,
    Circle,
    Clock3,
    Rocket,
    Target,
    Trophy
} from "lucide-react";

import { useState } from "react";
import { useResume } from "../../context/ResumeContext";

function MissionCard() {

    const {
        currentMission,
        completedMissions,
        setCompletedMissions
    } = useResume();


    const [started, setStarted] = useState(
        completedMissions.includes(currentMission)
    );


    const mission = {
        difficulty: "Intermediate",
        duration: "45 mins",
        reward: 25,
        progress: started ? 100 : 0
    };


    const completeMission = () => {

        if (started) return;

        setStarted(true);

        setCompletedMissions(prev =>
            prev.includes(currentMission)
                ? prev
                : [...prev, currentMission]
        );

    };


    return (
        <div className="dashboard-card">

            <h2 className="card-title-with-icon">

                <Target
                    size={22}
                    strokeWidth={2}
                />

                Today's Mission

            </h2>


            <h3>
                {currentMission}
            </h3>


            <p className="coach-advice">
                Complete today's focused task to improve
                your placement readiness.
            </p>


            <p className="mission-detail">

                <strong>
                    Difficulty:
                </strong>

                <span>
                    {mission.difficulty}
                </span>

            </p>


            <p className="mission-detail">

                <strong className="inline-icon-label">

                    <Clock3 size={16} />

                    Estimated Time:

                </strong>

                <span>
                    {mission.duration}
                </span>

            </p>


            <p className="mission-detail">

                <strong className="inline-icon-label">

                    <Trophy size={16} />

                    Reward:

                </strong>

                <span>
                    +{mission.reward} XP
                </span>

            </p>


            <hr />


            <div className="mission-status">

                <span>
                    Status
                </span>


                {started ? (

                    <span className="status-completed">

                        <CheckCircle2 size={17} />

                        Completed

                    </span>

                ) : (

                    <span className="status-pending">

                        <Circle size={17} />

                        Not Started

                    </span>

                )}

            </div>


            <div className="progress-bar">

                <div
                    className="progress-fill"
                    style={{
                        width: `${mission.progress}%`
                    }}
                />

            </div>


            <button
                type="button"
                onClick={completeMission}
                disabled={started}
                className="mission-button"
            >

                {started ? (

                    <>
                        <CheckCircle2 size={18} />
                        Mission Completed
                    </>

                ) : (

                    <>
                        <Rocket size={18} />
                        Complete Mission
                    </>

                )}

            </button>

        </div>
    );
}

export default MissionCard;