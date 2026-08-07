import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

import { calculateMomentum } from "../utils/momentum/momentumEngine";

const ResumeContext = createContext();

const loadSession = (key, defaultValue) => {

    try {

        const saved = sessionStorage.getItem(key);

        return saved ? JSON.parse(saved) : defaultValue;

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

export function ResumeProvider({ children }) {

    const [resumeText, setResumeText] = useState(() =>
        loadSession("resumeText", "")
    );

    const [parsedResume, setParsedResume] = useState(() =>
        loadSession("parsedResume", null)
    );

    const [skills, setSkills] = useState(() =>
        loadSession("skills", [])
    );

    const [analysis, setAnalysis] = useState(() =>
        loadSession("analysis", null)
    );

    const [selectedCareer, setSelectedCareer] = useState(() =>
        loadSession("selectedCareer", "AI Engineer")
    );

    const [jobMatch, setJobMatch] = useState(() =>
        loadSession("jobMatch", null)
    );

    const [futureSimulation, setFutureSimulation] = useState(() =>
        loadSession("futureSimulation", null)
    );

    const [skillGap, setSkillGap] = useState(() =>
        loadSession("skillGap", null)
    );

    const [momentum, setMomentum] = useState(() =>
        loadSession("momentum", null)
    );

    const [careerHealth, setCareerHealth] = useState(() =>
        loadSession("careerHealth", 0)
    );

    const [placementReadiness, setPlacementReadiness] = useState(() =>
        loadSession("placementReadiness", 0)
    );

    const [xp, setXP] = useState(() =>
        loadSession("xp", 0)
    );

    const [currentMission, setCurrentMission] = useState(() =>
        loadSession("currentMission", "Complete today's learning task")
    );

    const [completedMissions, setCompletedMissions] = useState(() =>
        loadSession("completedMissions", [])
    );

    const [studyMinutes, setStudyMinutes] = useState(() =>
        loadSession("studyMinutes", 0)
    );

    const [weeklyXP, setWeeklyXP] = useState(() =>
        loadSession("weeklyXP", 0)
    );

    const [burnoutRisk, setBurnoutRisk] = useState(() =>
        loadSession("burnoutRisk", "Low")
    );

    const [coachMessage, setCoachMessage] = useState(() =>
        loadSession(
            "coachMessage",
            "Complete today's mission to boost your placement readiness."
        )
    );

    const [level, setLevel] = useState(() =>
        loadSession("level", 1)
    );

    const [nextLevelXP, setNextLevelXP] = useState(() =>
        loadSession("nextLevelXP", 100)
    );

    const [achievements, setAchievements] = useState(() =>
        loadSession("achievements", [])
    );

    const [completedPercent, setCompletedPercent] = useState(() =>
        loadSession("completedPercent", 0)
    );

    const [todayXP, setTodayXP] = useState(() =>
        loadSession("todayXP", 0)
    );

    
    useEffect(() => {

    saveSession("resumeText", resumeText);

    saveSession("parsedResume", parsedResume);

    saveSession("skills", skills);

    saveSession("analysis", analysis);

    saveSession("jobMatch", jobMatch);

    saveSession("skillGap", skillGap);

    saveSession("currentMission", currentMission);

    saveSession("futureSimulation", futureSimulation);

    saveSession("selectedCareer", selectedCareer);

    saveSession("momentum", momentum);

    saveSession("careerHealth", careerHealth);

    saveSession("burnoutRisk", burnoutRisk);

    saveSession("placementReadiness", placementReadiness);

    saveSession("xp", xp);

    saveSession("completedMissions", completedMissions);

    saveSession("studyMinutes", studyMinutes);

    saveSession("weeklyXP", weeklyXP);

    saveSession("level", level);

    saveSession("nextLevelXP", nextLevelXP);

    saveSession("achievements", achievements);

    saveSession("completedPercent", completedPercent);

    saveSession("todayXP", todayXP);

}, [
    resumeText,
    parsedResume,
    skills,
    analysis,
    jobMatch,
    skillGap,
    currentMission,
    futureSimulation,
    selectedCareer,
    momentum,
    careerHealth,
    burnoutRisk,
    placementReadiness,
    xp,
    completedMissions,
    studyMinutes,
    weeklyXP,
    level,
    nextLevelXP,
    achievements,
    completedPercent,
    todayXP,
]);
    useEffect(() => {

        const result = calculateMomentum({

            analysis,

            jobMatch,

            skillGap,

            futureSimulation,

            studyMinutes,

            completedMissions,

            xp

        });

        setCareerHealth(result.careerHealth);

        setPlacementReadiness(result.placementReadiness);

        setBurnoutRisk(result.burnoutRisk);

        setCurrentMission(result.currentMission);

        setCoachMessage(result.coachMessage);

        setLevel(result.level);

        setNextLevelXP(result.nextLevelXP);

        setAchievements(result.achievements);

        setCompletedPercent(result.completedPercent);

        setTodayXP(result.todayXP);

    }, [

        analysis,

        jobMatch,

        skillGap,

        futureSimulation,

        studyMinutes,

        completedMissions,

        xp

    ]);

    return (

        <ResumeContext.Provider
            value={{

                resumeText,
                setResumeText,

                parsedResume,
                setParsedResume,

                skills,
                setSkills,

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

                careerHealth,
                setCareerHealth,

                placementReadiness,
                setPlacementReadiness,

                xp,
                setXP,

                currentMission,
                setCurrentMission,

                completedMissions,
                setCompletedMissions,

                studyMinutes,
                setStudyMinutes,

                burnoutRisk,
                setBurnoutRisk,

                coachMessage,
                setCoachMessage,

                level,
                setLevel,

                nextLevelXP,
                setNextLevelXP,

                achievements,
                setAchievements,

                completedPercent,
                setCompletedPercent,

                todayXP,
                setTodayXP,

                weeklyXP,
                setWeeklyXP

                

            }}

        >

            {children}

        </ResumeContext.Provider>

    );

}

export function useResume() {

    return useContext(ResumeContext);

}