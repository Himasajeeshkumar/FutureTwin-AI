import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { calculateMomentum } from "../utils/momentum/momentumEngine";

const ResumeContext = createContext();

/* =========================================
   Session Storage Helpers
========================================= */

const loadSession = (key, defaultValue) => {

    try {

        const saved =
            sessionStorage.getItem(key);

        return saved
            ? JSON.parse(saved)
            : defaultValue;

    } catch {

        return defaultValue;

    }

};


const saveSession = (key, value) => {

    try {

        sessionStorage.setItem(
            key,
            JSON.stringify(value)
        );

    } catch {

        // Ignore storage errors

    }

};


/* =========================================
   Date Helpers
========================================= */

const getDateKeyFromDate = (date) => {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;

};


// Returns YYYY-MM-DD using local time
const getDateKey = () => {

    return getDateKeyFromDate(
        new Date()
    );

};


// Returns the Monday of the current week
const getWeekKey = () => {

    const date = new Date();

    const day =
        date.getDay();

    const diff =
        day === 0
            ? -6
            : 1 - day;

    date.setDate(
        date.getDate() + diff
    );

    return getDateKeyFromDate(date);

};


/* =========================================
   Default Weekly XP
========================================= */

const emptyWeeklyXP = [
    0,
    0,
    0,
    0,
    0,
    0,
    0
];


/* =========================================
   Resume Provider
========================================= */

export function ResumeProvider({ children }) {


    /* =====================================
       Resume Data
    ===================================== */

    const [resumeText, setResumeText] =
        useState(() =>
            loadSession(
                "resumeText",
                ""
            )
        );


    const [parsedResume, setParsedResume] =
        useState(() =>
            loadSession(
                "parsedResume",
                null
            )
        );


    const [skills, setSkills] =
        useState(() =>
            loadSession(
                "skills",
                []
            )
        );


    const [analysis, setAnalysis] =
        useState(() =>
            loadSession(
                "analysis",
                null
            )
        );


    const [selectedCareer, setSelectedCareer] =
        useState(() =>
            loadSession(
                "selectedCareer",
                "AI Engineer"
            )
        );


    const [jobMatch, setJobMatch] =
        useState(() =>
            loadSession(
                "jobMatch",
                null
            )
        );


    const [futureSimulation, setFutureSimulation] =
        useState(() =>
            loadSession(
                "futureSimulation",
                null
            )
        );


    const [skillGap, setSkillGap] =
        useState(() =>
            loadSession(
                "skillGap",
                null
            )
        );


    const [momentum, setMomentum] =
        useState(() =>
            loadSession(
                "momentum",
                null
            )
        );


    /* =====================================
       Career Metrics
    ===================================== */

    const [careerHealth, setCareerHealth] =
        useState(() =>
            loadSession(
                "careerHealth",
                0
            )
        );


    const [placementReadiness, setPlacementReadiness] =
        useState(() =>
            loadSession(
                "placementReadiness",
                0
            )
        );


    const [burnoutRisk, setBurnoutRisk] =
        useState(() =>
            loadSession(
                "burnoutRisk",
                "Low"
            )
        );


    const [coachMessage, setCoachMessage] =
        useState(() =>
            loadSession(
                "coachMessage",
                "Complete today's mission to boost your placement readiness."
            )
        );


    const [currentMission, setCurrentMission] =
        useState(() =>
            loadSession(
                "currentMission",
                "Complete today's learning task"
            )
        );


    /* =====================================
       Lifetime XP
    ===================================== */

    const [xp, setXP] = useState(() => {

        const saved =
            localStorage.getItem(
                "futuretwin_xp"
            );

        return saved
            ? Number(saved)
            : 0;

    });


    /* =====================================
       Today's XP
    ===================================== */

    const [todayXP, setTodayXP] = useState(() => {

        const savedDate =
            localStorage.getItem(
                "futuretwin_xp_date"
            );

        const today =
            getDateKey();


        if (savedDate !== today) {

            localStorage.setItem(
                "futuretwin_xp_date",
                today
            );

            localStorage.setItem(
                "futuretwin_todayXP",
                "0"
            );

            return 0;

        }


        const savedXP =
            localStorage.getItem(
                "futuretwin_todayXP"
            );


        return savedXP
            ? Number(savedXP)
            : 0;

    });


    /* =====================================
       Weekly XP
    ===================================== */

    const [weeklyXP, setWeeklyXP] = useState(() => {

        const currentWeek =
            getWeekKey();


        const savedWeek =
            localStorage.getItem(
                "futuretwin_weekKey"
            );


        const savedXP =
            localStorage.getItem(
                "futuretwin_weeklyXP"
            );


        /*
         * If the stored week is different,
         * start a completely new week.
         */

        if (savedWeek !== currentWeek) {

            localStorage.setItem(
                "futuretwin_weekKey",
                currentWeek
            );


            localStorage.setItem(
                "futuretwin_weeklyXP",
                JSON.stringify(
                    emptyWeeklyXP
                )
            );


            return [
                ...emptyWeeklyXP
            ];

        }


        try {

            const parsed =
                savedXP
                    ? JSON.parse(savedXP)
                    : emptyWeeklyXP;


            if (
                !Array.isArray(parsed) ||
                parsed.length !== 7
            ) {

                return [
                    ...emptyWeeklyXP
                ];

            }


            return parsed.map(
                value =>
                    Number(value) || 0
            );

        } catch {

            return [
                ...emptyWeeklyXP
            ];

        }

    });


    /* =====================================
       Missions & Study
    ===================================== */

    const [completedMissions, setCompletedMissions] =
        useState(() =>
            loadSession(
                "completedMissions",
                []
            )
        );


    const [studyMinutes, setStudyMinutes] =
        useState(() =>
            loadSession(
                "studyMinutes",
                0
            )
        );


    /* =====================================
       Level & Achievements
    ===================================== */

    const [level, setLevel] =
        useState(() =>
            loadSession(
                "level",
                1
            )
        );


    const [nextLevelXP, setNextLevelXP] =
        useState(() =>
            loadSession(
                "nextLevelXP",
                100
            )
        );


    const [achievements, setAchievements] =
        useState(() =>
            loadSession(
                "achievements",
                []
            )
        );


    const [completedPercent, setCompletedPercent] =
        useState(() =>
            loadSession(
                "completedPercent",
                0
            )
        );


    /* =====================================
       Save General Session Data
    ===================================== */

    useEffect(() => {

        saveSession(
            "resumeText",
            resumeText
        );


        saveSession(
            "parsedResume",
            parsedResume
        );


        saveSession(
            "skills",
            skills
        );


        saveSession(
            "analysis",
            analysis
        );


        saveSession(
            "selectedCareer",
            selectedCareer
        );


        saveSession(
            "jobMatch",
            jobMatch
        );


        saveSession(
            "futureSimulation",
            futureSimulation
        );


        saveSession(
            "skillGap",
            skillGap
        );


        saveSession(
            "momentum",
            momentum
        );


        saveSession(
            "careerHealth",
            careerHealth
        );


        saveSession(
            "placementReadiness",
            placementReadiness
        );


        saveSession(
            "burnoutRisk",
            burnoutRisk
        );


        saveSession(
            "coachMessage",
            coachMessage
        );


        saveSession(
            "currentMission",
            currentMission
        );


        saveSession(
            "completedMissions",
            completedMissions
        );


        saveSession(
            "studyMinutes",
            studyMinutes
        );


        saveSession(
            "level",
            level
        );


        saveSession(
            "nextLevelXP",
            nextLevelXP
        );


        saveSession(
            "achievements",
            achievements
        );


        saveSession(
            "completedPercent",
            completedPercent
        );

    }, [

        resumeText,
        parsedResume,
        skills,
        analysis,
        selectedCareer,
        jobMatch,
        futureSimulation,
        skillGap,
        momentum,
        careerHealth,
        placementReadiness,
        burnoutRisk,
        coachMessage,
        currentMission,
        completedMissions,
        studyMinutes,
        level,
        nextLevelXP,
        achievements,
        completedPercent

    ]);


    /* =====================================
       Save Lifetime XP
    ===================================== */

    useEffect(() => {

        localStorage.setItem(
            "futuretwin_xp",
            String(xp)
        );

    }, [xp]);


    /* =====================================
       Save Today's XP
    ===================================== */

    useEffect(() => {

        localStorage.setItem(
            "futuretwin_todayXP",
            String(todayXP)
        );


        localStorage.setItem(
            "futuretwin_xp_date",
            getDateKey()
        );

    }, [todayXP]);


    /* =====================================
       Save Weekly XP
    ===================================== */

    useEffect(() => {

        localStorage.setItem(
            "futuretwin_weeklyXP",
            JSON.stringify(weeklyXP)
        );


        localStorage.setItem(
            "futuretwin_weekKey",
            getWeekKey()
        );

    }, [weeklyXP]);


    /* =====================================
       Calculate Momentum
    ===================================== */

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


        setAchievements(
            result.achievements
        );


        setCompletedPercent(
            result.completedPercent
        );

    }, [

        analysis,
        jobMatch,
        skillGap,
        futureSimulation,
        studyMinutes,
        completedMissions,
        xp

    ]);


    /* =====================================
       Provider
    ===================================== */

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


                /* Career Metrics */

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


export function useResume() {

    return useContext(
        ResumeContext
    );

}