import { careers } from "../data/careers";

function AIRecommendation({
  skills,
  selectedCareer
}) {

  const requiredSkills =
    careers[selectedCareer].skills;

  const missingSkills =
    requiredSkills.filter(
      skill => !skills.includes(skill)
    );

  let recommendation = "";

  if (missingSkills.length === 0) {
    recommendation =
      "You are industry ready. Start applying for internships and building projects.";
  } else {
    recommendation =
      `Focus on ${missingSkills[0]} next to improve your career readiness.`;
  }

  return (
    <div className="ai-recommendation">

      <h2>🤖 AI Recommendation</h2>

      <p>{recommendation}</p>

    </div>
  );
}

export default AIRecommendation;