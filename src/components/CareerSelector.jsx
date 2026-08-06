import { careers } from "../data/careers";

function CareerSelector({
  selectedCareer,
  setSelectedCareer
}) {

  const careerData = careers[selectedCareer];

  return (
    <div className="career-selector">

      <h1>Career Explorer</h1>

      <h2>
        Selected Career: {selectedCareer}
      </h2>

      <div className="career-grid">

        <div
          className={
            selectedCareer === "AI Engineer"
              ? "career-card selected-career"
              : "career-card"
          }
          onClick={() => setSelectedCareer("AI Engineer")}
        >
          AI Engineer
        </div>

        <div
          className={
            selectedCareer === "ML Engineer"
              ? "career-card selected-career"
              : "career-card"
          }
          onClick={() => setSelectedCareer("ML Engineer")}
        >
          ML Engineer
        </div>

        <div
          className={
            selectedCareer === "Data Scientist"
              ? "career-card selected-career"
              : "career-card"
          }
          onClick={() => setSelectedCareer("Data Scientist")}
        >
          Data Scientist
        </div>

        <div
          className={
            selectedCareer === "Software Engineer"
              ? "career-card selected-career"
              : "career-card"
          }
          onClick={() => setSelectedCareer("Software Engineer")}
        >
          Software Engineer
        </div>

      </div>

      <div className="career-details">

        <h2>{selectedCareer}</h2>

        <h3>
          Success Probability: {careerData.success}
        </h3>

        <h3>
          Timeline: {careerData.timeline}
        </h3>

        <h3>
          Expected Salary: {careerData.salary}
        </h3>

        <h3>Required Skills:</h3>

        <ul>
          {careerData.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        <hr />

        <h3>Future Simulation</h3>

        <p>
          🚀 Best Case: {careerData.future.optimistic}
        </p>

        <p>
          📈 Expected Outcome: {careerData.future.realistic}
        </p>

        <p>
          ⚠ Risk Scenario: {careerData.future.risk}
        </p>

      </div>

    </div>
  );
}

export default CareerSelector;