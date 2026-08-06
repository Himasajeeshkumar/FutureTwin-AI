import { useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { skillList } from "../data/skills";
import { parseResume } from "../utils/parser/resumeParser";
import { useResume } from "../context/ResumeContext";
import { useResumeAnalysis } from "../hooks/useResumeAnalysis";
import "./ResumeUpload.css";
import SectionScores from "./SectionScores";
import { downloadReport } from "../utils/pdf/downloadReport";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import EmptyState from "./ui/EmptyState";
import Toast from "../components/ui/Toast";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
function ResumeUpload({ setSkills, setResumeText, setParsedResume }) {
    const {
      setAnalysis
  } = useResume();

  const [uploaded, setUploaded] = useState(false);
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [detectedSkills, setDetectedSkills] = useState([]);
  const [ats, setAts] = useState({});
  const [aiResult, setAiResult] = useState(null);
  const atsRef = useRef(null);
  const reviewRef = useRef(null);
  const strengthsRef = useRef(null);
  const careerRef = useRef(null);
  const missingSkillsRef = useRef(null);

  const scrollToSection = (ref) => {

        if (!ref.current) return;

        ref.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        ref.current.classList.add("section-highlight");

        setTimeout(() => {

            ref.current.classList.remove("section-highlight");

        }, 1000);

    };
  const {

      analyze,

      loading

  } = useResumeAnalysis();


  const handleUpload = async (event) => {
    try{
      setUploaded(false);

      const file = event.target.files[0];
      if (!file) return;

      if (file.type !== "application/pdf") {
        showToast(
            "warning",
            "Please upload your resume first."
        );
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showToast(
            "warning",
            "Maximum file size is 5 MB."
        );
        return;
      }

      const arrayBuffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer
      }).promise;

      const extractedSkills = [];
      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {

        const page = await pdf.getPage(i);

        const content = await page.getTextContent();

        text += content.items
          .map(item => item.str)
          .join(" ");
      }

      const originalText = text;
      text = text.toLowerCase();
      setResumeText(originalText);
      setParsedResume(
      parseResume(originalText)
      );
      const data = await analyze(text);
      console.log("SERVER RESPONSE:");
      console.log(data);

      const ai = data;

      console.log("AI RESPONSE:");
      console.log(ai);
      console.log("AI RESPONSE");
      console.log(JSON.stringify(ai, null, 2));

      setAiResult(ai);
      console.log("AI RESULT:", ai);
    console.log("Parsed Resume:", ai.parsedResume);
    console.log("Weaknesses:", ai.parsedResume?.weaknesses);
    console.log("Missing Skills:", ai.parsedResume?.missingSkills);
      setAnalysis(ai);
      if (ai.parsedResume) {
        setParsedResume(ai.parsedResume);
      }

      skillList.forEach(skill => {

        if (text.includes(skill)) {

          extractedSkills.push(
            skill
              .split(" ")
              .map(
                word =>
                  word.charAt(0).toUpperCase() +
                  word.slice(1)
              )
              .join(" ")
          );

        }

      });

      const analysisResult = {
        education:
          text.includes("b.tech") ||
          text.includes("bachelor") ||
          text.includes("university"),

        projects:
          text.includes("project"),

        experience:
          text.includes("experience") ||
          text.includes("intern"),

        certifications:
          ai?.parsedResume?.certifications?.length > 0,

        github:
          text.includes("github"),

        linkedin:
          text.includes("linkedin"),

        email:
          text.includes("@"),

        phone:
          /\d{10}/.test(text)

      };

      const atsResult = {

      skills:
        Math.min(extractedSkills.length * 20, 100),

      projects:
        analysisResult.projects ? 100 : 20,

      experience:
        analysisResult.experience ? 100 : 20,

      certifications:
        analysisResult.certifications ? 100 : 20,

      profile:

        (
          (analysisResult.github ? 50 : 0) +

          (analysisResult.linkedin ? 50 : 0)

        )

      };
      

      setSkills(extractedSkills);
      setDetectedSkills(extractedSkills);

      setAts(atsResult);

      let resumeScore = extractedSkills.length * 15;

      if (resumeScore > 100) {
        resumeScore = 100;
      }
      const aiSuggestions = [];

      if (!text.includes("github"))
        aiSuggestions.push("Add GitHub Profile");

      if (!text.includes("intern"))
        aiSuggestions.push("Add Internship Experience");

      if (!text.includes("certificate"))
        aiSuggestions.push("Add Certifications");

      if (!text.includes("project"))
        aiSuggestions.push("Improve Project Descriptions");

      setScore(resumeScore);

      setSuggestions(aiSuggestions);

      setUploaded(true);
    } catch (error) {
      console.log(error);
      showToast(
          "error",
          "Unable to analyze resume."
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
            message="FutureTwin AI is analyzing your resume..."
        />
    );
}

    return (
      <div className="resume-upload" id="resume">

        <div className="resume-hero">

          <div>

            <h1>🤖 AI Resume Analysis</h1>

            <p>
              Upload your resume and receive AI-powered insights,
              ATS evaluation, skill analysis, strengths, weaknesses,
              and personalized career recommendations.
            </p>

          </div>

        </div>

        <div className="upload-grid">

          <div className="upload-card">

              <h2>📄 Upload Resume</h2>

              <p>
                  Upload your latest resume in PDF format.
                  Our AI will analyze it in a few seconds.
              </p>

              <div className="upload-icon">
                  📄
              </div>

              <label className="upload-resume-btn">

                  Choose Resume

                  <input
                      type="file"
                      accept=".pdf"
                      onChange={handleUpload}
                      hidden
                  />

              </label>

          </div>

          <div className="upload-info-card">

              <h2>✨ What You'll Get</h2>

              <div
                  className="feature-item"
                  onClick={() => scrollToSection(atsRef)}
              >

                  ✅ ATS Compatibility Score

              </div>

              <div
                  className="feature-item"
                  onClick={() => scrollToSection(reviewRef)}
              >

                  🧠 AI Resume Review

              </div>

              <div
                  className="feature-item"
                  onClick={() => scrollToSection(strengthsRef)}
              >
                  💪 Strengths & Weaknesses
              </div>

              <div
                  className="feature-item"
                  onClick={() => scrollToSection(careerRef)}
              >
                  📈 Career Recommendation
              </div>

              <div
                  className="feature-item"
                  onClick={() => scrollToSection(missingSkillsRef)}
              >
                  🎯 Missing Skills Detection
              </div>

          </div>

      </div>
            {!uploaded && (
                <EmptyState
                    icon="📄"
                    title="No Resume Uploaded"
                    description="Upload your resume to receive ATS analysis, AI feedback, skill detection, and personalized career recommendations."
                />
            )}

        {uploaded && (

          <div className="resume-result">
            <div className="analysis-success">

            <div>
            <div className="download-report-container">

                <button
                    className="download-report-btn"
                    onClick={() => downloadReport(aiResult)}
                >
                    📥 Download AI Report
                </button>

            </div>

                  <h2>✅ Analysis Complete</h2>

                  <p>
                      Your resume has been successfully analyzed by FutureTwin AI.
                  </p>

              </div>

          </div>

          <div
              className="analysis-stats top-row"
              ref={atsRef}
          >

              <div className="stat-card">

                  <div className="stat-icon">📄</div>

                  <span>Resume Score</span>

                  <h1>{aiResult?.resumeScore ?? score}%</h1>

              </div>

              <div className="stat-card">

                <div className="stat-icon">🎯</div>

                  <span>ATS Score</span>

                  <h1>
                      {aiResult?.atsScore ?? ats.skills}%
                  </h1>

              </div>

              <div className="stat-card">

                <div className="stat-icon">🧠</div>

                <span>Skills Found</span>

                <h1>
                    {
                    aiResult?.parsedResume?.skills
                        ? aiResult.parsedResume.skills.reduce(
                            (total, category) => total + category.items.length,
                            0
                        )
                        : detectedSkills.length
                }
                </h1>
              </div>
              <div className="stat-card">

                  <div className="stat-icon">👨‍💼</div>

                  <span>Recruiter Score</span>

                  <h1>
                      {aiResult?.recruiterScore ?? "--"}%
                  </h1>

              </div>

              <div className="stat-card">

                  <div className="stat-icon">🚀</div>

                  <span>Interview Ready</span>

                  <h1>
                      {aiResult?.interviewReadiness ?? "--"}%
                  </h1>

              </div>

            </div>
            <div
                className="analysis-card"
                ref={reviewRef}
            >

                <h3>👨‍💼 Recruiter Verdict</h3>

                <h2>{aiResult?.verdict}</h2>

                <p>

                    This evaluation combines ATS compatibility,
                    resume quality, internships, projects,
                    certifications, and technical skills.

                </p>

            </div>

            <div className="analysis-card">

              <h3>🛠 Detected Skills</h3>

              <div className="skill-grid">

                  {(aiResult?.parsedResume?.skills || []).flatMap(category => category.items).map((skill, index) => (
                    <span key={index} className="skill-badge">
                        {skill}
                    </span>
                    ))}

              </div>

          </div>

            <SectionScores
              sectionScores={aiResult?.sectionScores}
          />

          <div className="analysis-card">

            <h3>💡 AI Suggestions</h3>

            {(aiResult?.suggestions || suggestions).length > 0 ? (

                <ul className="analysis-list">

                    {(aiResult?.suggestions || suggestions).map((item,index)=>(

                        <li key={index}>
                            💡 {item}
                        </li>

                    ))}

                </ul>

            ) : (

                <p className="empty-message">
                    ✅ No suggestions. Your resume looks great!
                </p>

            )}

        </div>

          <div
              className="strength-weakness-grid"
              ref={strengthsRef}
          >

              <div className="analysis-card">

                  <h3>💪 Strengths</h3>

                  {aiResult?.parsedResume?.strengths?.length > 0 ? (

                    <ul className="analysis-list">

                        {aiResult.parsedResume.strengths.map((item,index)=>(

                            <li key={index}>
                                ✅ {item}
                            </li>

                        ))}

                    </ul>

                ) : (

                    <p className="empty-message">
                        No strengths detected.
                    </p>

                )}

              </div>

              <div className="analysis-card">

                  <h3>⚠ Weaknesses</h3>

                  {aiResult?.parsedResume?.weaknesses?.length > 0 ? (

                    <ul className="analysis-list">

                        {aiResult.parsedResume.weaknesses.map((item,index)=>(

                            <li key={index}>
                                ❌ {item}
                            </li>

                        ))}

                    </ul>

                ) : (

                    <p className="empty-message">
                        🎉 No weaknesses detected.
                    </p>

                )}

              </div>

          </div>

            <div
                className="analysis-card"
                ref={missingSkillsRef}
            >


              <h3>🎯 Missing Skills</h3>

              {aiResult?.parsedResume?.missingSkills?.length > 0 ? (

                  <div className="skill-grid">

                      {aiResult.parsedResume.missingSkills.map((item, index) => (

                          <span
                              key={index}
                              className="missing-skill-badge"
                          >
                              {item}
                          </span>

                      ))}

                  </div>

              ) : (

                  <p>No missing skills detected. 🎉</p>

              )}

          </div>

            <div
                className="career-card"
                ref={careerRef}
            >

                <h3>🎯 AI Career Recommendation</h3>

                <p>

                    {aiResult?.parsedResume?.careerRecommendation}

                </p>

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

export default ResumeUpload;