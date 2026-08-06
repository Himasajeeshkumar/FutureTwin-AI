import "./WelcomeHero.css";

function WelcomeHero({
    username = "User",
    selectedCareer,
    readiness = 60,
    resumeScore = 85,
    jobMatch = 90
}) {
    return (
        <div className="welcome-hero">

            <div className="welcome-left">

                <h1>
                    👋 Welcome back, {username}
                </h1>

                <p>
                    FutureTwin AI has analysed your profile and generated
                    personalised career insights.
                </p>

            </div>

            <div className="welcome-right">

                <div className="hero-stat">
                    <span>Career</span>
                    <h3>{selectedCareer}</h3>
                </div>

                <div className="hero-stat">
                    <span>Readiness</span>
                    <h3>{readiness}%</h3>
                </div>

                <div className="hero-stat">
                    <span>Resume Score</span>
                    <h3>{resumeScore}%</h3>
                </div>

                <div className="hero-stat">
                    <span>Job Match</span>
                    <h3>{jobMatch}%</h3>
                </div>

            </div>

        </div>
    );
}

export default WelcomeHero;