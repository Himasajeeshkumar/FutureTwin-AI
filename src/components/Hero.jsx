import { Link } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import "./Hero.css";

function Hero() {

    const {

        parsedResume,
        analysis

    } = useResume();

    if (parsedResume) {

        return (

            <section className="hero">

              <div className="hero-left">

                  <div className="logged-in-hero">

                    <div className="logged-in-header">

                        <span className="hero-badge">
                            👋 Welcome back
                        </span>

                        <h1>
                            Hi, {parsedResume.personal?.name?.split(" ")[0]}!
                        </h1>

                        <p>
                            Your AI career dashboard is ready.
                        </p>

                    </div>

                    <div className="hero-score-grid">

                        <div className="hero-score-card">
                            <span>Resume Score</span>
                            <h2>{analysis?.resumeScore ?? "--"}%</h2>
                        </div>

                        <div className="hero-score-card">
                            <span>ATS Score</span>
                            <h2>{analysis?.atsScore ?? "--"}%</h2>
                        </div>

                    </div>

                    <div className="hero-buttons">

                        <Link to="/dashboard">
                            <button className="primary-btn">
                                📊 Open Dashboard
                            </button>
                        </Link>

                        <Link to="/resume-analysis">
                            <button className="secondary-btn">
                                📄 Resume Analysis
                            </button>
                        </Link>

                    </div>

                </div>

              </div>

              <div className="hero-right">

                  {/* Optional:
                    Put a hero card here like your landing page,
                    or leave it empty for now.
                  */}

              </div>

          </section>

        );

    }

    return (
  <section className="hero">

    <div className="hero-left">

      <div className="hero-badge">
        ✨ AI Powered Career Intelligence
      </div>

      <h1 className="hero-title">
        Build Your Future
        <br />
        <span>With AI</span>
      </h1>

      <p className="hero-description">
        Analyze your resume, discover skill gaps, compare with real jobs,
        and predict your career growth—all powered by AI.
      </p>

      <div className="hero-buttons">

        <Link to="/resume-analysis">
          <button className="primary-btn">
            🚀 Get Started
          </button>
        </Link>

        <Link to="/about">
          <button className="secondary-btn">
            Learn More
          </button>
        </Link>

      </div>

    </div>

    <div className="hero-right">

      <div className="hero-card">

        <h3>FutureTwin AI</h3>

        <div className="hero-stat">
          <span>Resume Score</span>
          <strong>91%</strong>
        </div>

        <div className="hero-stat">
          <span>ATS Score</span>
          <strong>87%</strong>
        </div>

        <div className="hero-stat">
          <span>Future Success</span>
          <strong>88%</strong>
        </div>

        <div className="hero-stat">
          <span>Career Readiness</span>
          <strong>82%</strong>
        </div>

      </div>

    </div>

  </section>
);

}

export default Hero;