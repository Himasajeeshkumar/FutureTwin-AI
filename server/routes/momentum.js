import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

/*
=========================================================
MOMENTUM CONFIGURATION
=========================================================
*/

const ACTIVITY_XP = 5;

// Extra study reward:
// Every 15 minutes AFTER the assigned mission time = +5 XP.
// Maximum extra XP per mission = 20 XP.
const EXTRA_MINUTES_PER_XP = 15;
const EXTRA_XP_AMOUNT = 5;
const MAX_EXTRA_XP = 20;

/*
=========================================================
MISSION CONFIGURATION
=========================================================
Keep the reward on the backend.
Do NOT trust assignedXP sent from the frontend.
=========================================================
*/

const MISSIONS = {
    upload_resume: {
        title: "Upload Resume",
        assignedMinutes: 30,
        assignedXP: 25
    },

    improve_resume: {
        title: "Improve Resume",
        assignedMinutes: 30,
        assignedXP: 25
    },

    analyze_job_match: {
        title: "Analyze Job Match",
        assignedMinutes: 30,
        assignedXP: 25
    },

    complete_skill_gap: {
        title: "Complete Skill Gap Analysis",
        assignedMinutes: 30,
        assignedXP: 25
    },

    run_future_simulator: {
        title: "Run Future Simulator",
        assignedMinutes: 30,
        assignedXP: 25
    },

    ai_mentor: {
        title: "AI Mentor Session",
        assignedMinutes: 30,
        assignedXP: 25
    },

    dsa_problems: {
        title: "Solve 2 DSA Problems",
        assignedMinutes: 45,
        assignedXP: 25
    },

    continue_dsa: {
        title: "Continue DSA and interview preparation",
        assignedMinutes: 45,
        assignedXP: 25
    }
};


/*
=========================================================
DATE HELPERS
=========================================================
*/

function getTodayKey() {

    return new Date()
        .toISOString()
        .split("T")[0];

}


function getWeekKey() {

    const date = new Date();

    const day =
        date.getDay() === 0
            ? 6
            : date.getDay() - 1;

    date.setDate(
        date.getDate() - day
    );

    return date
        .toISOString()
        .split("T")[0];

}


function getTodayIndex() {

    const day = new Date().getDay();

    return day === 0
        ? 6
        : day - 1;

}


/*
=========================================================
DEFAULT MOMENTUM
=========================================================
*/

function createDefaultMomentum() {

    return {

        xp: 0,

        todayXP: 0,

        todayXPDate:
            getTodayKey(),

        weeklyXP: [
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ],

        weekKey:
            getWeekKey(),

        completedActivities: [],

        completedMissions: [],

        achievements: [],

        streak: 0,

        lastActivityDate: "",

        studyMinutes: 0
    };

}


/*
=========================================================
ENSURE MOMENTUM
=========================================================
*/

function ensureMomentum(user) {

    if (!user.momentum) {

        user.momentum =
            createDefaultMomentum();

    }

    if (
        !Array.isArray(
            user.momentum.weeklyXP
        )
    ) {

        user.momentum.weeklyXP = [
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ];

    }

    while (
        user.momentum.weeklyXP.length < 7
    ) {

        user.momentum.weeklyXP.push(0);

    }

    if (
        !Array.isArray(
            user.momentum.completedActivities
        )
    ) {

        user.momentum.completedActivities = [];

    }

    if (
        !Array.isArray(
            user.momentum.completedMissions
        )
    ) {

        user.momentum.completedMissions = [];

    }

    if (
        !Array.isArray(
            user.momentum.achievements
        )
    ) {

        user.momentum.achievements = [];

    }

    if (
        typeof user.momentum.xp !== "number"
    ) {

        user.momentum.xp = 0;

    }

    if (
        typeof user.momentum.todayXP !== "number"
    ) {

        user.momentum.todayXP = 0;

    }

    if (
        typeof user.momentum.studyMinutes !== "number"
    ) {

        user.momentum.studyMinutes = 0;

    }

}


/*
=========================================================
RESET DAILY / WEEKLY VALUES
=========================================================
*/

function resetPeriods(user) {

    const today =
        getTodayKey();

    const week =
        getWeekKey();


    if (
        user.momentum.todayXPDate !==
        today
    ) {

        user.momentum.todayXP = 0;

        user.momentum.todayXPDate =
            today;

    }


    if (
        user.momentum.weekKey !==
        week
    ) {

        user.momentum.weeklyXP = [
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ];

        user.momentum.weekKey =
            week;

    }

}


/*
=========================================================
STREAK
=========================================================
*/

function updateStreak(user) {

    const today =
        getTodayKey();

    const lastDate =
        user.momentum.lastActivityDate;


    if (!lastDate) {

        user.momentum.streak = 1;

    }

    else if (
        lastDate === today
    ) {

        // Already active today.
        // Do not increase streak.

    }

    else {

        const previous =
            new Date(lastDate);

        const current =
            new Date(today);

        const difference =
            Math.round(
                (
                    current -
                    previous
                ) /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        if (
            difference === 1
        ) {

            user.momentum.streak += 1;

        }

        else {

            user.momentum.streak = 1;

        }

    }


    user.momentum.lastActivityDate =
        today;

}


/*
=========================================================
ADD XP
=========================================================
*/

function addXP(
    user,
    amount
) {

    const xp =
        Math.max(
            0,
            Number(amount) || 0
        );

    if (xp <= 0) {

        return;

    }


    const todayIndex =
        getTodayIndex();


    user.momentum.xp += xp;

    user.momentum.todayXP += xp;


    if (
        !Array.isArray(
            user.momentum.weeklyXP
        )
    ) {

        user.momentum.weeklyXP = [
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ];

    }


    while (
        user.momentum.weeklyXP.length < 7
    ) {

        user.momentum.weeklyXP.push(0);

    }


    user.momentum.weeklyXP[
        todayIndex
    ] += xp;

}


/*
=========================================================
GET MOMENTUM
=========================================================
*/

router.get(
    "/",
    verifyToken,
    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {

                return res
                    .status(404)
                    .json({
                        error:
                            "User not found."
                    });

            }


            ensureMomentum(user);

            resetPeriods(user);

            await user.save();


            res.json({

                success: true,

                momentum:
                    user.momentum

            });

        }

        catch (error) {

            console.error(
                "Momentum GET error:",
                error
            );

            res
                .status(500)
                .json({
                    error:
                        "Unable to load Momentum data."
                });

        }

    }
);


/*
=========================================================
REWARD ONE-TIME ACTIVITY
=========================================================

Examples:

login
resume-analysis
job-match
skill-gap
future-simulator
ai-mentor
=========================================================
*/

router.post(
    "/reward",
    verifyToken,
    async (req, res) => {

        try {

            const {
                activityKey,
                activityType = "activity",
                metadata = {}
            } = req.body;


            if (!activityKey) {

                return res
                    .status(400)
                    .json({
                        error:
                            "activityKey is required."
                    });

            }


            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {

                return res
                    .status(404)
                    .json({
                        error:
                            "User not found."
                    });

            }


            ensureMomentum(user);

            resetPeriods(user);


            /*
            -----------------------------------------
            LOGIN IS SPECIAL

            Login gets +5 once per day,
            not once in the lifetime.
            -----------------------------------------
            */

            const isLogin =
                activityKey === "login";


            if (isLogin) {

                const loginKey =
                    `login:${getTodayKey()}`;


                if (
                    user.momentum
                        .completedActivities
                        .includes(loginKey)
                ) {

                    return res.json({

                        success: true,

                        rewarded: false,

                        xpEarned: 0,

                        totalXP:
                            user.momentum.xp,

                        todayXP:
                            user.momentum.todayXP,

                        weeklyXP:
                            user.momentum.weeklyXP,

                        message:
                            "Login XP already earned today.",

                        momentum:
                            user.momentum

                    });

                }


                addXP(
                    user,
                    ACTIVITY_XP
                );


                user.momentum
                    .completedActivities
                    .push(loginKey);


                updateStreak(user);

                await user.save();


                return res.json({

                    success: true,

                    rewarded: true,

                    xpEarned:
                        ACTIVITY_XP,

                    totalXP:
                        user.momentum.xp,

                    todayXP:
                        user.momentum.todayXP,

                    weeklyXP:
                        user.momentum.weeklyXP,

                    activity:
                        activityKey,

                    message:
                        "+5 XP for today's login.",

                    momentum:
                        user.momentum

                });

            }


            /*
            -----------------------------------------
            NORMAL ONE-TIME ACTIVITIES
            -----------------------------------------
            */

            if (
                user.momentum
                    .completedActivities
                    .includes(activityKey)
            ) {

                return res.json({

                    success: true,

                    rewarded: false,

                    xpEarned: 0,

                    totalXP:
                        user.momentum.xp,

                    todayXP:
                        user.momentum.todayXP,

                    weeklyXP:
                        user.momentum.weeklyXP,

                    activity:
                        activityKey,

                    message:
                        "Activity already rewarded.",

                    momentum:
                        user.momentum

                });

            }


            addXP(
                user,
                ACTIVITY_XP
            );


            user.momentum
                .completedActivities
                .push(activityKey);


            updateStreak(user);

            await user.save();


            res.json({

                success: true,

                rewarded: true,

                xpEarned:
                    ACTIVITY_XP,

                totalXP:
                    user.momentum.xp,

                todayXP:
                    user.momentum.todayXP,

                weeklyXP:
                    user.momentum.weeklyXP,

                activity:
                    activityKey,

                activityType,

                metadata,

                message:
                    "+5 XP earned.",

                momentum:
                    user.momentum

            });

        }

        catch (error) {

            console.error(
                "Momentum reward error:",
                error
            );

            res
                .status(500)
                .json({
                    error:
                        "Unable to award XP."
                });

        }

    }
);


/*
=========================================================
COMPLETE MISSION
=========================================================

The backend decides the reward.

Frontend cannot say:

assignedXP: 500

and get 500 XP.

Example:

dsa_problems
45 minutes
25 XP
=========================================================
*/

router.post(
    "/mission",
    verifyToken,
    async (req, res) => {

        try {

            const {
                missionKey,
                actualMinutes
            } = req.body;


            if (!missionKey) {

                return res
                    .status(400)
                    .json({
                        error:
                            "missionKey is required."
                    });

            }


            const mission =
                MISSIONS[missionKey];


            if (!mission) {

                return res
                    .status(400)
                    .json({
                        error:
                            "Invalid mission."
                    });

            }


            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {

                return res
                    .status(404)
                    .json({
                        error:
                            "User not found."
                    });

            }


            ensureMomentum(user);

            resetPeriods(user);


            if (
                user.momentum
                    .completedMissions
                    .includes(missionKey)
            ) {

                return res.json({

                    success: true,

                    rewarded: false,

                    xpEarned: 0,

                    message:
                        "Mission already completed.",

                    momentum:
                        user.momentum

                });

            }


            const minutes =
                Math.max(
                    0,
                    Number(actualMinutes) || 0
                );


            /*
            -----------------------------------------
            USER MUST COMPLETE ASSIGNED TIME
            -----------------------------------------
            */

            if (
                minutes <
                mission.assignedMinutes
            ) {

                return res.status(400).json({

                    success: false,

                    rewarded: false,

                    error:
                        `Complete at least ${mission.assignedMinutes} minutes before finishing this mission.`,

                    requiredMinutes:
                        mission.assignedMinutes,

                    actualMinutes:
                        minutes

                });

            }


            /*
            -----------------------------------------
            BASE MISSION REWARD
            -----------------------------------------
            */

            let earnedXP =
                mission.assignedXP;


            /*
            -----------------------------------------
            EXTRA WORK REWARD

            Example:

            45 min mission
            45 min = 25 XP

            60 min
            = 25 + 5

            75 min
            = 25 + 10

            90 min
            = 25 + 15

            Maximum extra = +20 XP
            -----------------------------------------
            */

            const extraMinutes =
                minutes -
                mission.assignedMinutes;


            const extraBlocks =
                Math.floor(
                    extraMinutes /
                    EXTRA_MINUTES_PER_XP
                );


            const extraXP =
                Math.min(
                    extraBlocks *
                        EXTRA_XP_AMOUNT,
                    MAX_EXTRA_XP
                );


            earnedXP += extraXP;


            /*
            -----------------------------------------
            ADD XP
            -----------------------------------------
            */

            addXP(
                user,
                earnedXP
            );


            /*
            -----------------------------------------
            RECORD MISSION
            -----------------------------------------
            */

            user.momentum
                .completedMissions
                .push(missionKey);


            updateStreak(user);

            await user.save();


            res.json({

                success: true,

                rewarded: true,

                missionKey,

                missionTitle:
                    mission.title,

                assignedMinutes:
                    mission.assignedMinutes,

                actualMinutes:
                    minutes,

                assignedXP:
                    mission.assignedXP,

                extraXP,

                xpEarned:
                    earnedXP,

                totalXP:
                    user.momentum.xp,

                todayXP:
                    user.momentum.todayXP,

                weeklyXP:
                    user.momentum.weeklyXP,

                momentum:
                    user.momentum

            });

        }

        catch (error) {

            console.error(
                "Mission completion error:",
                error
            );

            res
                .status(500)
                .json({
                    error:
                        "Unable to complete mission."
                });

        }

    }
);


/*
=========================================================
SAVE STUDY TIME
=========================================================

This DOES NOT automatically award XP.

Study time is recorded separately.

Mission XP comes from completing the mission.
Extra XP comes from completing the mission above
the assigned time.
=========================================================
*/

router.post(
    "/study-time",
    verifyToken,
    async (req, res) => {

        try {

            const {
                minutes
            } = req.body;


            const studyMinutes =
                Math.max(
                    0,
                    Number(minutes) || 0
                );


            if (
                studyMinutes <= 0
            ) {

                return res
                    .status(400)
                    .json({
                        error:
                            "Study minutes must be greater than 0."
                    });

            }


            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {

                return res
                    .status(404)
                    .json({
                        error:
                            "User not found."
                    });

            }


            ensureMomentum(user);

            resetPeriods(user);


            user.momentum
                .studyMinutes +=
                studyMinutes;


            await user.save();


            res.json({

                success: true,

                studyMinutes:
                    user.momentum
                        .studyMinutes,

                momentum:
                    user.momentum

            });

        }

        catch (error) {

            console.error(
                "Study time error:",
                error
            );

            res
                .status(500)
                .json({
                    error:
                        "Unable to save study time."
                });

        }

    }
);


/*
=========================================================
MISSION LIST
=========================================================
*/

router.get(
    "/missions",
    verifyToken,
    async (req, res) => {

        res.json({

            success: true,

            missions:
                Object.entries(
                    MISSIONS
                ).map(
                    ([key, mission]) => ({

                        key,

                        ...mission

                    })
                )

        });

    }
);


export default router;