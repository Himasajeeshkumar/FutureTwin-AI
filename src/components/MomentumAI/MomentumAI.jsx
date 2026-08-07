import "./momentum.css";

import CareerHealth from "./CareerHealth";
import MissionCard from "./MissionCard";
import WeeklyProgress from "./WeeklyProgress";
import Achievements from "./Achievements";
import SessionTracker from "./SessionTracker";
import BurnoutStatus from "./BurnoutStatus";
import AICoach from "./AICoach";

function MomentumAI() {
    return (
        <div className="page-container">
            <div className="momentum-page fade-in">

                <div className="momentum-header">
                    <h1 className="momentum-heading">
                        🔥 Momentum AI
                    </h1>

                    <p className="momentum-subtitle">
                        Stay consistent. Build skills. Track progress. Get placement-ready with your personal AI coach.
                    </p>
                </div>

                <div className="dashboard-grid">
                    <MissionCard />
                    <CareerHealth />
                    <WeeklyProgress />
                    <SessionTracker />
                    <Achievements />
                    <BurnoutStatus />
                    <AICoach />
                </div>

            </div>
        </div>
    );
}

export default MomentumAI;