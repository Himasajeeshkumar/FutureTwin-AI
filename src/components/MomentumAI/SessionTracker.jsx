import { useState, useEffect } from "react";
import { useResume } from "../../context/ResumeContext";

function SessionTracker() {

    const [seconds, setSeconds] = useState(0);

    const [running, setRunning] = useState(false);

    const {

    xp,
    setXP,

    studyMinutes,
    setStudyMinutes,

    currentMission,

    completedMissions,
    setCompletedMissions,

    weeklyXP,
    setWeeklyXP

} = useResume();

    useEffect(() => {

        let timer;

        if (running) {

            timer = setInterval(() => {

                setSeconds(prev => prev + 1);

                setStudyMinutes(prev => prev + (1 / 60));

            }, 1000);

        }

        return () => clearInterval(timer);

    }, [running]);

    const formatTime = () => {

        const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");

        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");

        const secs = String(seconds % 60).padStart(2, "0");

        return `${hrs}:${mins}:${secs}`;

    };

    const finishMission = () => {

        setRunning(false);

        const earnedXP = Math.floor(seconds / 60) * 5;

        // Add XP globally
        setXP(prev => prev + earnedXP);

        // Save completed mission
        setCompletedMissions(prev => [

            ...prev,

            currentMission

        ]);

        // Update today's XP (for the current weekday)
        const today = new Date().getDay();

        // Sunday = 0, Monday = 1...
        const index = today === 0 ? 6 : today - 1;

        setWeeklyXP(prev => {

            const updated = [...prev];

            updated[index] += earnedXP;

            return updated;

        });

        alert(`🎉 Mission Complete!\n\n+${earnedXP} XP Earned`);

    };

    return (

        <div className="dashboard-card">

            <h2>⏱ Session Tracker</h2>

            <h3>Today's Focus</h3>

            <p>

            🎯 {currentMission}

            </p>

            <div className="timer-display">

                {formatTime()}

            </div>

            <p>

                {running
                    ? "🟢 Focus Mode"
                    : "⚪ Not Running"}

            </p>

            <div className="timer-buttons">

                <button
                    onClick={() => setRunning(true)}
                >
                    ▶ Start
                </button>

                <button
                    onClick={() => setRunning(false)}
                >
                    ⏸ Pause
                </button>

                <button
                    onClick={finishMission}
                >
                    ✅ Finish
                </button>

            </div>

            <hr />

            <h3>

                XP Earned

            </h3>

            <h1
                style={{
                    color:"#8b5cf6"
                }}
            >
                +{xp} XP
            </h1>

        </div>

    );

}

export default SessionTracker;