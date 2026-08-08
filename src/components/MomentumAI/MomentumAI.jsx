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
        <main className="momentum-page">

            <header className="momentum-header">

                <h1 className="momentum-heading">
                    Momentum AI
                </h1>

                <p className="momentum-subtitle">
                    Stay consistent, build skills, track progress,
                    and become placement-ready with your personal
                    AI career coach.
                </p>

            </header>

            <section className="dashboard-grid">

                <MissionCard />

                <CareerHealth />

                <WeeklyProgress />

                <SessionTracker />

                <Achievements />

                <BurnoutStatus />

                <AICoach />

            </section>

        </main>
    );

}

export default MomentumAI;