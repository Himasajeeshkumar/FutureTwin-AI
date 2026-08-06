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

        <div className="momentum-page">

            <h1 className="momentum-heading">
                🔥 Momentum AI
            </h1>

            <p className="momentum-subtitle">
                Your AI Career Productivity Dashboard
            </p>

            <div className="dashboard-grid">

                <CareerHealth />

                <MissionCard />

                <WeeklyProgress />

                <Achievements />

                <SessionTracker />

                <BurnoutStatus />

                <AICoach />

            </div>

        </div>

    );

}

export default MomentumAI;