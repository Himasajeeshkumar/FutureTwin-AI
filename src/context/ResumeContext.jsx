import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { calculateMomentum } from "../utils/momentum/momentumEngine";

const ResumeContext = createContext();

const EMPTY_WEEK = [0, 0, 0, 0, 0, 0, 0];


/* =========================================================
   CURRENT USER
========================================================= */

const getCurrentUser = () => {

    try {

        const savedUser =
            localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;

    } catch {

        return null;

    }

};


/* =========================================================
   USER-SPECIFIC SESSION STORAGE
========================================================= */

const getUserKey = (userId, key) => {

    if (!userId) {
        return null;
    }

    return `futuretwin_${userId}_${key}`;

};


const loadUserSession = (
    userId,
    key,
    defaultValue
) => {

    try {

        const storageKey =
            getUserKey(userId, key);

        if (!storageKey) {
            return defaultValue;
        }

        const saved =
            sessionStorage.getItem(storageKey);

        return saved
            ? JSON.parse(saved)
            : defaultValue;

    } catch {

        return defaultValue;

    }

};


const saveUserSession = (
    userId,
    key,
    value
) => {

    try {

        const storageKey =
            getUserKey(userId, key);

        if (!storageKey) {
            return;
        }

        sessionStorage.setItem(
            storageKey,
            JSON.stringify(value)
        );

    } catch {

        // Ignore storage errors

    }

};


/* =========================================================
   CLEAR OLD GENERIC STORAGE
   This removes the old shared keys created by the
   previous version of FutureTwin.
========================================================= */

const clearOldSharedStorage = () => {

    const oldKeys = [

        "resumeText",
        "parsedResume",
        "skills",
        "analysis",
        "selectedCareer",
        "jobMatch",
        "futureSimulation",
        "skillGap",

        "careerHealth",
        "placementReadiness",
        "burnoutRisk",
        "coachMessage",
        "currentMission",

        "completedMissions",
        "studyMinutes",

        "level",
        "nextLevelXP",
        "achievements",
        "completedPercent"

    ];

    oldKeys.forEach(key => {

        sessionStorage.removeItem(key);

    });

};


/* =========================================================
   RESUME PROVIDER
========================================================= */

export function ResumeProvider({ children }) {

    const [currentUserId, setCurrentUserId] =
        useState(() => {

            const user =
                getCurrentUser();

            return user?._id ||
                user?.id ||
                null;

        });


    /* =====================================================
       RESUME DATA
    ===================================================== */

    const [resumeText, setResumeText] =
        useState("");


    const [parsedResume, setParsedResume] =
        useState(null);


    const [skills, setSkills] =
        useState([]);


    const [analysis, setAnalysis] =
        useState(null);


    const [selectedCareer, setSelectedCareer] =
        useState("AI Engineer");


    const [jobMatch, setJobMatch] =
        useState(null);


    const [futureSimulation, setFutureSimulation] =
        useState(null);


    const [skillGap, setSkillGap] =
        useState(null);


    /* =====================================================
       MOMENTUM
    ===================================================== */

    const [momentum, setMomentum] =
        useState(null);


    const [momentumLoaded, setMomentumLoaded] =
        useState(false);


    /* =====================================================
       XP
       MongoDB is the source of truth.
    ===================================================== */

    const [xp, setXP] =
        useState(0);


    const [todayXP, setTodayXP] =
        useState(0);


    const [weeklyXP, setWeeklyXP] =
        useState([
            ...EMPTY_WEEK
        ]);


    /* =====================================================
       CAREER METRICS
    ===================================================== */

    const [careerHealth, setCareerHealth] =
        useState(0);


    const [placementReadiness, setPlacementReadiness] =
        useState(0);


    const [burnoutRisk, setBurnoutRisk] =
        useState("Low");


    const [coachMessage, setCoachMessage] =
        useState(
            "Complete today's mission to boost your placement readiness."
        );


    const [currentMission, setCurrentMission] =
        useState(
            "Complete today's learning task"
        );


    /* =====================================================
       MISSIONS
    ===================================================== */

    const [completedMissions, setCompletedMissions] =
        useState([]);


    const [studyMinutes, setStudyMinutes] =
        useState(0);


    /* =====================================================
       LEVEL / ACHIEVEMENTS
    ===================================================== */

    const [level, setLevel] =
        useState(1);


    const [nextLevelXP, setNextLevelXP] =
        useState(100);


    const [achievements, setAchievements] =
        useState([]);


    const [completedPercent, setCompletedPercent] =
        useState(0);


    /* =====================================================
       LOAD USER DATA WHEN ACCOUNT CHANGES
    ===================================================== */

    useEffect(() => {

        const user =
            getCurrentUser();

        const newUserId =
            user?._id ||
            user?.id ||
            null;


        /*
         * If account changed, completely reset the
         * in-memory React state first.
         */

        if (
            newUserId !== currentUserId
        ) {

            setCurrentUserId(
                newUserId
            );

            setResumeText(
                loadUserSession(
                    newUserId,
                    "resumeText",
                    ""
                )
            );

            setParsedResume(
                loadUserSession(
                    newUserId,
                    "parsedResume",
                    null
                )
            );

            setSkills(
                loadUserSession(
                    newUserId,
                    "skills",
                    []
                )
            );

            setAnalysis(
                loadUserSession(
                    newUserId,
                    "analysis",
                    null
                )
            );

            setSelectedCareer(
                loadUserSession(
                    newUserId,
                    "selectedCareer",
                    "AI Engineer"
                )
            );

            setJobMatch(
                loadUserSession(
                    newUserId,
                    "jobMatch",
                    null
                )
            );

            setFutureSimulation(
                loadUserSession(
                    newUserId,
                    "futureSimulation",
                    null
                )
            );

            setSkillGap(
                loadUserSession(
                    newUserId,
                    "skillGap",
                    null
                )
            );

            setCompletedMissions([]);

            setStudyMinutes(0);

            setMomentum(null);

            setXP(0);

            setTodayXP(0);

            setWeeklyXP([
                ...EMPTY_WEEK
            ]);

            setMomentumLoaded(false);

        }

    }, [currentUserId]);


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    useEffect(() => {

        const user =
            getCurrentUser();

        const userId =
            user?._id ||
            user?.id ||
            null;


        if (!userId) {

            clearOldSharedStorage();

            setResumeText("");

            setParsedResume(null);

            setSkills([]);

            setAnalysis(null);

            setJobMatch(null);

            setFutureSimulation(null);

            setSkillGap(null);

            setXP(0);

            setTodayXP(0);

            setWeeklyXP([
                ...EMPTY_WEEK
            ]);

            return;

        }


        /*
         * Load this specific user's session data.
         */

        setResumeText(
            loadUserSession(
                userId,
                "resumeText",
                ""
            )
        );

        setParsedResume(
            loadUserSession(
                userId,
                "parsedResume",
                null
            )
        );

        setSkills(
            loadUserSession(
                userId,
                "skills",
                []
            )
        );

        setAnalysis(
            loadUserSession(
                userId,
                "analysis",
                null
            )
        );

        setSelectedCareer(
            loadUserSession(
                userId,
                "selectedCareer",
                "AI Engineer"
            )
        );

        setJobMatch(
            loadUserSession(
                userId,
                "jobMatch",
                null
            )
        );

        setFutureSimulation(
            loadUserSession(
                userId,
                "futureSimulation",
                null
            )
        );

        setSkillGap(
            loadUserSession(
                userId,
                "skillGap",
                null
            )
        );


        /*
         * Remove old global keys from the previous
         * version of the application.
         */

        clearOldSharedStorage();

    }, []);


    /* =====================================================
       SAVE USER-SPECIFIC RESUME DATA
    ===================================================== */

    useEffect(() => {

        if (!currentUserId) {
            return;
        }

        saveUserSession(
            currentUserId,
            "resumeText",
            resumeText
        );

        saveUserSession(
            currentUserId,
            "parsedResume",
            parsedResume
        );

        saveUserSession(
            currentUserId,
            "skills",
            skills
        );

        saveUserSession(
            currentUserId,
            "analysis",
            analysis
        );

        saveUserSession(
            currentUserId,
            "selectedCareer",
            selectedCareer
        );

        saveUserSession(
            currentUserId,
            "jobMatch",
            jobMatch
        );

        saveUserSession(
            currentUserId,
            "futureSimulation",
            futureSimulation
        );

        saveUserSession(
            currentUserId,
            "skillGap",
            skillGap
        );

    }, [

        currentUserId,
        resumeText,
        parsedResume,
        skills,
        analysis,
        selectedCareer,
        jobMatch,
        futureSimulation,
        skillGap

    ]);


    /* =====================================================
       LOAD MOMENTUM FROM MONGODB
    ===================================================== */

    const loadMomentum = async () => {

        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                setMomentum(null);

                setXP(0);

                setTodayXP(0);

                setWeeklyXP([
                    ...EMPTY_WEEK
                ]);

                setMomentumLoaded(false);

                return;

            }


            const response =
                await fetch(
                    `${import.meta.env.VITE_API_URL}/momentum`,
                    {
                        method: "GET",

                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                console.error(
                    "Momentum loading failed:",
                    data
                );

                return;

            }


            const backendMomentum =
                data.momentum || {};


            setMomentum(
                backendMomentum
            );


            setXP(
                Number(
                    backendMomentum.xp
                ) || 0
            );


            setTodayXP(
                Number(
                    backendMomentum.todayXP
                ) || 0
            );


            setWeeklyXP(
                Array.isArray(
                    backendMomentum.weeklyXP
                )
                    ? [
                        ...backendMomentum.weeklyXP,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                        .slice(0, 7)
                        .map(
                            value =>
                                Number(value) || 0
                        )
                    : [
                        ...EMPTY_WEEK
                    ]
            );


            setCompletedMissions(
                Array.isArray(
                    backendMomentum.completedMissions
                )
                    ? backendMomentum.completedMissions
                    : []
            );


            setStudyMinutes(
                Number(
                    backendMomentum.studyMinutes
                ) || 0
            );


            if (
                Array.isArray(
                    backendMomentum.achievements
                )
            ) {

                setAchievements(
                    backendMomentum.achievements
                );

            }


            setMomentumLoaded(true);


            console.log(
                "Momentum loaded for user:",
                backendMomentum
            );

        }

        catch (error) {

            console.error(
                "Momentum loading error:",
                error
            );

        }

    };


    /* =====================================================
       LOAD MOMENTUM WHEN USER CHANGES
    ===================================================== */

    useEffect(() => {

        if (!currentUserId) {

            return;

        }

        loadMomentum();

    }, [currentUserId]);


    /* =====================================================
       DETECT LOGIN / LOGOUT / ACCOUNT CHANGE
    ===================================================== */

    useEffect(() => {

        const handleAuthChange = () => {

            const user =
                getCurrentUser();

            const newUserId =
                user?._id ||
                user?.id ||
                null;


            /*
             * Immediately clear the previous account's
             * in-memory resume data.
             */

            if (
                newUserId !== currentUserId
            ) {

                setResumeText("");

                setParsedResume(null);

                setSkills([]);

                setAnalysis(null);

                setJobMatch(null);

                setFutureSimulation(null);

                setSkillGap(null);

                setXP(0);

                setTodayXP(0);

                setWeeklyXP([
                    ...EMPTY_WEEK
                ]);

                setCompletedMissions([]);

                setStudyMinutes(0);

                setMomentum(null);

                setMomentumLoaded(false);


                setCurrentUserId(
                    newUserId
                );

            }

        };


        window.addEventListener(
            "futuretwin-auth-changed",
            handleAuthChange
        );


        return () => {

            window.removeEventListener(
                "futuretwin-auth-changed",
                handleAuthChange
            );

        };

    }, [currentUserId]);


    /* =====================================================
       AWARD LOCAL UI XP
       Used only for immediate UI updates.
       Permanent XP must come from backend.
    ===================================================== */

    const awardXP = (amount) => {

        const points =
            Number(amount) || 0;


        if (points <= 0) {
            return;
        }


        setXP(
            previous =>
                previous + points
        );


        setTodayXP(
            previous =>
                previous + points
        );


        setWeeklyXP(
            previous => {

                const updated =
                    Array.isArray(previous)
                        ? [...previous]
                        : [
                            ...EMPTY_WEEK
                        ];


                const day =
                    new Date().getDay();


                const index =
                    day === 0
                        ? 6
                        : day - 1;


                while (
                    updated.length < 7
                ) {

                    updated.push(0);

                }


                updated[index] =
                    (
                        Number(
                            updated[index]
                        ) || 0
                    ) + points;


                return updated;

            }
        );

    };


    /* =====================================================
       BACKEND REWARD
    ===================================================== */

    const rewardActivity = async (
        activityKey,
        activityType = "activity"
    ) => {

        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                console.warn(
                    "Cannot reward activity. No token."
                );

                return null;

            }


            const response =
                await fetch(
                    `${import.meta.env.VITE_API_URL}/momentum/reward`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`
                        },

                        body: JSON.stringify({

                            activityKey,

                            activityType

                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                console.error(
                    "Reward request failed:",
                    data
                );

                return null;

            }


            /*
             * Backend is authoritative.
             */

            if (data.momentum) {

                setMomentum(
                    data.momentum
                );


                setXP(
                    Number(
                        data.momentum.xp
                    ) || 0
                );


                setTodayXP(
                    Number(
                        data.momentum.todayXP
                    ) || 0
                );


                setWeeklyXP(
                    Array.isArray(
                        data.momentum.weeklyXP
                    )
                        ? [
                            ...data.momentum.weeklyXP,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                            .slice(0, 7)
                            .map(
                                value =>
                                    Number(value) || 0
                            )
                        : [
                            ...EMPTY_WEEK
                        ]
                );


                setCompletedMissions(
                    Array.isArray(
                        data.momentum.completedMissions
                    )
                        ? data.momentum.completedMissions
                        : []
                );


                setStudyMinutes(
                    Number(
                        data.momentum.studyMinutes
                    ) || 0
                );

            }


            return data;

        }

        catch (error) {

            console.error(
                "Reward error:",
                error
            );

            return null;

        }

    };


    /* =====================================================
       AWARD ACTIVITY ONCE
    ===================================================== */

    const awardXPOnce = async (
        activity,
        amount = 5
    ) => {

        if (!activity) {

            return false;

        }


        const result =
            await rewardActivity(
                activity,
                "activity"
            );


        return Boolean(
            result?.rewarded
        );

    };


    /* =====================================================
       CALCULATE MOMENTUM METRICS
    ===================================================== */

    useEffect(() => {

        const result =
            calculateMomentum({

                analysis,

                jobMatch,

                skillGap,

                futureSimulation,

                studyMinutes,

                completedMissions,

                xp

            });


        setCareerHealth(
            result.careerHealth
        );


        setPlacementReadiness(
            result.placementReadiness
        );


        setBurnoutRisk(
            result.burnoutRisk
        );


        setCurrentMission(
            result.currentMission
        );


        setCoachMessage(
            result.coachMessage
        );


        setLevel(
            result.level
        );


        setNextLevelXP(
            result.nextLevelXP
        );


        setCompletedPercent(
            result.completedPercent
        );


        /*
         * Only use locally calculated achievements
         * if backend hasn't supplied them.
         */

        if (
            !momentum?.achievements
        ) {

            setAchievements(
                result.achievements
            );

        }

    }, [

        analysis,
        jobMatch,
        skillGap,
        futureSimulation,
        studyMinutes,
        completedMissions,
        xp

    ]);


    /* =====================================================
       PROVIDER
    ===================================================== */

    return (

        <ResumeContext.Provider
            value={{

                /* Resume */

                resumeText,
                setResumeText,

                parsedResume,
                setParsedResume,

                skills,
                setSkills,


                /* Career */

                analysis,
                setAnalysis,

                selectedCareer,
                setSelectedCareer,

                jobMatch,
                setJobMatch,

                futureSimulation,
                setFutureSimulation,

                skillGap,
                setSkillGap,

                momentum,
                setMomentum,


                /* Metrics */

                careerHealth,
                setCareerHealth,

                placementReadiness,
                setPlacementReadiness,

                burnoutRisk,
                setBurnoutRisk,

                coachMessage,
                setCoachMessage,

                currentMission,
                setCurrentMission,


                /* XP */

                xp,
                setXP,

                todayXP,
                setTodayXP,

                weeklyXP,
                setWeeklyXP,

                awardXP,

                awardXPOnce,

                rewardActivity,

                loadMomentum,

                momentumLoaded,


                /* Study */

                studyMinutes,
                setStudyMinutes,


                /* Missions */

                completedMissions,
                setCompletedMissions,


                /* Progress */

                level,
                setLevel,

                nextLevelXP,
                setNextLevelXP,

                achievements,
                setAchievements,

                completedPercent,
                setCompletedPercent

            }}

        >

            {children}

        </ResumeContext.Provider>

    );

}


/* =========================================================
   HOOK
========================================================= */

export function useResume() {

    return useContext(
        ResumeContext
    );

}