import { useState } from "react";

import "./SkillGap.css";

import {
    AlertCircle,
    BookOpen,
    Bot,
    Brain,
    Clock3,
    Flame,
    GraduationCap,
    Search,
    Target
} from "lucide-react";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import Toast from "../components/ui/Toast";
import ErrorCard from "../components/ui/ErrorCard";

import { useResume } from "../context/ResumeContext";

function SkillGap({ skills, selectedCareer }) {

    const {
        skillGap,
        setSkillGap
    } = useResume();

    const result = skillGap;

    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        show: false,
        type: "success",
        message: ""
    });

    const [error, setError] = useState("");


    const showToast = (type, message) => {

        setToast({
            show: true,
            type,
            message
        });

        setTimeout(() => {

            setToast(prev => ({
                ...prev,
                show: false
            }));

        }, 3000);

    };
    const awardSkillGapXP = async () => {

        try {

            const token =
                localStorage.getItem("token");

            if (!token) return;

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/momentum/reward`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        activityKey: "skill_gap",
                        activityType: "skill-gap"
                    })
                }
            );

            const data =
                await response.json();

            if (!response.ok) {

                console.warn(
                    "Skill Gap XP request failed:",
                    data
                );

                return;
            }

            if (data.rewarded) {

                console.log(
                    `Skill Gap: +${data.xpEarned} XP`
                );

            } else {

                console.log(
                    "Skill Gap XP already earned."
                );

            }

        }

        catch (error) {

            console.error(
                "Skill Gap XP error:",
                error
            );

        }

    };


    const analyzeGap = async () => {

        setError("");

        if (!skills || skills.length === 0) {

            showToast(
                "warning",
                "Please upload and analyze your resume first."
            );

            return;
        }


        setSkillGap(null);


        try {

            setLoading(true);

            const token =
                localStorage.getItem("token");


            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/skill-gap`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        career: selectedCareer,
                        skills
                    })
                }
            );


            const data = await response.json();


            if (!response.ok || data.error) {

                const message =
                    data.error ||
                    "Skill Gap Analysis failed.";

                setError(message);

                showToast(
                    "error",
                    message
                );

                return;
            }


            setSkillGap(data);

            /*
            =================================================
            MOMENTUM XP

            Award +5 XP after the first successful
            Skill Gap analysis.
            =================================================
            */

            await awardSkillGapXP();

            showToast(
                "success",
                "Skill Gap analysis completed successfully."
            );

        }
        catch (error) {

            console.error(error);

            const message =
                "Unable to analyze skill gap.";

            setError(message);

            showToast(
                "error",
                message
            );

        }
        finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (
            <LoadingSpinner
                message="FutureTwin AI is identifying your skill gaps..."
            />
        );

    }


    return (

        <main className="skill-gap">

            {/* Hero */}

            <section className="skill-gap-hero">

                <div className="skill-gap-hero-content">

                    <h1 className="skill-gap-title">

                        <Target
                            size={30}
                            strokeWidth={2}
                        />

                        AI Skill Gap Analysis

                    </h1>


                    <p>

                        Discover the skills you already have,
                        identify what's missing, and receive
                        an AI-powered learning roadmap tailored
                        to your target career.

                    </p>

                </div>

            </section>


            {/* Analyze Button */}

            <div className="analyze-btn-container">

                <button
                    type="button"
                    className="analyze-button"
                    onClick={analyzeGap}
                    disabled={loading}
                >

                    <Search
                        size={18}
                        strokeWidth={2}
                    />

                    Analyze Skill Gap

                </button>

            </div>


            {/* Error */}

            {error && (

                <ErrorCard
                    title="Skill Gap Analysis Failed"
                    message={error}
                    onRetry={() => setError("")}
                />

            )}


            {/* Empty State */}

            {!result ? (

                <EmptyState
                    icon={
                        <Target
                            size={42}
                            strokeWidth={1.8}
                        />
                    }
                    title="No Skill Gap Analysis Yet"
                    description="Analyze your skills to discover missing technologies and receive an AI-powered learning roadmap."
                />

            ) : (

                <>

                    {/* Skill Match */}

                    <section className="section">

                        <div className="section-title">

                            <h2 className="section-heading">

                                <Target
                                    size={22}
                                    strokeWidth={2}
                                />

                                Skill Match

                            </h2>

                            <p>
                                A quick overview of your current
                                skill alignment.
                            </p>

                        </div>


                        <div className="summary-cards">

                            {/* Match */}

                            <div className="summary-card">

                                <div className="summary-icon">

                                    <Target
                                        size={28}
                                        strokeWidth={1.8}
                                    />

                                </div>

                                <h2>
                                    {result.matchPercentage}%
                                </h2>

                                <p>
                                    Skill Match
                                </p>

                            </div>


                            {/* Skills */}

                            <div className="summary-card">

                                <div className="summary-icon">

                                    <Brain
                                        size={28}
                                        strokeWidth={1.8}
                                    />

                                </div>

                                <h2>
                                    {skills?.length || 0}
                                </h2>

                                <p>
                                    Skills Found
                                </p>

                            </div>


                            {/* Missing */}

                            <div className="summary-card">

                                <div className="summary-icon">

                                    <AlertCircle
                                        size={28}
                                        strokeWidth={1.8}
                                    />

                                </div>

                                <h2>
                                    {result.missingSkills?.length || 0}
                                </h2>

                                <p>
                                    Missing Skills
                                </p>

                            </div>

                        </div>

                    </section>


                    {/* Missing Skills */}

                    <section className="section">

                        <div className="section-title">

                            <h2 className="section-heading">

                                <BookOpen
                                    size={22}
                                    strokeWidth={2}
                                />

                                Missing Skills

                            </h2>

                            <p>
                                Technologies and skills you should
                                focus on for your target career.
                            </p>

                        </div>


                        <div className="missing-skills-grid">

                            {result.missingSkills?.map(
                                (skill, index) => (

                                    <div
                                        key={index}
                                        className="skill-card"
                                    >

                                        <div className="skill-icon">

                                            <AlertCircle
                                                size={26}
                                                strokeWidth={1.8}
                                            />

                                        </div>


                                        <h4>
                                            {skill}
                                        </h4>


                                        <span className="skill-tag">

                                            Missing

                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    </section>


                    {/* Learning Priority */}

                    <section className="section">

                        <div className="section-title">

                            <h2 className="section-heading">

                                <Flame
                                    size={22}
                                    strokeWidth={2}
                                />

                                Learning Priority

                            </h2>

                            <p>
                                Follow these phases to build the
                                required skills in the right order.
                            </p>

                        </div>


                        <div className="roadmap">

                            {result.priority?.map(
                                (item, index) => (

                                    <div
                                        className="roadmap-item"
                                        key={index}
                                    >

                                        <div className="roadmap-circle">

                                            {index + 1}

                                        </div>


                                        <div className="roadmap-content">

                                            <h4>
                                                Phase {index + 1}
                                            </h4>

                                            <p>
                                                {item}
                                            </p>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </section>


                    {/* Recommended Resources */}

                    <section className="section">

                        <div className="section-title">

                            <h2 className="section-heading">

                                <BookOpen
                                    size={22}
                                    strokeWidth={2}
                                />

                                Recommended Resources

                            </h2>

                            <p>
                                Learning resources selected for
                                your skill development roadmap.
                            </p>

                        </div>


                        <div className="resources-grid">

                            {result.resources?.map(
                                (item, index) => (

                                    <div
                                        className="resource-card"
                                        key={index}
                                    >

                                        <h3>
                                            {item.title}
                                        </h3>


                                        <p className="resource-platform">

                                            <GraduationCap
                                                size={16}
                                                strokeWidth={2}
                                            />

                                            {item.platform}

                                        </p>


                                        <span>
                                            {item.level}
                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    </section>


                    {/* Estimated Learning Time */}

                    <section className="section">

                        <div className="time-card">

                            <div className="time-icon">

                                <Clock3
                                    size={42}
                                    strokeWidth={1.8}
                                />

                            </div>


                            <div>

                                <h2>
                                    Estimated Learning Time
                                </h2>


                                <h1>
                                    {result.estimatedTime}
                                </h1>


                                <p>
                                    Based on your current skills
                                    and learning roadmap.
                                </p>

                            </div>

                        </div>

                    </section>


                    {/* AI Recommendation */}

                    <section className="section">

                        <div className="advice-card">

                            <div className="advice-header">

                                <Bot
                                    size={22}
                                    strokeWidth={2}
                                />

                                AI Recommendation

                            </div>


                            <p>
                                {result.advice}
                            </p>

                        </div>

                    </section>

                </>

            )}


            {/* Toast */}

            {toast.show && (

                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() =>
                        setToast(prev => ({
                            ...prev,
                            show: false
                        }))
                    }
                />

            )}

        </main>

    );

}

export default SkillGap;