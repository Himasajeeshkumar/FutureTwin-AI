import {
    CheckCircle2,
    Clock3,
    Pause,
    Play,
    Target,
    Trophy
} from "lucide-react";

import { useEffect, useState } from "react";

import { useResume } from "../../context/ResumeContext";

function SessionTracker() {

    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);

    const {
        xp,
        setXP,

        setTodayXP,

        studyMinutes,
        setStudyMinutes,

        currentMission,

        completedMissions,
        setCompletedMissions,

        setWeeklyXP
    } = useResume();


    useEffect(() => {

        if (!running) {
            return;
        }

        const timer = setInterval(() => {

            setSeconds(prev => prev + 1);

            setStudyMinutes(
                prev => prev + (1 / 60)
            );

        }, 1000);

        return () => {
            clearInterval(timer);
        };

    }, [running, setStudyMinutes]);


    const formatTime = () => {

        const hours =
            String(
                Math.floor(seconds / 3600)
            ).padStart(2, "0");

        const minutes =
            String(
                Math.floor(
                    (seconds % 3600) / 60
                )
            ).padStart(2, "0");

        const secs =
            String(seconds % 60)
                .padStart(2, "0");

        return `${hours}:${minutes}:${secs}`;
    };


    const startTimer = () => {
        setRunning(true);
    };


    const pauseTimer = () => {
        setRunning(false);
    };


    const finishMission = () => {

        if (seconds < 60) {

            alert(
                "Study for at least 1 minute before finishing."
            );

            return;
        }


        if (
            completedMissions.includes(
                currentMission
            )
        ) {

            alert(
                "This mission is already completed."
            );

            setRunning(false);
            setSeconds(0);

            return;
        }


        setRunning(false);


        const earnedXP =
            Math.floor(seconds / 60) * 5;


        if (earnedXP <= 0) {
            return;
        }


        // Add lifetime XP
        setXP(prev => prev + earnedXP);


        // Add today's XP
        setTodayXP(prev => prev + earnedXP);


        // Mark mission as completed
        setCompletedMissions(prev =>
            prev.includes(currentMission)
                ? prev
                : [...prev, currentMission]
        );


        // Get current weekday
        // Monday = 0 ... Sunday = 6
        const today =
            new Date().getDay();

        const index =
            today === 0
                ? 6
                : today - 1;


        // Update weekly XP
        setWeeklyXP(prev => {

            const updated =
                Array.isArray(prev)
                    ? [...prev]
                    : [0, 0, 0, 0, 0, 0, 0];


            while (updated.length < 7) {
                updated.push(0);
            }


            updated[index] =
                (Number(updated[index]) || 0)
                + earnedXP;


            return updated;
        });


        alert(
            `Mission Complete!\n\n+${earnedXP} XP Earned`
        );


        setSeconds(0);
    };


    return (

        <div className="dashboard-card">

            <h2 className="card-title-with-icon">

                <Clock3
                    size={22}
                    strokeWidth={2}
                />

                Session Tracker

            </h2>


            <h3>
                Today's Focus
            </h3>


            <p className="session-mission">

                <Target
                    size={17}
                />

                <span>
                    {currentMission}
                </span>

            </p>


            <div className="timer-display">
                {formatTime()}
            </div>


            <div
                className={
                    running
                        ? "session-status active"
                        : "session-status"
                }
            >

                {running ? (

                    <>

                        <span
                            className="status-dot active-dot"
                        />

                        Focus Mode

                    </>

                ) : (

                    <>

                        <span
                            className="status-dot"
                        />

                        Ready to Start

                    </>

                )}

            </div>


            <div className="timer-buttons">

                <button
                    type="button"
                    onClick={startTimer}
                    disabled={running}
                >

                    <Play size={17} />

                    Start

                </button>


                <button
                    type="button"
                    onClick={pauseTimer}
                    disabled={!running}
                >

                    <Pause size={17} />

                    Pause

                </button>


                <button
                    type="button"
                    onClick={finishMission}
                >

                    <CheckCircle2 size={17} />

                    Finish

                </button>

            </div>


            <hr />


            <h3 className="card-title-with-icon">

                <Trophy
                    size={19}
                />

                XP Earned

            </h3>


            <h1 className="highlight-value">
                {xp} XP
            </h1>

        </div>

    );
}

export default SessionTracker;