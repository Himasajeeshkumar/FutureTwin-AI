import { useState } from "react";
import { useJobMatch } from "../hooks/useJobMatch";
import { generateJobMatchPDF } from "../utils/pdf/jobMatchReport";
import "./JobMatch.css";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import Toast from "../components/ui/Toast";
import ErrorCard from "../components/ui/ErrorCard";

function JobMatch({resumeText}) {
  const {analyze, loading} = useJobMatch();

  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const analyzeMatch = async () => {

      if (loading) return;

      setResult(null);

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

          const ai = await analyze(

              resumeText,

              jobDescription

          );

          setResult(ai);
          setError("");

          showToast(
                "success",
                "Job Match analysis completed successfully."
            );

      }

      catch (error) {

            console.error(error);

            setError(
                error.message || "Unable to analyze the job match."
            );

            showToast(
                "error",
                error.message || "Job Match failed."
            );

        }

  };
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

  if (loading) {
        return (
            <LoadingSpinner
                message="Finding the best match between your resume and the job description..."
            />
        );
    }
  return (

    <div className="job-match">

      <div className="job-match-hero">

          <h1>💼 AI Resume vs Job Match</h1>

          <p>

              Compare your resume with any job description,
              discover missing skills, and receive AI-powered
              recommendations to improve your hiring chances.

          </p>

      </div>
      {resumeText ? (

    <p style={{ color: "limegreen" }}>
        ✅ Resume Ready
    </p>

) : (

    <EmptyState
        icon="📄"
        title="No Resume Uploaded"
        description="Upload your resume first to compare it with a job description."
    />

)}
      <textarea
        placeholder="Paste Job Description Here..."
        rows="12"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <br />
      

      <button
        onClick={analyzeMatch}
        className="primary-btn"
    >
        Analyze Match
    </button>
    {error && (

        <ErrorCard
            title="Job Match Failed"
            message={error}
            onRetry={() => setError("")}
        />

    )}  
    {!result && resumeText && (

        <EmptyState
            icon="💼"
            title="No Job Match Yet"
            description="Paste a job description and click Analyze Match to compare it with your resume."
        />

    )}
      {result && (

      <div className="resume-result">
      <h2>

      {result.overallVerdict}

      </h2>

      <div className="match-progress">

        <h3>Overall Match</h3>

        <div className="progress-bar">

            <div
                className="progress-fill"
                style={{ width: `${result.matchScore}%` }}
            ></div>

        </div>

        <p>{result.matchScore}% Match</p>

      </div>
      <p>

      Matching Skills:

      {result.matchingSkills.length}

      </p>

      <p>

      Missing Skills:

      {result.missingSkills.length}

      </p>

      <hr />

      <h3>✅ Matching Skills</h3>

      <div className="skills-grid">

      {result.matchingSkills.map((skill,index)=>(

      <div
      className="skill-badge success"
      key={index}
      >

      {skill}

      </div>

      ))}

      </div>

      <hr />

      <h3>❌ Missing Skills</h3>

      <div className="skills-grid">

      {result.missingSkills.map((skill,index)=>(

      <div
      className="skill-badge danger"
      key={index}
      >

      {skill}

      </div>

      ))}

      </div>

      <hr />

      <div className="section-spacing">

        <div className="section-title">

            <h2>💡 AI Recommendations</h2>

            <p>
                Personalized suggestions to improve your chances of getting shortlisted.
            </p>

        </div>

        <div className="recommendation-grid">

            {result.suggestions.map((item,index)=>(

                <div
                    className="recommendation-card"
                    key={index}
                >

                    <div className="recommendation-icon">

                        🚀

                    </div>

                    <p>{item}</p>

                </div>

            ))}

        </div>

    </div>

      <hr />

      <div className="section-spacing">

        <div className="section-title">

            <h2>🎯 Hiring Prediction</h2>

            <p>
                Based on your resume and the job requirements.
            </p>

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

                {result.hiringChance === "High"
                    ? "🟢"
                    : result.hiringChance === "Medium"
                    ? "🟡"
                    : "🔴"}

            </div>

            <h2>{result.hiringChance}</h2>

            <p>

                {result.hiringChance === "High"
                    ? "Your profile is highly aligned with this role."
                    : result.hiringChance === "Medium"
                    ? "A few improvements could significantly increase your chances."
                    : "Consider strengthening the missing skills before applying."}

            </p>

        </div>

    </div>
      <br />

      <div className="download-section">

            <button
                className="download-btn"
                onClick={() => generateJobMatchPDF(result)}
            >

                📄 Download AI Report

            </button>

        </div>

      </div>
      

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

export default JobMatch;