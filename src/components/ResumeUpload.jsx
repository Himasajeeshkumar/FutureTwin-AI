import { useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

import {
    Brain,
    FileText,
    Sparkles,
    CheckCircle2,
    Target,
    TrendingUp,
    BriefcaseBusiness,
    Rocket,
    Download,
    Lightbulb,
    Dumbbell,
    AlertTriangle,
    XCircle
} from "lucide-react";

import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

import { skillList } from "../data/skills";
import { parseResume } from "../utils/parser/resumeParser";
import { useResume } from "../context/ResumeContext";
import { useResumeAnalysis } from "../hooks/useResumeAnalysis";

import "./ResumeUpload.css";

import SectionScores from "./SectionScores";
import { downloadReport } from "../utils/pdf/downloadReport";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "./ui/EmptyState";
import Toast from "../components/ui/Toast";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function ResumeUpload({
    setSkills,
    setResumeText,
    setParsedResume
}) {

    const {
        analysis,
        setAnalysis
    } = useResume();

    const [uploaded, setUploaded] = useState(!!analysis);

    const [score, setScore] = useState(0);

    const [suggestions, setSuggestions] = useState([]);

    const [detectedSkills, setDetectedSkills] = useState([]);

    const [ats, setAts] = useState({});

    const [aiResult, setAiResult] = useState(analysis);

    const [toast, setToast] = useState({
        show: false,
        type: "success",
        message: ""
    });

    const atsRef = useRef(null);
    const reviewRef = useRef(null);
    const strengthsRef = useRef(null);
    const careerRef = useRef(null);
    const missingSkillsRef = useRef(null);

    const {
        analyze,
        loading
    } = useResumeAnalysis();


    // =========================================
    // Toast
    // =========================================

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


    // =========================================
    // Scroll To Section
    // =========================================

    const scrollToSection = (ref) => {

        if (!ref.current) return;

        ref.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        ref.current.classList.add(
            "section-highlight"
        );

        setTimeout(() => {

            if (ref.current) {
                ref.current.classList.remove(
                    "section-highlight"
                );
            }

        }, 1000);
    };


    // =========================================
    // Resume Upload
    // =========================================

    const handleUpload = async (event) => {

        try {

            const file = event.target.files?.[0];

            if (!file) return;


            setUploaded(false);


            // -------------------------------------
            // File Validation
            // -------------------------------------

            if (file.type !== "application/pdf") {

                showToast(
                    "warning",
                    "Please upload a PDF resume."
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


            // -------------------------------------
            // Read PDF
            // -------------------------------------

            const arrayBuffer =
                await file.arrayBuffer();


            const pdf =
                await pdfjsLib
                    .getDocument({
                        data: arrayBuffer
                    })
                    .promise;


            let text = "";


            for (
                let pageNumber = 1;
                pageNumber <= pdf.numPages;
                pageNumber++
            ) {

                const page =
                    await pdf.getPage(
                        pageNumber
                    );


                const content =
                    await page.getTextContent();


                text += content.items
                    .map(item => item.str)
                    .join(" ");
            }


            // -------------------------------------
            // Validate Extracted Text
            // -------------------------------------

            if (!text.trim()) {

                showToast(
                    "error",
                    "Unable to extract text from this PDF."
                );

                return;
            }


            const originalText = text;

            const normalizedText =
                text.toLowerCase();


            // -------------------------------------
            // Store Resume Data
            // -------------------------------------

            setResumeText(originalText);


            setParsedResume(
                parseResume(originalText)
            );


            // -------------------------------------
            // AI Resume Analysis
            // -------------------------------------

            const data =
                await analyze(normalizedText);


            console.log(
                "SERVER RESPONSE:",
                data
            );


            const ai = data;


            console.log(
                "AI RESPONSE:",
                ai
            );


            setAiResult(ai);

            setAnalysis(ai);


            // -------------------------------------
            // AI Parsed Resume
            // -------------------------------------

            if (ai?.parsedResume) {

                setParsedResume(
                    ai.parsedResume
                );
            }


            // -------------------------------------
            // Skill Detection
            // -------------------------------------

            const extractedSkills = [];


            skillList.forEach(skill => {

                if (
                    normalizedText.includes(
                        skill.toLowerCase()
                    )
                ) {

                    const formattedSkill =
                        skill
                            .split(" ")
                            .map(word =>
                                word
                                    .charAt(0)
                                    .toUpperCase() +
                                word.slice(1)
                            )
                            .join(" ");


                    extractedSkills.push(
                        formattedSkill
                    );
                }

            });


            // -------------------------------------
            // Remove Duplicate Skills
            // -------------------------------------

            const uniqueSkills = [
                ...new Set(extractedSkills)
            ];


            setSkills(uniqueSkills);

            setDetectedSkills(
                uniqueSkills
            );


            // -------------------------------------
            // Resume Structure Analysis
            // -------------------------------------

            const analysisResult = {

                education:
                    normalizedText.includes("b.tech") ||
                    normalizedText.includes("bachelor") ||
                    normalizedText.includes("university"),

                projects:
                    normalizedText.includes("project"),

                experience:
                    normalizedText.includes("experience") ||
                    normalizedText.includes("intern"),

                certifications:
                    ai?.parsedResume?.certifications
                        ?.length > 0,

                github:
                    normalizedText.includes("github"),

                linkedin:
                    normalizedText.includes("linkedin"),

                email:
                    normalizedText.includes("@"),

                phone:
                    /\d{10}/.test(
                        normalizedText
                    )
            };


            // -------------------------------------
            // ATS Calculation
            // -------------------------------------

            const atsResult = {

                skills:
                    Math.min(
                        uniqueSkills.length * 20,
                        100
                    ),

                projects:
                    analysisResult.projects
                        ? 100
                        : 20,

                experience:
                    analysisResult.experience
                        ? 100
                        : 20,

                certifications:
                    analysisResult.certifications
                        ? 100
                        : 20,

                profile:
                    (
                        (analysisResult.github
                            ? 50
                            : 0) +

                        (analysisResult.linkedin
                            ? 50
                            : 0)
                    )
            };


            setAts(atsResult);


            // -------------------------------------
            // Resume Score
            // -------------------------------------

            let resumeScore =
                uniqueSkills.length * 15;


            resumeScore =
                Math.min(
                    resumeScore,
                    100
                );


            setScore(resumeScore);


            // -------------------------------------
            // Suggestions
            // -------------------------------------

            const aiSuggestions = [];


            if (
                !normalizedText.includes(
                    "github"
                )
            ) {

                aiSuggestions.push(
                    "Add GitHub Profile"
                );
            }


            if (
                !normalizedText.includes(
                    "intern"
                )
            ) {

                aiSuggestions.push(
                    "Add Internship Experience"
                );
            }


            if (
                !normalizedText.includes(
                    "certificate"
                )
            ) {

                aiSuggestions.push(
                    "Add Certifications"
                );
            }


            if (
                !normalizedText.includes(
                    "project"
                )
            ) {

                aiSuggestions.push(
                    "Improve Project Descriptions"
                );
            }


            setSuggestions(
                aiSuggestions
            );


            // -------------------------------------
            // Complete
            // -------------------------------------

            setUploaded(true);


            showToast(
                "success",
                "Resume analyzed successfully."
            );

        }

        catch (error) {

            console.error(
                "Resume analysis error:",
                error
            );


            setUploaded(false);


            showToast(
                "error",
                "Unable to analyze resume."
            );
        }
    };


    // =========================================
    // Loading
    // =========================================

    if (loading) {

        return (

            <LoadingSpinner
                message="FutureTwin AI is analyzing your resume..."
            />

        );
    }


    // =========================================
    // UI
    // =========================================

    return (

        <div
            className="resume-upload"
            id="resume"
        >

            {/* =================================
                HERO
            ================================= */}

            <div className="resume-hero">

                <div>

                    <h1 className="resume-hero-title">

                        <Brain
                            size={32}
                        />

                        AI Resume Analysis

                    </h1>


                    <p>

                        Upload your resume and receive
                        AI-powered insights, ATS evaluation,
                        skill analysis, strengths,
                        weaknesses, and personalized
                        career recommendations.

                    </p>

                </div>

            </div>


            {/* =================================
                UPLOAD AREA
            ================================= */}

            <div className="upload-grid">


                {/* Upload Card */}

                <div className="upload-card">

                    <h2 className="upload-card-title">

                        <FileText
                            size={24}
                        />

                        Upload Resume

                    </h2>


                    <p>

                        Upload your latest resume
                        in PDF format. Our AI will
                        analyze it in a few seconds.

                    </p>


                    <div className="upload-icon">

                        <FileText
                            size={42}
                            strokeWidth={1.8}
                        />

                    </div>


                    <label
                        className="upload-resume-btn"
                    >

                        Choose Resume


                        <input
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleUpload}
                            hidden
                        />

                    </label>

                </div>


                {/* Information Card */}

                <div className="upload-info-card">

                    <h2 className="upload-card-title">

                        <Sparkles
                            size={24}
                        />

                        What You'll Get

                    </h2>


                    <div
                        className="feature-item"
                        onClick={() =>
                            scrollToSection(
                                atsRef
                            )
                        }
                    >

                        <CheckCircle2
                            size={20}
                        />

                        <span>
                            ATS Compatibility Score
                        </span>

                    </div>


                    <div
                        className="feature-item"
                        onClick={() =>
                            scrollToSection(
                                reviewRef
                            )
                        }
                    >

                        <Brain
                            size={20}
                        />

                        <span>
                            AI Resume Review
                        </span>

                    </div>


                    <div
                        className="feature-item"
                        onClick={() =>
                            scrollToSection(
                                strengthsRef
                            )
                        }
                    >

                        <Dumbbell
                            size={20}
                        />

                        <span>
                            Strengths & Weaknesses
                        </span>

                    </div>


                    <div
                        className="feature-item"
                        onClick={() =>
                            scrollToSection(
                                careerRef
                            )
                        }
                    >

                        <TrendingUp
                            size={20}
                        />

                        <span>
                            Career Recommendation
                        </span>

                    </div>


                    <div
                        className="feature-item"
                        onClick={() =>
                            scrollToSection(
                                missingSkillsRef
                            )
                        }
                    >

                        <Target
                            size={20}
                        />

                        <span>
                            Missing Skills Detection
                        </span>

                    </div>

                </div>

            </div>


            {/* =================================
                EMPTY STATE
            ================================= */}

            {!uploaded && (

                <EmptyState
                    icon={FileText}
                    title="No Resume Uploaded"
                    description="Upload your resume to receive ATS analysis, AI feedback, skill detection, and personalized career recommendations."
                />

            )}


            {/* =================================
                RESULTS
            ================================= */}

            {uploaded && (

                <div className="resume-result">


                    {/* Analysis Complete */}

                    <div className="analysis-success">

                        <div>

                            <div className="download-report-container">

                                <button
                                    type="button"
                                    className="download-report-btn"
                                    onClick={() =>
                                        downloadReport(
                                            aiResult
                                        )
                                    }
                                    disabled={!aiResult}
                                >

                                    <Download
                                        size={18}
                                    />

                                    Download AI Report

                                </button>

                            </div>


                            <h2 className="analysis-complete-title">

                                <CheckCircle2
                                    size={32}
                                />

                                Analysis Complete

                            </h2>


                            <p>

                                Your resume has been
                                successfully analyzed
                                by FutureTwin AI.

                            </p>

                        </div>

                    </div>


                    {/* =================================
                        SCORE CARDS
                    ================================= */}

                    <div
                        className="analysis-stats top-row"
                        ref={atsRef}
                    >


                        {/* Resume Score */}

                        <div className="stat-card">

                            <div className="stat-icon">

                                <FileText
                                    size={24}
                                />

                            </div>

                            <span>
                                Resume Score
                            </span>

                            <h1>
                                {
                                    aiResult?.resumeScore ??
                                    score
                                }%
                            </h1>

                        </div>


                        {/* ATS Score */}

                        <div className="stat-card">

                            <div className="stat-icon">

                                <Target
                                    size={24}
                                />

                            </div>

                            <span>
                                ATS Score
                            </span>

                            <h1>
                                {
                                    aiResult?.atsScore ??
                                    ats.skills ??
                                    0
                                }%
                            </h1>

                        </div>


                        {/* Skills */}

                        <div className="stat-card">

                            <div className="stat-icon">

                                <Brain
                                    size={24}
                                />

                            </div>

                            <span>
                                Skills Found
                            </span>

                            <h1>

                                {
                                    aiResult
                                        ?.parsedResume
                                        ?.skills
                                        ? aiResult
                                            .parsedResume
                                            .skills
                                            .reduce(
                                                (
                                                    total,
                                                    category
                                                ) =>
                                                    total +
                                                    (
                                                        category
                                                            ?.items
                                                            ?.length ||
                                                        0
                                                    ),
                                                0
                                            )
                                        : detectedSkills.length
                                }

                            </h1>

                        </div>


                        {/* Recruiter Score */}

                        <div className="stat-card">

                            <div className="stat-icon">

                                <BriefcaseBusiness
                                    size={24}
                                />

                            </div>

                            <span>
                                Recruiter Score
                            </span>

                            <h1>

                                {
                                    aiResult
                                        ?.recruiterScore ??
                                    "--"
                                }

                                {
                                    aiResult
                                        ?.recruiterScore !==
                                    undefined
                                        ? "%"
                                        : ""
                                }

                            </h1>

                        </div>


                        {/* Interview Readiness */}

                        <div className="stat-card">

                            <div className="stat-icon">

                                <Rocket
                                    size={24}
                                />

                            </div>

                            <span>
                                Interview Ready
                            </span>

                            <h1>

                                {
                                    aiResult
                                        ?.interviewReadiness ??
                                    "--"
                                }

                                {
                                    aiResult
                                        ?.interviewReadiness !==
                                    undefined
                                        ? "%"
                                        : ""
                                }

                            </h1>

                        </div>

                    </div>


                    {/* =================================
                        RECRUITER VERDICT
                    ================================= */}

                    <div
                        className="analysis-card"
                        ref={reviewRef}
                    >

                        <h3 className="analysis-card-title">

                            <BriefcaseBusiness
                                size={22}
                            />

                            Recruiter Verdict

                        </h3>


                        <h2>

                            {
                                aiResult?.verdict ||
                                "No verdict available."
                            }

                        </h2>


                        <p>

                            This evaluation combines
                            ATS compatibility, resume
                            quality, internships,
                            projects, certifications,
                            and technical skills.

                        </p>

                    </div>


                    {/* =================================
                        DETECTED SKILLS
                    ================================= */}

                    <div className="analysis-card">

                        <h3 className="analysis-card-title">

                            <Brain
                                size={22}
                            />

                            Detected Skills

                        </h3>


                        <div className="skill-grid">

                            {
                                (
                                    aiResult
                                        ?.parsedResume
                                        ?.skills ||
                                    []
                                )
                                    .flatMap(
                                        category =>
                                            category
                                                ?.items ||
                                            []
                                    )
                                    .map(
                                        (
                                            skill,
                                            index
                                        ) => (

                                            <span
                                                key={index}
                                                className="skill-badge"
                                            >
                                                {skill}
                                            </span>

                                        )
                                    )
                            }

                        </div>

                    </div>


                    {/* =================================
                        SECTION SCORES
                    ================================= */}

                    <SectionScores
                        sectionScores={
                            aiResult?.sectionScores
                        }
                    />


                    {/* =================================
                        AI SUGGESTIONS
                    ================================= */}

                    <div className="analysis-card">

                        <h3 className="analysis-card-title">

                            <Lightbulb
                                size={22}
                            />

                            AI Suggestions

                        </h3>


                        {
                            (
                                aiResult?.suggestions ||
                                suggestions
                            ).length > 0
                                ? (

                                    <ul className="analysis-list">

                                        {
                                            (
                                                aiResult
                                                    ?.suggestions ||
                                                suggestions
                                            ).map(
                                                (
                                                    item,
                                                    index
                                                ) => (

                                                    <li
                                                        key={index}
                                                    >

                                                        <Lightbulb
                                                            size={16}
                                                        />

                                                        <span>
                                                            {item}
                                                        </span>

                                                    </li>

                                                )
                                            )
                                        }

                                    </ul>

                                )
                                : (

                                    <p className="empty-message">

                                        No suggestions.
                                        Your resume looks great!

                                    </p>

                                )
                        }

                    </div>


                    {/* =================================
                        STRENGTHS / WEAKNESSES
                    ================================= */}

                    <div
                        className="strength-weakness-grid"
                        ref={strengthsRef}
                    >


                        {/* Strengths */}

                        <div className="analysis-card">

                            <h3 className="analysis-card-title">

                                <Dumbbell
                                    size={22}
                                />

                                Strengths

                            </h3>


                            {
                                aiResult
                                    ?.parsedResume
                                    ?.strengths
                                    ?.length > 0
                                    ? (

                                        <ul className="analysis-list">

                                            {
                                                aiResult
                                                    .parsedResume
                                                    .strengths
                                                    .map(
                                                        (
                                                            item,
                                                            index
                                                        ) => (

                                                            <li
                                                                key={index}
                                                            >

                                                                <CheckCircle2
                                                                    size={16}
                                                                />

                                                                <span>
                                                                    {item}
                                                                </span>

                                                            </li>

                                                        )
                                                    )
                                            }

                                        </ul>

                                    )
                                    : (

                                        <p className="empty-message">

                                            No strengths detected.

                                        </p>

                                    )
                            }

                        </div>


                        {/* Weaknesses */}

                        <div className="analysis-card">

                            <h3 className="analysis-card-title">

                                <AlertTriangle
                                    size={22}
                                />

                                Weaknesses

                            </h3>


                            {
                                aiResult
                                    ?.parsedResume
                                    ?.weaknesses
                                    ?.length > 0
                                    ? (

                                        <ul className="analysis-list">

                                            {
                                                aiResult
                                                    .parsedResume
                                                    .weaknesses
                                                    .map(
                                                        (
                                                            item,
                                                            index
                                                        ) => (

                                                            <li
                                                                key={index}
                                                            >

                                                                <XCircle
                                                                    size={16}
                                                                />

                                                                <span>
                                                                    {item}
                                                                </span>

                                                            </li>

                                                        )
                                                    )
                                            }

                                        </ul>

                                    )
                                    : (

                                        <p className="empty-message">

                                            No weaknesses detected.

                                        </p>

                                    )
                            }

                        </div>

                    </div>


                    {/* =================================
                        MISSING SKILLS
                    ================================= */}

                    <div
                        className="analysis-card"
                        ref={missingSkillsRef}
                    >

                        <h3 className="analysis-card-title">

                            <Target
                                size={22}
                            />

                            Missing Skills

                        </h3>


                        {
                            aiResult
                                ?.parsedResume
                                ?.missingSkills
                                ?.length > 0
                                ? (

                                    <div className="skill-grid">

                                        {
                                            aiResult
                                                .parsedResume
                                                .missingSkills
                                                .map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (

                                                        <span
                                                            key={index}
                                                            className="missing-skill-badge"
                                                        >

                                                            {item}

                                                        </span>

                                                    )
                                                )
                                        }

                                    </div>

                                )
                                : (

                                    <p className="empty-message">

                                        No missing skills detected.

                                    </p>

                                )
                        }

                    </div>


                    {/* =================================
                        CAREER RECOMMENDATION
                    ================================= */}

                    <div
                        className="career-card"
                        ref={careerRef}
                    >

                        <h3 className="analysis-card-title">

                            <TrendingUp
                                size={22}
                            />

                            AI Career Recommendation

                        </h3>


                        <p>

                            {
                                aiResult
                                    ?.parsedResume
                                    ?.careerRecommendation ||
                                "No career recommendation available."
                            }

                        </p>

                    </div>

                </div>

            )}


            {/* =================================
                TOAST
            ================================= */}

            {toast.show && (

                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() =>
                        setToast(
                            prev => ({
                                ...prev,
                                show: false
                            })
                        )
                    }
                />

            )}

        </div>
    );
}

export default ResumeUpload;