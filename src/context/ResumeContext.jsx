import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

import { calculateMomentum } from "../utils/momentum/momentumEngine";

const ResumeContext = createContext();

export function ResumeProvider({ children }) {

    const [resumeText, setResumeText] = useState("");

    const [parsedResume, setParsedResume] = useState(null);

    const [skills, setSkills] = useState([]);

    const [analysis, setAnalysis] = useState(null);

    const [selectedCareer, setSelectedCareer] = useState("AI Engineer");

    const [jobMatch, setJobMatch] = useState(null);

    const [futureSimulation, setFutureSimulation] = useState(null);

    const [skillGap, setSkillGap] = useState(null);

    const [momentum, setMomentum] = useState(null);

    const [careerHealth, setCareerHealth] = useState(0);

    const [placementReadiness, setPlacementReadiness] = useState(0);

    const [xp, setXP] = useState(0);

    const [currentMission, setCurrentMission] = useState(null);

    const [completedMissions, setCompletedMissions] = useState([]);

    const [studyMinutes, setStudyMinutes] = useState(0);

    const [burnoutRisk, setBurnoutRisk] = useState("Low");

    const [coachMessage, setCoachMessage] = useState("");

    const [weeklyXP, setWeeklyXP] = useState([
        0,0,0,0,0,0,0
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