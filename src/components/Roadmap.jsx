import { careers } from "../data/careers";

function Roadmap({
  skills,
  selectedCareer
}) {

  const roadmapSkills =
    careers[selectedCareer].skills;

  return (
    <div className="roadmap">

      <h1 className="section-title">
        Learning Roadmap
      </h1>

      <div className="roadmap-card">

        <h2>{selectedCareer} Roadmap</h2>

        <ul>

          {roadmapSkills.map((skill, index) => (

            <li key={index}>

              {skills.includes(skill)
                ? `✅ ${skill}`
                : `❌ ${skill}`}

            </li>

          ))}

        </ul>

      </div>

    </div>
  );
}

export default Roadmap;