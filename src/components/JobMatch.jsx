import { useState } from "react";

import {
    AlertCircle,
    BriefcaseBusiness,
    CheckCircle2,
    Download,
    FileText,
    Lightbulb,
    Target,
    TrendingUp,
    XCircle
} from "lucide-react";

import { useJobMatch } from "../hooks/useJobMatch";
import { generateJobMatchPDF } from "../utils/pdf/jobMatchReport";

import "./JobMatch.css";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import Toast from "../components/ui/Toast";
import ErrorCard from "../components/ui/ErrorCard";

import { useResume } from "../context/ResumeContext";


function JobMatch({ resumeText }) {

    const {
        analyze,
        loading
    } = useJobMatch();


    const {
        jobMatch,
        setJobMatch
    } = useResume();


    const [jobDescription, setJobDescription] =
        useState("");


    const [error, setError] =
        useState("");


    const [toast, setToast] = useState({
        show: false,
        type: "success",
        message: ""
    });


    const result = jobMatch;


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


    const analyzeMatch = async () => {

        if (loading) return;


        setError("");


        if (!resumeText) {

            showToast(
                "warning",
                "Please upload your resume first."
            );

            return;
        }


        if (!jobDescription.trim()) {

            showToast(
                "warning",
                "Please paste a job description."
            );

            return;
        }


        try {

            setJobMatch(null);


            const ai = await analyze(
                resumeText,
                jobDescription
            );


            setJobMatch(ai);


            showToast(
                "success",
                "Job Match analysis completed successfully."
            );

        }
        catch (error) {

            console.error(error);


            const message =
                error.message ||
                "Unable to analyze the job match.";


            setError(message);


            showToast(
                "error",
                message
            );

        }

    };


    if (loading) {

        return (
            <LoadingSpinner
                message="FutureTwin AI is comparing your resume with the job description..."
            />
        );

    }


    return (

        <main className="job-match">

            {/* Hero */}

            <header className="job-match-hero">

                <div className="job-match-hero-icon">

                    <BriefcaseBusiness
                        size={32}
                        strokeWidth={1.8}
                    />

                </div>


                <h1>
                    AI Resume vs Job Match
                </h1>


                <p>

                    Compare your resume with any job
                    description, discover missing skills,
                    and receive AI-powered recommendations
                    to improve your hiring chances.

                </p>

            </header>


            {/* Resume Status */}

            <div className="resume-status">

                {resumeText ? (

                    <span className="resume-ready">

                        <CheckCircle2
                            size={18}
                        />

                        Resume Ready

                    </span>

                ) : (

                    <EmptyState
                        icon={
                            <FileText
                                size={40}
                                strokeWidth={1.8}
                            />
                        }
                        title="No Resume Uploaded"
                        description="Upload your resume first to compare it with a job description."
                    />

                )}

            </div>


            {/* Job Description Input */}

            <section className="job-input-card">

                <div className="input-header">

                    <Target
                        size={21}
                    />

                    <div>

                        <h2>
                            Job Description
                        </h2>

                        <p>
                            Paste the job description you want
                            to compare against your resume.
                        </p>

                    </div>

                </div>


                <textarea
                    placeholder="Paste Job Description Here..."
                    rows="12"
                    value={jobDescription}
                    onChange={(e) =>
                        setJobDescription(
                            e.target.value
                        )
                    }
                />


                <button
                    type="button"
                    onClick={analyzeMatch}
                    className="primary-btn"
                    disabled={loading}
                >

                    <Target
                        size={18}
                    />

                    Analyze Match

                </button>

            </section>


            {/* Error */}

            {error && (

                <ErrorCard
                    title="Job Match Failed"
                    message={error}
                    onRetry={() => setError("")}
                />

            )}


            {/* Empty Result */}

            {!result && resumeText && (

                <EmptyState
                    icon={
                        <BriefcaseBusiness
                            size={40}
                            strokeWidth={1.8}
                        />
                    }
                    title="No Job Match Yet"
                    description="Paste a job description and click Analyze Match to compare it with your resume."
                />

            )}


            {/* Result */}

            {result && (

                <section className="resume-result">

                    {/* Verdict */}

                    <div className="result-verdict">

                        <div className="result-verdict-icon">

                            <TrendingUp
                                size={26}
                            />

                        </div>

                        <div>

                            <span>
                                AI Verdict
                            </span>

                            <h2>
                                {result.overallVerdict}
                            </h2>

                        </div>

                    </div>


                    {/* Match Score */}

                    <div className="match-progress">

                        <div className="section-heading">

                            <Target
                                size={21}
                            />

                            <h3>
                                Overall Match
                            </h3>

                        </div>


                        <div className="progress-bar">

                            <div
                                className="progress-fill"
                                style={{
                                    width:
                                        `${result.matchScore}%`
                                }}
                            />

                        </div>


                        <div className="match-score-row">

                            <span>
                                Resume compatibility
                            </span>

                            <strong>
                                {result.matchScore}%
                            </strong>

                        </div>

                    </div>


                    {/* Skill Counts */}

                    <div className="match-stats">

                        <div className="match-stat">

                            <CheckCircle2
                                size={20}
                            />

                            <div>

                                <strong>
                                    {result.matchingSkills?.length || 0}
                                </strong>

                                <span>
                                    Matching Skills
                                </span>

                            </div>

                        </div>


                        <div className="match-stat">

                            <XCircle
                                size={20}
                            />

                            <div>

                                <strong>
                                    {result.missingSkills?.length || 0}
                                </strong>

                                <span>
                                    Missing Skills
                                </span>

                            </div>

                        </div>

                    </div>


                    <hr />


                    {/* Matching Skills */}

                    <section className="result-section">

                        <div className="section-heading">

                            <CheckCircle2
                                size={21}
                            />

                            <h3>
                                Matching Skills
                            </h3>

                        </div>


                        <div className="skills-grid">

                            {result.matchingSkills?.map(
                                (skill, index) => (

                                    <div
                                        className="skill-badge success"
                                        key={index}
                                    >

                                        <CheckCircle2
                                            size={15}
                                        />

                                        {skill}

                                    </div>

                                )
                            )}

                        </div>

                    </section>


                    <hr />


                    {/* Missing Skills */}

                    <section className="result-section">

                        <div className="section-heading">

                            <AlertCircle
                                size={21}
                            />

                            <h3>
                                Missing Skills
                            </h3>

                        </div>


                        <div className="skills-grid">

                            {result.missingSkills?.map(
                                (skill, index) => (

                                    <div
                                        className="skill-badge danger"
                                        key={index}
                                    >

                                        <XCircle
                                            size={15}
                                        />

                                        {skill}

                                    </div>

                                )
                            )}

                        </div>

                    </section>


                    <hr />


                    {/* Recommendations */}

                    <section className="section-spacing">

                        <div className="section-title">

                            <div className="section-title-icon">

                                <Lightbulb
                                    size={22}
                                />

                            </div>

                            <div>

                                <h2>
                                    AI Recommendations
                                </h2>

                                <p>
                                    Personalized suggestions
                                    to improve your chances
                                    of getting shortlisted.
                                </p>

                            </div>

                        </div>


                        <div className="recommendation-grid">

                            {result.suggestions?.map(
                                (item, index) => (

                                    <div
                                        className="recommendation-card"
                                        key={index}
                                    >

                                        <div className="recommendation-icon">

                                            <TrendingUp
                                                size={21}
                                            />

                                        </div>

                                        <p>
                                            {item}
                                        </p>

                                    </div>

                                )
                            )}

                        </div>

                    </section>


                    <hr />


                    {/* Hiring Prediction */}

                    <section className="section-spacing">

                        <div className="section-title">

                            <div className="section-title-icon">

                                <BriefcaseBusiness
                                    size={22}
                                />

                            </div>

                            <div>

                                <h2>
                                    Hiring Prediction
                                </h2>

                                <p>
                                    Based on your resume
                                    and the job requirements.
                                </p>

                            </div>

                        </div>


                        <div
                            className={`hiring-card ${
                                result.hiringChance === "High"
                                    ? "high"
                                    : result.hiringChance === "Medium"
                                    ? "medium"
                                    : "low"
                            }`}
                        >

                            <div className="hiring-icon">

                                {result.hiringChance === "High" ? (

                                    <CheckCircle2
                                        size={42}
                                    />

                                ) : result.hiringChance === "Medium" ? (

                                    <AlertCircle
                                        size={42}
                                    />

                                ) : (

                                    <XCircle
                                        size={42}
                                    />

                                )}

                            </div>


                            <h2>
                                {result.hiringChance}
                            </h2>


                            <p>

                                {result.hiringChance === "High"
                                    ? "Your profile is highly aligned with this role."
                                    : result.hiringChance === "Medium"
                                    ? "A few improvements could significantly increase your chances."
                                    : "Consider strengthening the missing skills before applying."
                                }

                            </p>

                        </div>

                    </section>


                    {/* Download */}

                    <div className="download-section">

                        <button
                            type="button"
                            className="download-btn"
                            onClick={() =>
                                generateJobMatchPDF(result)
                            }
                        >

                            <Download
                                size={19}
                            />

                            Download AI Report

                        </button>

                    </div>

                </section>

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


export default JobMatch;