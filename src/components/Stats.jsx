import "./Stats.css";
import {
  Brain,
  TrendingUp,
  Activity
} from "lucide-react";

function Stats() {
  return (
    <section className="stats-section">

      <span className="section-tag">
        AI Insights
      </span>

      <h2 className="section-title">
        FutureTwin Insights
      </h2>

      <p className="stats-description">
        Track your career readiness with AI-powered analytics and personalized insights.
      </p>

      <div className="stats">

        <div className="stat-card">

          <div className="stat-icon-box">
              <Brain className="stat-icon" size={38} />
          </div>

          <h3>Career Readiness</h3>

          <div className="stat-value">82%</div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: "82%" }}
            ></div>
          </div>

          <span className="stat-status">
            Excellent
          </span>

        </div>

        <div className="stat-card">

          <div className="stat-icon-box">
              <TrendingUp className="stat-icon" size={38} />
          </div>

          <h3>Future Success</h3>

          <div className="stat-value">88%</div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: "88%" }}
            ></div>
          </div>

          <span className="stat-status">
            Outstanding
          </span>

        </div>

        <div className="stat-card">

          <div className="stat-icon-box">
              <Activity className="stat-icon" size={38} />
          </div>

          <h3>Consistency Score</h3>

          <div className="stat-value">74%</div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: "74%" }}
            ></div>
          </div>

          <span className="stat-status">
            Improving
          </span>

        </div>

      </div>

    </section>
  );
}

export default Stats;