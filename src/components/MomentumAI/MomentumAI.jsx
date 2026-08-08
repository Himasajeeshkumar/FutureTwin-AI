import "./momentum.css";

import {
    Activity,
    TrendingUp,
    Target,
    Zap,
    Flame,
    Trophy,
    Bot
} from "lucide-react";

import { useResume } from "../../context/ResumeContext";

import CareerHealth from "./CareerHealth";
import MissionCard from "./MissionCard";
import WeeklyProgress from "./WeeklyProgress";
import Achievements from "./Achievements";
import SessionTracker from "./SessionTracker";
import BurnoutStatus from "./BurnoutStatus";
import AICoach from "./AICoach";

function MomentumAI() {

    const {
    xp,
    momentum,
    careerHealth,
    placementReadiness,
    completedPercent,
    currentMission
} = useResume();
    return (
        <main className="momentum-page">

            {/* =========================
                HEADER
            ========================= */}

            <header className="momentum-header">

                <div className="momentum-header-icon">
                    <Activity size={26} />
                </div>

                <div>
                    <h1 className="momentum-heading">
                        Momentum AI
                    </h1>

                    <p className="momentum-subtitle">
                        Your personal career progress center.
                        Build consistency, earn XP, and stay
                        placement-ready.
                    </p>
                </div>

            </header>


            {/* =========================
                OVERVIEW
            ========================= */}

            <section className="momentum-overview">

                <div className="overview-main">

                    <div className="overview-title">

                        <div className="overview-icon">
                            <TrendingUp size={22} />
                        </div>

                        <div>
                            <span>Career Momentum</span>
                            <h2>Keep moving forward</h2>
                        </div>

                    </div>

                    <p className="overview-description">
                        Complete career activities, improve your
                        profile, and build consistent progress
                        toward your placement goals.
                    </p>

                    <div className="overview-progress">

                        <div className="overview-progress-label">

                            <span>Overall Progress</span>

                            <strong>{completedPercent}%</strong>

                        </div>

                        <div className="momentum-progress-bar">
                            <div
                                className="momentum-progress-fill"
                                style={{ width: `${completedPercent}%` }}
                            />
                        </div>

                    </div>

                </div>


                <div className="overview-stats">

                    <div className="overview-stat">

                        <div className="stat-icon">
                            <Zap size={19} />
                        </div>

                        <div>
                            <span>Total XP</span>
                            <strong>{xp} XP</strong>
                        </div>

                    </div>


                    <div className="overview-stat">

                        <div className="stat-icon">
                            <Flame size={19} />
                        </div>

                        <div>
                            <span>Current Streak</span>
                            <strong>
                                {momentum?.streak || 0} days
                            </strong>
                        </div>

                    </div>


                    <div className="overview-stat">

                        <div className="stat-icon">
                            <Target size={19} />
                        </div>

                        <div>
                            <span>Placement Ready</span>
                            <strong>{placementReadiness}%</strong>
                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                MAIN DASHBOARD
            ========================= */}

            <section className="momentum-section">

                <div className="section-heading">

                    <div>
                        <h2>Your Progress</h2>

                        <p>
                            Complete activities and build your
                            career momentum.
                        </p>
                    </div>

                </div>


                <div className="momentum-grid">

                    <div className="momentum-card mission-card-wrapper">
                        <MissionCard />
                    </div>


                    <div className="momentum-card health-card-wrapper">
                        <CareerHealth />
                    </div>


                    <div className="momentum-card weekly-card-wrapper">
                        <WeeklyProgress />
                    </div>


                    <div className="momentum-card session-card-wrapper">
                        <SessionTracker />
                    </div>


                    <div className="momentum-card achievement-card-wrapper">
                        <Achievements />
                    </div>


                    <div className="momentum-card burnout-card-wrapper">
                        <BurnoutStatus />
                    </div>


                    <div className="momentum-card coach-card-wrapper">

                        <div className="coach-section-label">
                            <Bot size={18} />
                            <span>AI Career Coach</span>
                        </div>

                        <AICoach />

                    </div>

                </div>

            </section>


            {/* =========================
                MOTIVATION
            ========================= */}

            <section className="momentum-motivation">

                <div className="motivation-icon">
                    <Trophy size={24} />
                </div>

                <div>

                    <h3>
                        Every step counts
                    </h3>

                    <p>
                        Complete one activity today and keep
                        building your career momentum.
                    </p>

                </div>

            </section>

        </main>
    );
}

export default MomentumAI;