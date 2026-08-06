import { careers } from "../data/careers";

function CareerReadiness({
  skills,
  selectedCareer
}) {

  const requiredSkills =
    careers[selectedCareer].skills;

  const matchedSkills =
    requiredSkills.filter(skill =>
      skills.includes(skill)
    );

  const score = Math.round(
    (matchedSkills.length /
      requiredSkills.length) * 100
  );

  const scoreColor =
    score < 40
      ? "#EF4444"
      : score < 70
      ? "#F59E0B"
      : "#22C55E";

  const status =
    score < 40
      ? "Needs significant improvement"
      : score < 70
      ? "On the right track"
      : "Industry ready";

  return (
    <div className="readiness-section">

      <h1 className="section-title">
        Career Readiness
      </h1>

      <div className="readiness-card">

        <h2>{selectedCareer}</h2>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${score}%`
            }}
          ></div>

        </div>

        <h3
          style={{
            color: scoreColor
          }}
        >
          {score}% Ready
        </h3>

        <p>
          {matchedSkills.length} of {"  "}
          {requiredSkills.length} skills completed
        </p>

        <p className="readiness-status">
          {status}
        </p>

      </div>

    </div>
  );
}

export default CareerReadiness;