import { useState } from "react";
import "./FutureSimulator.css";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import Toast from "../components/ui/Toast";
import ErrorCard from "../components/ui/ErrorCard";

function FutureSimulator({

    skills,
    selectedCareer

}){

    const [result, setResult] = useState(null);
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


        try {

            setLoading(true);
            setError("");
            setResult(null);
            const token = localStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/simulator`, {

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

            if (!response.ok) {

                setError(
                    data.error || "Future simulation failed."
                );

                showToast(
                    "error",
                    data.error || "Future simulation failed."
                );

                return;

            }

            console.log("Simulator Response:", response.status);
            console.log("Simulator Data:", data);

            setResult(data);
            showToast(
                "success",
                "Future simulation completed successfully."
            );

        }

        catch (error) {

            console.log(error);

            setError("Unable to simulate future.");

            showToast(
                "error",
                "Unable to simulate future."
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

    return(

        

        <div className="future-simulator">

            <h1 className="section-title">

                Future Simulator

            </h1>

            <p className="future-subtitle">
            Predict your career growth, expected salary, learning roadmap,
            and AI-powered recommendations based on your current skills.
            </p>

            <div className="future-button-container">
                <button
                    onClick={simulateFuture}
            
                >
                    {loading ? "Simulating..." : "🚀 Simulate My Future"}
                </button>
            </div>
            <div className="future-card">

              <h2>{selectedCareer}</h2>

              {result && (

              <div className="future-summary-grid">

                <div className="future-summary-card">

                    <div className="future-icon">🎯</div>

                    <h4>Success</h4>

                    <h2>{result?.successProbability ?? "--"}%</h2>

                </div>

                <div className="future-summary-card">

                    <div className="future-icon">💰</div>

                    <h4>Salary</h4>

                    <h2>{result?.salary ?? "--"}</h2>

                </div>

                <div className="future-summary-card">

                    <div className="future-icon">⏳</div>

                    <h4>Timeline</h4>

                    <h2>{result?.timeline ?? "--"}</h2>

                </div>

                <div className="future-summary-card">

                    <div className="future-icon">🎤</div>

                    <h4>Interview</h4>

                    <h2>{result?.interviewReadiness ?? "--"}</h2>

                </div>

            </div>

              )}

        {!result ? (
            <>
            {error && (

                <ErrorCard
                    title="Future Simulation Failed"
                    message={error}
                    onRetry={() => setError("")}
                />

            )}

            <EmptyState
                icon="🚀"
                title="Future Simulation Not Started"
                description="Click 'Simulate My Future' to predict your career growth, salary, and learning roadmap."
            />
        </>

        ) : (

            <>

                <div className="future-section">

                    <h3>📚 Missing Skills</h3>

                    <div className="future-list">

                    {result.missingSkills?.map((skill,index)=>(

                    <div
                    className="future-item"
                    key={index}
                    >

                    ❌ {skill}

                    </div>

                    ))}

                    </div>

                    </div>

                

                <div className="future-section">

                <h3>🚀 Recommended Projects</h3>

                <div className="future-list">

                {result.recommendedProjects?.map((project,index)=>(

                <div
                className="future-item"
                key={index}
                >

                💻 {project}

                </div>

                ))}

                </div>

                </div>

                <div className="future-section">

                <h3>🛣️ Learning Roadmap</h3>

                <div className="future-roadmap">

                {result.roadmap?.map((step,index)=>(

                <div
                className="roadmap-step"
                key={index}
                >

                <div className="step-number">

                {index+1}

                </div>

                <div className="step-content">

                {step}

                </div>

                </div>

                ))}

                </div>

                </div>

                <div className="ai-advice">

                <h3>🤖 FutureTwin AI Advice</h3>

                <p>{result.advice}</p>

                </div>

                </>

                )}

            </div>

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

export default FutureSimulator;