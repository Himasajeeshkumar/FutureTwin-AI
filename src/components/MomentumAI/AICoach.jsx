import {
    Bot,
    CheckCircle2,
    Circle,
    Target,
    TrendingUp
} from "lucide-react";

import { useResume } from "../../context/ResumeContext";

function AICoach() {

    const {
        coachMessage,
        currentMission,
        placementReadiness
    } = useResume();


    const progressItems = [
        {
            title: "Resume Analysis",
            threshold: 25
        },
        {
            title: "Job Match",
            threshold: 50
        },
        {
            title: "Skill Gap",
            threshold: 75
        },
        {
            title: "Future Simulator",
            threshold: 100
        }
    ];


    return (

        <div className="dashboard-card">

            <h2 className="card-title-with-icon">

                <Bot
                    size={22}
                    strokeWidth={2}
                />

                AI Coach

            </h2>


            <h3>
                Good to see you!
            </h3>


            <hr />


            <h3>
                Today's Progress
            </h3>


            <ul className="coach-list">

                {progressItems.map((item) => {

                    const completed =
                        placementReadiness >=
                        item.threshold;


                    return (

                        <li key={item.title}>

                            {completed ? (

                                <CheckCircle2
                                    size={18}
                                />

                            ) : (

                                <Circle
                                    size={18}
                                />

                            )}

                            <span>
                                {item.title}
                            </span>

                        </li>

                    );

                })}

            </ul>


            <hr />


            <h3 className="card-title-with-icon">

                <TrendingUp
                    size={19}
                />

                Today's Recommendation

            </h3>


            <p className="coach-advice">
                {coachMessage}
            </p>


            <hr />


            <h3 className="card-title-with-icon">

                <Target
                    size={19}
                />

                Next Mission

            </h3>


            <p>
                {currentMission}
            </p>


            <p className="coach-reward">

                Placement Readiness{" "}

                <strong>
                    {placementReadiness}%
                </strong>

            </p>

        </div>

    );
}

export default AICoach;