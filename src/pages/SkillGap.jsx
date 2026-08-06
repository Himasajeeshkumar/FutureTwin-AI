import { useState } from "react";

import "./SkillGap.css";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import Toast from "../components/ui/Toast";
import ErrorCard from "../components/ui/ErrorCard";

function SkillGap({ skills, selectedCareer }) {

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: ""
});

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

const [error, setError] = useState("");

    const analyzeGap = async () => {
        setError("");
        setResult(null);

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/skill-gap`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({

                    career: selectedCareer,

                    skills

                })

            });

            const data = await response.json();

            if (data.error) {
                setError(data.error || "Skill Gap Analysis failed.");

                showToast(
                    "error",
                    data.error || "Skill Gap Analysis failed."
                );

                return;
            }

            setResult(data);

            showToast(
                "success",
                "Skill Gap analysis completed successfully."
            );

        }
        catch (error) {

            console.log(error);

            setError("Unable to analyze skill gap.");

            showToast(
                "error",
                "Unable to analyze skill gap."
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

        <div className="skill-gap">

            <div className="skill-gap-hero">

                <div>

                    <h1>🎯 AI Skill Gap Analysis</h1>

                    <p>

                        Discover the skills you already have,
                        identify what's missing,
                        and receive an AI-powered learning roadmap
                        tailored to your target career.

                    </p>

                </div>

            </div>
            <div className="analyze-btn-container">
                <button
                    onClick={analyzeGap}
                    disabled={loading}
                >
                    🔍 Analyze Skill Gap
                </button>

                {error && (

                    <ErrorCard
                        title="Skill Gap Analysis Failed"
                        message={error}
                        onRetry={() => setError("")}
                    />

                )}
            </div>

            {!result ? (

                <EmptyState
                    icon="🎯"
                    title="No Skill Gap Analysis Yet"
                    description="Analyze your skills to discover missing technologies and receive an AI-powered learning roadmap."
                />

            ) : (

                <>

                    <h2>🎯 Skill Match</h2>

                    <div className="summary-cards">

                        <div className="summary-card">

                            <div className="summary-icon">🎯</div>

                            <h2>{result.matchPercentage}%</h2>

                            <p>Skill Match</p>

                        </div>

                        <div className="summary-card">

                            <div className="summary-icon">🧠</div>

                            <h2>{skills?.length || 0}</h2>

                            <p>Skills Found</p>

                        </div>

                        <div className="summary-card">

                            <div className="summary-icon">🚀</div>

                            <h2>{result.missingSkills?.length || 0}</h2>

                            <p>Missing Skills</p>

                        </div>

                    </div>

                    <section className="section">

                        <h2>📚 Missing Skills</h2>

                        <div className="missing-skills-grid">

                            {result.missingSkills?.map((skill, index) => (

                                <div
                                    key={index}
                                    className="skill-card"
                                >

                                    <div className="skill-icon">
                                        🚀
                                    </div>

                                    <h4>{skill}</h4>

                                    <span className="skill-tag">
                                        Missing
                                    </span>

                                </div>

                            ))}

                        </div>
                    </section>
                    <section className="section">
                    

                    <h2>🔥 Learning Priority</h2>

                    <div className="roadmap">

                        {result.priority?.map((item, index) => (

                            <div
                                className="roadmap-item"
                                key={index}
                            >

                                <div className="roadmap-circle">

                                    {index + 1}

                                </div>

                                <div className="roadmap-content">

                                    <h4>Phase {index + 1}</h4>

                                    <p>{item}</p>

                                </div>

                            </div>

                        ))}

                    </div>
                    </section>

                    <section className="section">

                    <h2>📖 Recommended Resources</h2>

                    <div className="resources-grid">

                        {result.resources?.map((item,index)=>(

                            <div
                                className="resource-card"
                                key={index}
                            >

                                <h3>{item.title}</h3>

                                <p>

                                    🏫 {item.platform}

                                </p>

                                <span>

                                    {item.level}

                                </span>

                            </div>

                        ))}

                    </div>
                    </section>

                    <section className="section">

                    <div className="time-card">

                        <div className="time-icon">
                            ⏳
                        </div>

                        <div>

                            <h2>Estimated Learning Time</h2>

                            <h1>{result.estimatedTime}</h1>

                            <p>
                                Based on your current skills and learning roadmap.
                            </p>

                        </div>

                    </div>
                    </section>

                    <section className="section">

                    <div className="advice-card">

                        <div className="advice-header">

                            🤖 AI Recommendation

                        </div>

                        <p>

                            {result.advice}

                        </p>

                    </div>
                    </section>

                </>

            )}

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

        </div>

    );

}

export default SkillGap;
