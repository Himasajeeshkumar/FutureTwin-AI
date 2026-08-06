import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "../services/dashboardService";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorCard from "../components/ui/ErrorCard";

import {

FileCheck,

Target,

Brain,

Rocket,

MessageSquare

} from "lucide-react";


function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadDashboard() {

            try {

                const data = await getDashboard();
                console.log("Resume:", data.resume);
                console.log("Resume Analysis:", data.resume?.analysis);

                console.log("Job Match:", JSON.stringify(data.jobMatch, null, 2));
                console.log("Job Match Result:", data.jobMatch?.result);

                console.log("Skill Gap:", data.skillGap);

                setDashboard(data);

            }

            catch (err) {

                console.log(err);
                setError("Unable to load dashboard.");

            }

            finally {

                setLoading(false);

            }

        }

        loadDashboard();

    }, []);

    if (loading) {

        return (
            <LoadingSpinner
                message="Loading your dashboard..."
            />
        );

    }
    if (error) {

    return (
        <ErrorCard
            title="Dashboard Failed"
            message={error}
            onRetry={() => window.location.reload()}
        />
    );

}
    

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <div className="dashboard-header-left">

                    <span className="dashboard-tag">
                        ✨ FutureTwin Dashboard
                    </span>

                    <h1>
                        Welcome Back <span>👋</span>
                    </h1>

                    <p>
                        Your AI-powered career command center.
                        Track your resume, job readiness, skill growth,
                        and career progress in one place.
                    </p>

                </div>

                <div className="dashboard-header-right">

                    <div className="dashboard-mini-card">

                        <span>Resume</span>

                        <h3>
                            {dashboard.resume
                                ? `${dashboard.resume.analysis?.atsScore ?? "--"}%`
                                : "--"}
                        </h3>

                    </div>

                    <div className="dashboard-mini-card">

                        <span>Job Match</span>

                        <h3>
                            {dashboard.jobMatch
                                ? `${dashboard.jobMatch.result.matchScore}%`
                                : "--"}
                        </h3>

                    </div>

                    <div className="dashboard-mini-card">

                        <span>Career Success</span>

                        <h3>
                            {dashboard.simulation
                                ? `${dashboard.simulation.result.successProbability}%`
                                : "--"}
                        </h3>

                    </div>

                </div>

            </div>

            <h2 className="dashboard-section-title">
                Career Overview
            </h2>

            <div className="dashboard-stats">

                <div className="dashboard-stat-card">

                    <FileCheck className="dashboard-icon"/>

                    <h3>

                    Resume Status

                    </h3>

                    <div className="stat-value">
                        {dashboard.resume
                            ? `${dashboard.resume.analysis?.atsScore ?? "--"}%`
                            : "--"}
                    </div>

                    <span className="stat-status">
                        {dashboard.resume ? "ATS Score" : "Resume Missing"}
                    </span>

                </div>

                <div className="dashboard-stat-card">

                    <Target className="dashboard-icon" />

                    <h3>Job Match</h3>

                    <div className="stat-value">
                        {dashboard.jobMatch
                            ? `${dashboard.jobMatch.result.matchScore}%`
                            : "--"}
                    </div>

                    <span className="stat-status">
                        {dashboard.jobMatch ? "AI Match Score" : "No Analysis"}
                    </span>

                </div>

                <div className="dashboard-stat-card">

                    <Brain className="dashboard-icon" />

                    <h3>Skill Gap</h3>

                    <div className="stat-value">
                        {dashboard.skillGap
                            ? `${dashboard.skillGap.result.matchPercentage}%`
                            : "--"}
                    </div>

                    <span className="stat-status">
                        {dashboard.skillGap ? "Skills Covered" : "No Analysis"}
                    </span>

                </div>

                <div className="dashboard-stat-card">

                    <Rocket className="dashboard-icon" />

                    <h3>Career Simulator</h3>

                    <div className="stat-value">
                        {dashboard.simulation
                            ? `${dashboard.simulation.result.successProbability}%`
                            : "--"}
                    </div>

                    <span className="stat-status">
                        {dashboard.simulation ? "Success Probability" : "Not Run"}
                    </span>

                </div>

                <div className="dashboard-stat-card">

                    <MessageSquare className="dashboard-icon" />

                    <h3>AI Mentor</h3>

                    <div className="stat-value">
                        {dashboard.mentorChats}
                    </div>

                    <span className="stat-status">
                        Total Conversations
                    </span>

                </div>

            </div>

            <h2 className="dashboard-section-title">
                Career Journey
            </h2>

            <div className="journey-card">

                <div className="journey-step completed">

                    <div className="journey-icon">✅</div>

                    <div>

                        <h3>Resume Uploaded</h3>

                        <p>
                            {dashboard.resume
                                ? "Completed"
                                : "Pending"}
                        </p>

                    </div>

                </div>

                <div className="journey-step completed">

                    <div className="journey-icon">📄</div>

                    <div>

                        <h3>Resume Analysis</h3>

                        <p>
                            {dashboard.resume
                                ? "Completed"
                                : "Pending"}
                        </p>

                    </div>

                </div>

                <div className="journey-step">

                    <div className="journey-icon">🎯</div>

                    <div>

                        <h3>Job Match</h3>

                        <p>
                            {dashboard.jobMatch
                                ? "Completed"
                                : "Pending"}
                        </p>

                    </div>

                </div>

                <div className="journey-step">

                    <div className="journey-icon">🧠</div>

                    <div>

                        <h3>Skill Gap</h3>

                        <p>
                            {dashboard.skillGap
                                ? "Completed"
                                : "Pending"}
                        </p>

                    </div>

                </div>

                <div className="journey-step">

                    <div className="journey-icon">🚀</div>

                    <div>

                        <h3>Future Simulator</h3>

                        <p>
                            {dashboard.simulation
                                ? "Completed"
                                : "Pending"}
                        </p>

                    </div>

                </div>

        <div className="journey-step">

            <div className="journey-icon">🤖</div>

            <div>

                <h3>AI Mentor</h3>

                <p>
                    {dashboard.mentorChats > 0
                        ? `${dashboard.mentorChats} conversations`
                        : "Not Started"}
                </p>

            </div>

        </div>

    </div>
            <h2 className="dashboard-section-title">
                Quick Actions
            </h2>
            <div className="quick-actions">

                <Link to="/resume-analysis" className="dashboard-action-card">

                    <FileCheck className="dashboard-action-icon"/>

                    <h3>Resume Analysis</h3>

                    <p>Analyze ATS & Resume</p>
                    <span className="dashboard-action-arrow">
                        →
                    </span>

                </Link>

                <Link to="/job-match" className="dashboard-action-card">

                    <Target className="dashboard-action-icon"/>

                    <h3>Job Match</h3>

                    <p>Find matching job roles</p>

                    <span className="dashboard-action-arrow">
                        →
                    </span>

                </Link>

                <Link to="/skill-gap" className="dashboard-action-card">

                    <Brain className="dashboard-action-icon"/>

                    <h3>Skill Gap</h3>

                    <p>Identify missing skills</p>

                    <span className="dashboard-action-arrow">
                        →
                    </span>

                </Link>

                <Link to="/simulator" className="dashboard-action-card">

                    <Rocket className="dashboard-action-icon"/>

                    <h3>Career Simulator</h3>

                    <p>Predict career success</p>

                    <span className="dashboard-action-arrow">
                        →
                    </span>

                </Link>

                <Link to="/mentor" className="dashboard-action-card">

                    <MessageSquare className="dashboard-action-icon"/>

                    <h3>AI Mentor</h3>

                    <p>Chat with your AI mentor</p>

                    <span className="dashboard-action-arrow">
                        →
                    </span>

                </Link>

            </div>

            <h2 className="dashboard-section-title">
                🤖 AI Insight
            </h2>

            <div className="dashboard-insight-card">

                <div className="dashboard-insight-icon">

                    <Brain size={42} />

                </div>

                <div className="dashboard-insight-content">

                    <h2>Your Next Best Move</h2>

                    <p>

                        {dashboard.resume?.analysis?.suggestions?.length
                            ? dashboard.resume.analysis.suggestions[0]
                            : "Upload your resume to receive personalised AI career insights."}

                    </p>

                    <div className="dashboard-insight-actions">

                        <Link
                            to="/skill-gap"
                            className="insight-btn"
                        >
                            Improve Skills
                        </Link>

                        <Link
                            to="/mentor"
                            className="insight-btn secondary"
                        >
                            Ask AI Mentor
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;