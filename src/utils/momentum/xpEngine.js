// src/utils/momentum/xpEngine.js

const XP_REWARDS = {
    resumeAnalysis: 15,
    jobMatch: 20,
    skillGap: 15,
    futureSimulator: 20,
};

const MISSION_NAMES = {
    resumeAnalysis: "Resume Analysis",
    jobMatch: "Analyze Job Match",
    skillGap: "Complete Skill Gap Analysis",
    futureSimulator: "Run Future Simulator",
};


// Get today's index
export function getTodayIndex() {

    const day = new Date().getDay();

    // JS:
    // Sunday = 0
    // Monday = 1
    // ...
    // Saturday = 6

    return day === 0 ? 6 : day - 1;
}


// Create a completely fresh Momentum state
export function createInitialXPState() {

    return {
        xp: 0,

        weeklyXP: [
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ],

        completedMissions: [],

        completedFeatures: []
    };
}


// Award XP for a feature
export function awardFeatureXP(
    currentState,
    feature
) {

    const reward = XP_REWARDS[feature];

    const missionName = MISSION_NAMES[feature];

    // Unknown feature
    if (!reward || !missionName) {

        return currentState;

    }


    // Already completed
    if (
        currentState.completedFeatures.includes(feature)
    ) {

        return currentState;

    }


    const todayIndex = getTodayIndex();


    const newWeeklyXP = [
        ...currentState.weeklyXP
    ];


    newWeeklyXP[todayIndex] += reward;


    return {

        ...currentState,

        xp:
            currentState.xp + reward,

        weeklyXP:
            newWeeklyXP,

        completedFeatures: [
            ...currentState.completedFeatures,
            feature
        ],

        completedMissions: [
            ...currentState.completedMissions,
            missionName
        ]

    };

}


// Get reward amount
export function getXPReward(feature) {

    return XP_REWARDS[feature] || 0;

}


// Check whether feature already earned XP
export function hasEarnedXP(
    state,
    feature
) {

    return state.completedFeatures.includes(
        feature
    );

}