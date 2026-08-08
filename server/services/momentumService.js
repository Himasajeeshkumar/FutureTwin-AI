import Momentum from "../models/Momentum.js";
import MomentumReward from "../models/MomentumReward.js";


/* =========================================
   Date Helpers
========================================= */

function getDateKey() {

    const date = new Date();

    const year =
        date.getUTCFullYear();

    const month =
        String(
            date.getUTCMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getUTCDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function getWeekKey() {

    const date = new Date();

    const day =
        date.getUTCDay();

    const diff =
        day === 0
            ? -6
            : 1 - day;

    date.setUTCDate(
        date.getUTCDate() + diff
    );

    const year =
        date.getUTCFullYear();

    const month =
        String(
            date.getUTCMonth() + 1
        ).padStart(2, "0");

    const dateNumber =
        String(
            date.getUTCDate()
        ).padStart(2, "0");

    return `${year}-${month}-${dateNumber}`;
}


function getWeekDayIndex() {

    const day =
        new Date().getUTCDay();

    return day === 0
        ? 6
        : day - 1;
}


/* =========================================
   Get / Create Momentum
========================================= */

export async function getMomentum(
    userId
) {

    const today =
        getDateKey();

    const currentWeek =
        getWeekKey();


    let momentum =
        await Momentum.findOne({
            userId
        });


    if (!momentum) {

        momentum =
            await Momentum.create({

                userId,

                xp: 0,

                todayXP: 0,

                todayXPDate: today,

                weeklyXP: [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],

                weekKey: currentWeek,

                completedActivities: [],

                completedMissions: [],

                achievements: [],

                streak: 0,

                lastActivityDate: "",

                totalStudyMinutes: 0

            });

        return momentum;
    }


    /*
     * New day
     */

    if (
        momentum.todayXPDate !== today
    ) {

        momentum.todayXP = 0;

        momentum.todayXPDate = today;

    }


    /*
     * New week
     */

    if (
        momentum.weekKey !== currentWeek
    ) {

        momentum.weeklyXP = [
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ];

        momentum.weekKey =
            currentWeek;

    }


    await momentum.save();

    return momentum;
}


/* =========================================
   Update Streak
========================================= */

function updateStreak(momentum) {

    const today =
        getDateKey();

    if (
        momentum.lastActivityDate ===
        today
    ) {
        return;
    }


    const yesterdayDate =
        new Date();

    yesterdayDate.setUTCDate(
        yesterdayDate.getUTCDate() - 1
    );


    const yesterdayYear =
        yesterdayDate.getUTCFullYear();

    const yesterdayMonth =
        String(
            yesterdayDate.getUTCMonth() + 1
        ).padStart(2, "0");

    const yesterdayDay =
        String(
            yesterdayDate.getUTCDate()
        ).padStart(2, "0");


    const yesterday =
        `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}`;


    if (
        momentum.lastActivityDate ===
        yesterday
    ) {

        momentum.streak += 1;

    } else {

        momentum.streak = 1;

    }


    momentum.lastActivityDate =
        today;
}


/* =========================================
   Add XP
========================================= */

async function addXP(
    momentum,
    xp
) {

    const today =
        getDateKey();

    const index =
        getWeekDayIndex();


    momentum.xp += xp;

    momentum.todayXP += xp;


    if (
        !Array.isArray(
            momentum.weeklyXP
        )
    ) {

        momentum.weeklyXP = [
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
        momentum.weeklyXP.length < 7
    ) {

        momentum.weeklyXP.push(0);

    }


    momentum.weeklyXP[index] =
        (
            Number(
                momentum.weeklyXP[index]
            ) || 0
        ) + xp;


    updateStreak(momentum);

    await momentum.save();
}


/* =========================================
   Fixed Activity Reward
========================================= */

export async function awardActivityXP({

    userId,

    activityKey,

    activityType,

    xp = 5,

    metadata = {}

}) {

    if (!userId) {

        throw new Error(
            "User ID is required."
        );

    }


    if (!activityKey) {

        throw new Error(
            "Activity key is required."
        );

    }


    const momentum =
        await getMomentum(
            userId
        );


    /*
     * Check whether reward
     * already exists.
     */

    const existingReward =
        await MomentumReward.findOne({

            userId,

            activityKey

        });


    if (existingReward) {

        return {

            rewarded: false,

            xpEarned: 0,

            reason:
                "Activity already rewarded.",

            momentum

        };

    }


    /*
     * Create reward record.
     */

    let reward;

    try {

        reward =
            await MomentumReward.create({

                userId,

                activityKey,

                activityType,

                xp,

                dateKey:
                    getDateKey(),

                metadata

            });

    } catch (error) {

        /*
         * Another request may have
         * created the same reward
         * at exactly the same time.
         */

        if (
            error.code === 11000
        ) {

            return {

                rewarded: false,

                xpEarned: 0,

                reason:
                    "Activity already rewarded.",

                momentum:
                    await getMomentum(
                        userId
                    )

            };

        }

        throw error;

    }


    await addXP(
        momentum,
        xp
    );


    if (
        !momentum.completedActivities.includes(
            activityKey
        )
    ) {

        momentum.completedActivities.push(
            activityKey
        );

        await momentum.save();

    }


    return {

        rewarded: true,

        xpEarned: xp,

        reward,

        momentum

    };
}


/* =========================================
   Complete Mission
========================================= */

export async function completeMission({

    userId,

    missionKey,

    missionTitle,

    assignedMinutes,

    assignedXP,

    actualMinutes

}) {

    if (!userId) {

        throw new Error(
            "User ID is required."
        );

    }


    if (!missionKey) {

        throw new Error(
            "Mission key is required."
        );

    }


    const assignedTime =
        Number(
            assignedMinutes
        ) || 0;


    const actualTime =
        Number(
            actualMinutes
        ) || 0;


    const baseXP =
        Number(
            assignedXP
        ) || 0;


    /*
     * User hasn't completed
     * enough time.
     */

    if (
        actualTime < assignedTime
    ) {

        return {

            rewarded: false,

            xpEarned: 0,

            reason:
                "Assigned mission time has not been completed."

        };

    }


    const activityKey =
        `mission:${missionKey}`;


    const momentum =
        await getMomentum(
            userId
        );


    /*
     * Already completed?
     */

    const existingReward =
        await MomentumReward.findOne({

            userId,

            activityKey

        });


    if (existingReward) {

        return {

            rewarded: false,

            xpEarned: 0,

            reason:
                "Mission already completed.",

            momentum

        };

    }


    /*
     * Extra time.
     *
     * Every additional 15 minutes
     * gives +5 XP.
     *
     * Maximum extra reward = 15 XP.
     */

    const extraMinutes =
        Math.max(
            0,
            actualTime -
            assignedTime
        );


    const bonusBlocks =
        Math.floor(
            extraMinutes / 15
        );


    const bonusXP =
        Math.min(
            bonusBlocks * 5,
            15
        );


    const totalXP =
        baseXP + bonusXP;


    const reward =
        await MomentumReward.create({

            userId,

            activityKey,

            activityType:
                "mission",

            xp: totalXP,

            dateKey:
                getDateKey(),

            metadata: {

                missionKey,

                missionTitle,

                assignedMinutes:
                    assignedTime,

                assignedXP:
                    baseXP,

                actualMinutes:
                    actualTime,

                extraMinutes,

                bonusXP

            }

        });


    await addXP(
        momentum,
        totalXP
    );


    if (
        !momentum.completedMissions.includes(
            missionKey
        )
    ) {

        momentum.completedMissions.push(
            missionKey
        );

    }


    if (
        !momentum.completedActivities.includes(
            activityKey
        )
    ) {

        momentum.completedActivities.push(
            activityKey
        );

    }


    await momentum.save();


    return {

        rewarded: true,

        xpEarned: totalXP,

        baseXP,

        bonusXP,

        actualMinutes:
            actualTime,

        extraMinutes,

        momentum

    };
}


/* =========================================
   Study Time
========================================= */

export async function addStudyMinutes({

    userId,

    minutes

}) {

    const momentum =
        await getMomentum(
            userId
        );


    const safeMinutes =
        Math.max(
            0,
            Number(minutes) || 0
        );


    momentum.totalStudyMinutes +=
        safeMinutes;


    await momentum.save();


    return momentum;
}