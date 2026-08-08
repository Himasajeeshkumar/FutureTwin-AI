import { useState } from "react";

import "./FutureSimulator.css";

import {
    AlertCircle,
    Bot,
    BriefcaseBusiness,
    Clock3,
    DollarSign,
    GraduationCap,
    Map,
    Rocket,
    Target,
    Mic
} from "lucide-react";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import Toast from "../components/ui/Toast";
import ErrorCard from "../components/ui/ErrorCard";

import { useResume } from "../context/ResumeContext";


function FutureSimulator({
    skills,
    selectedCareer
}) {

    const {
        futureSimulation,
        setFutureSimulation
    } = useResume();


    const result = futureSimulation;


    const [loading, setLoading] = useState(false);


    const [error, setError] = useState("");


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


    const simulateFuture = async () => {

        setError("");


        if (!skills || skills.length === 0) {

            showToast(
                "warning",
                "Please upload and analyze your resume first."
            );

            return;
        }


        try {

            setLoading(true);


            setFutureSimulation(null);


            const token =
                localStorage.getItem("token");


            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/simulator`,
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


            if (!response.ok) {

                const message =
                    data.error ||
                    "Future simulation failed.";


                setError(message);


                showToast(
                    "error",
                    message
                );


                return;
            }


            console.log(
                "Simulator Response:",
                response.status
            );


            console.log(
                "Simulator Data:",
                data
            );


            setFutureSimulation(data);


            showToast(
                "success",
                "Future simulation completed successfully."
            );

        }
        catch (error) {

            console.error(error);


            const message =
                "Unable to simulate future.";


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
                message="FutureTwin AI is simulating your future career..."
            />
        );

    }


    return (

        <main className="future-simulator">

            {/* Header */}

            <header className="future-header">

                <h1 className="section-title">
                    Future Simulator
                </h1>


                <p className="future-subtitle">

                    Predict your career growth,
                    expected salary, learning roadmap,
                    and AI-powered recommendations
                    based on your current skills.

                </p>

            </header>


            {/* Simulation Button */}

            <div className="future-button-container">

                <button
                    type="button"
                    onClick={simulateFuture}
                    disabled={loading}
                >

                    <Rocket
                        size={18}
                        strokeWidth={2}
                    />

                    {loading
                        ? "Simulating..."
                        : "Simulate My Future"
                    }

                </button>

            </div>


            {/* Main Card */}

            <section className="future-card">

                <div className="future-career-header">

                    <BriefcaseBusiness
                        size={24}
                        strokeWidth={2}
                    />

                    <h2>
                        {selectedCareer}
                    </h2>

                </div>


                {/* Summary */}

                {result && (

                    <div className="future-summary-grid">

                        {/* Success */}

                        <div className="future-summary-card">

                            <div className="future-icon">

                                <Target
                                    size={28}
                                    strokeWidth={1.8}
                                />

                            </div>


                            <h4>
                                Success
                            </h4>


                            <h2>
                                {result?.successProbability ?? "--"}%
                            </h2>

                        </div>


                        {/* Salary */}

                        <div className="future-summary-card">

                            <div className="future-icon">

                                <DollarSign
                                    size={28}
                                    strokeWidth={1.8}
                                />

                            </div>


                            <h4>
                                Salary
                            </h4>


                            <h2>
                                {result?.salary ?? "--"}
                            </h2>

                        </div>


                        {/* Timeline */}

                        <div className="future-summary-card">

                            <div className="future-icon">

                                <Clock3
                                    size={28}
                                    strokeWidth={1.8}
                                />

                            </div>


                            <h4>
                                Timeline
                            </h4>


                            <h2>
                                {result?.timeline ?? "--"}
                            </h2>

                        </div>


                        {/* Interview */}

                        <div className="future-summary-card">

                            <div className="future-icon">

                                <Mic
                                    size={28}
                                    strokeWidth={1.8}
                                />

                            </div>


                            <h4>
                                Interview
                            </h4>


                            <h2>
                                {result?.interviewReadiness ?? "--"}
                            </h2>

                        </div>

                    </div>

                )}


                {/* Empty State */}

                {!result ? (

                    <div className="future-empty-state">

                        {error && (

                            <ErrorCard
                                title="Future Simulation Failed"
                                message={error}
                                onRetry={() => setError("")}
                            />

                        )}


                        {!error && (

                            <EmptyState
                                icon={
                                    <Rocket
                                        size={42}
                                        strokeWidth={1.8}
                                    />
                                }
                                title="Future Simulation Not Started"
                                description="Click 'Simulate My Future' to predict your career growth, salary, and learning roadmap."
                            />

                        )}

                    </div>

                ) : (

                    <>

                        {/* Missing Skills */}

                        <section className="future-section">

                            <div className="future-section-heading">

                                <GraduationCap
                                    size={22}
                                    strokeWidth={2}
                                />

                                <div>

                                    <h3>
                                        Missing Skills
                                    </h3>

                                    <p>
                                        Skills that can improve your
                                        readiness for this career.
                                    </p>

                                </div>

                            </div>


                            <div className="future-list">

                                {result.missingSkills?.map(
                                    (skill, index) => (

                                        <div
                                            className="future-item"
                                            key={index}
                                        >

                                            <AlertCircle
                                                size={19}
                                                strokeWidth={2}
                                            />

                                            <span>
                                                {skill}
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        </section>


                        {/* Recommended Projects */}

                        <section className="future-section">

                            <div className="future-section-heading">

                                <Rocket
                                    size={22}
                                    strokeWidth={2}
                                />

                                <div>

                                    <h3>
                                        Recommended Projects
                                    </h3>

                                    <p>
                                        Projects that can strengthen
                                        your practical experience.
                                    </p>

                                </div>

                            </div>


                            <div className="future-list">

                                {result.recommendedProjects?.map(
                                    (project, index) => (

                                        <div
                                            className="future-item"
                                            key={index}
                                        >

                                            <BriefcaseBusiness
                                                size={19}
                                                strokeWidth={2}
                                            />

                                            <span>
                                                {project}
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        </section>


                        {/* Learning Roadmap */}

                        <section className="future-section">

                            <div className="future-section-heading">

                                <Map
                                    size={22}
                                    strokeWidth={2}
                                />

                                <div>

                                    <h3>
                                        Learning Roadmap
                                    </h3>

                                    <p>
                                        A step-by-step path for your
                                        career development.
                                    </p>

                                </div>

                            </div>


                            <div className="future-roadmap">

                                {result.roadmap?.map(
                                    (step, index) => (

                                        <div
                                            className="roadmap-step"
                                            key={index}
                                        >

                                            <div className="step-number">

                                                {index + 1}

                                            </div>


                                            <div className="step-content">

                                                <span className="step-label">

                                                    Phase {index + 1}

                                                </span>

                                                <p>
                                                    {step}
                                                </p>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </section>


                        {/* AI Advice */}

                        <section className="ai-advice">

                            <div className="ai-advice-header">

                                <Bot
                                    size={23}
                                    strokeWidth={2}
                                />

                                <h3>
                                    FutureTwin AI Advice
                                </h3>

                            </div>


                            <p>
                                {result.advice}
                            </p>

                        </section>

                    </>

                )}

            </section>


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


export default FutureSimulator;