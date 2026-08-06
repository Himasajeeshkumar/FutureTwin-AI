import { careers } from "../data/careers";


function CareerMatch({ skills }) {

  const careerMatches = Object.entries(careers).map(
    ([careerName, careerData]) => {

      const matchedSkills = careerData.skills.filter(
        skill => skills.includes(skill)
      );

      const percentage = Math.round(
        (matchedSkills.length / careerData.skills.length) * 100
      );

      return {
        careerName,
        percentage,
        matchedSkills,
        missingSkills: careerData.skills.filter(
          skill => !skills.includes(skill)
        ),
      };
    }
  );

  const sortedCareerMatches = [...careerMatches].sort(
      (a, b) => b.percentage - a.percentage
  );

  const bestCareer = sortedCareerMatches[0];

  return (
    <div className="career-match">

    <h1 className="section-title">
        Career Match
    </h1>

    <div className="best-career-card">

        <h2>🏆 Best Career Recommendation</h2>

        <h1>{bestCareer.careerName}</h1>

        <h3>
        Match Score: {bestCareer.percentage}%
        </h3>

        <p>
        Based on your detected skills, this career
        currently has the highest compatibility.
        </p>
        <hr />

        <h3>Matched Skills</h3>

        <ul>

        {bestCareer.matchedSkills.map((skill,index)=>(

        <li key={index}>
        ✅ {skill}
        </li>

        ))}

        </ul>

        <h3>Skills to Learn</h3>

        <ul>

        {bestCareer.missingSkills.map((skill,index)=>(

        <li key={index}>
        ❌ {skill}
        </li>

        ))}

        </ul>

    </div>

      {sortedCareerMatches.map((career, index) => (

        <div
          key={index}
          className="career-match-card"
        >

        <h2>
            {index === 0 && "🥇 "}
            {index === 1 && "🥈 "}
            {index === 2 && "🥉 "}
            {index > 2 && "🏅 "}
            {career.careerName}
        </h2>

          <h3>
            {career.percentage}%
          </h3>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${career.percentage}%`
              }}
            ></div>
          </div>

        </div>

      ))}

    </div>
  );
}

export default CareerMatch;