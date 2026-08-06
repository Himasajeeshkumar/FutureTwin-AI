import { useResume } from "../../context/ResumeContext";


function CareerHealth() {

    const {

        analysis,
        jobMatch,
        futureSimulation,
        skillGap,


    } = useResume();

    let score = 0;

    const breakdown = [];

    // Resume Uploaded
    if (analysis) {

        score += 15;

        breakdown.push({
            title: "Resume Uploaded",
            points: 15
        });

    }

    // Resume Score
    if ((analysis?.resumeScore || 0) >= 80) {

        score += 15;

        breakdown.push({
            title: "Strong Resume",
            points: 15
        });

    }

    // ATS

    if ((analysis?.atsScore || 0) >= 80) {

        score += 15;

        breakdown.push({
            title: "ATS Optimized",
            points: 15
        });

    }

    // Job Match

    if (jobMatch) {

        score += 20;

        breakdown.push({
            title: "Job Match",
            points: 20
        });

    }

    // Skill Gap

    if (skillGap) {

        score += 15;

        breakdown.push({
            title: "Skill Gap",
            points: 15
        });

    }

    // Simulator

    if (futureSimulation) {

        score += 20;

        breakdown.push({
            title: "Future Simulator",
            points: 20
        });
    
    }
    
    let status = "";

    if (score < 40)
        status = "Needs Improvement";

    else if (score < 70)
        status = "Good Progress";

    else
        status = "Excellent";

    return (

        <div className="health-card">

            <h2>

                ❤️ Career Health

            </h2>

            <h1>

                {score}%

            </h1>

            <div className="progress-bar">

                <div

                    className="progress-fill"

                    style={{

                        width:`${score}%`

                    }}

                >

                </div>

            </div>

            <p>

                <strong>

                    {status}

                </strong>

            </p>

            <hr />

            <h3>

                Score Breakdown

            </h3>

            <ul>

                {

                    breakdown.map((item,index)=>(

                        <li key={index}>

                            ✅ {item.title}

                            (+{item.points})

                        </li>

                    ))

                }

            </ul>

        </div>

    );

}

export default CareerHealth;