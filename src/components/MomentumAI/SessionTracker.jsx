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
    const [finishing, setFinishing] = useState(false);

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


    /*
    =====================================================
    MISSION TITLE → BACKEND MISSION KEY
    =====================================================
    */

    const missionKeyMap = {

        "Upload Resume":
            "upload_resume",

        "Improve Resume":
            "improve_resume",

        "Analyze Job Match":
            "analyze_job_match",

        "Complete Skill Gap Analysis":
            "complete_skill_gap",

        "Run Future Simulator":
            "run_future_simulator",

        "AI Mentor Session":
            "ai_mentor",

        "Solve 2 DSA Problems":
            "dsa_problems",

        "Continue DSA and interview preparation":
            "continue_dsa"

    };


    /*
    =====================================================
    TIMER
    =====================================================
    */

    useEffect(() => {

        if (!running) {
            return;
        }


        const timer =
            setInterval(() => {

                setSeconds(
                    previous =>
                        previous + 1
                );

            }, 1000);


        return () => {

            clearInterval(timer);

        };

    }, [running]);


    /*
    =====================================================
    FORMAT TIME
    =====================================================
    */

    const formatTime = () => {

        const hours =
            String(
                Math.floor(
                    seconds / 3600
                )
            ).padStart(2, "0");


        const minutes =
            String(
                Math.floor(
                    (seconds % 3600) / 60
                )
            ).padStart(2, "0");


        const secs =
            String(
                seconds % 60
            ).padStart(2, "0");


        return `${hours}:${minutes}:${secs}`;

    };


    /*
    =====================================================
    START
    =====================================================
    */

    const startTimer = () => {

        setRunning(true);

    };


    /*
    =====================================================
    PAUSE
    =====================================================
    */

    const pauseTimer = () => {

        setRunning(false);

    };


    /*
    =====================================================
    FINISH MISSION
    =====================================================
    */

    const finishMission = async () => {

        if (finishing) {
            return;
        }


        const missionKey =
            missionKeyMap[currentMission];


        /*
        -----------------------------------------------
        Check mission exists
        -----------------------------------------------
        */

        if (!missionKey) {

            alert(
                "This mission is not configured yet."
            );

            return;

        }


        /*
        -----------------------------------------------
        Check duplicate completion
        -----------------------------------------------
        */

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


        const actualMinutes =
            Math.floor(
                seconds / 60
            );


        /*
        -----------------------------------------------
        Backend will decide the required time.

        For example:

        DSA mission:
        45 minutes = 25 XP

        We don't calculate XP here.
        -----------------------------------------------
        */

        setFinishing(true);
        setRunning(false);


        try {

            const token =
                localStorage.getItem(
                    "token"
                );


            if (!token) {

                alert(
                    "Please login again."
                );

                return;

            }


            const response =
                await fetch(
                    `${import.meta.env.VITE_API_URL}/momentum/mission`,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`

                        },

                        body: JSON.stringify({

                            missionKey,

                            actualMinutes

                        })

                    }
                );


            const data =
                await response.json();


            /*
            -----------------------------------------------
            Backend rejected the mission.

            Example:
            User studied 10 minutes
            Required 45 minutes
            -----------------------------------------------
            */

            if (!response.ok) {

                alert(
                    data.error ||
                    "Mission could not be completed."
                );

                return;

            }


            /*
            -----------------------------------------------
            IMPORTANT:

            XP comes ONLY from backend.

            No:
                minutes × 5

            No:
                local XP calculation
            -----------------------------------------------
            */

            if (data.rewarded) {

                /*
                Update lifetime XP
                */

                setXP(
                    data.totalXP
                );


                /*
                Update today's XP
                */

                setTodayXP(
                    data.todayXP
                );


                /*
                Update weekly XP
                */

                if (
                    Array.isArray(
                        data.weeklyXP
                    )
                ) {

                    setWeeklyXP(
                        data.weeklyXP
                    );

                }


                /*
                Mark mission completed
                */

                setCompletedMissions(
                    previous => {

                        if (
                            previous.includes(
                                currentMission
                            )
                        ) {

                            return previous;

                        }


                        return [
                            ...previous,
                            currentMission
                        ];

                    }
                );


                /*
                -----------------------------------------
                Success notification
                -----------------------------------------
                */

                const extraMessage =
                    data.extraXP > 0
                        ? `\nExtra work bonus: +${data.extraXP} XP`
                        : "";


                alert(
                    `Mission Complete!\n\n` +
                    `+${data.xpEarned} XP Earned` +
                    extraMessage
                );

            }


            /*
            -----------------------------------------------
            Mission already completed
            -----------------------------------------------
            */

            else {

                alert(
                    data.message ||
                    "Mission already completed."
                );

            }


            /*
            Reset timer
            */

            setSeconds(0);

        }

        catch (error) {

            console.error(
                "Mission completion error:",
                error
            );


            alert(
                "Unable to connect to the Momentum server."
            );

        }

        finally {

            setFinishing(false);

        }

    };


    /*
    =====================================================
    RETURN UI
    =====================================================
    */

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
                    strokeWidth={2}
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
                    disabled={
                        running ||
                        finishing
                    }
                >

                    <Play
                        size={17}
                        strokeWidth={2}
                    />

                    Start

                </button>


                <button
                    type="button"
                    onClick={pauseTimer}
                    disabled={
                        !running ||
                        finishing
                    }
                >

                    <Pause
                        size={17}
                        strokeWidth={2}
                    />

                    Pause

                </button>


                <button
                    type="button"
                    onClick={finishMission}
                    disabled={finishing}
                >

                    <CheckCircle2
                        size={17}
                        strokeWidth={2}
                    />

                    {finishing
                        ? "Finishing..."
                        : "Finish"
                    }

                </button>

            </div>


            <hr />


            <h3 className="card-title-with-icon">

                <Trophy
                    size={19}
                    strokeWidth={2}
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