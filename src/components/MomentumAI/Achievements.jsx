import {
    Award,
    BriefcaseBusiness,
    CheckCircle2,
    FileText,
    Target,
    Trophy
} from "lucide-react";

import { useResume } from "../../context/ResumeContext";

function Achievements() {

    const {
        xp,
        analysis,
        placementReadiness,
        completedMissions
    } = useResume();


    const achievements = [

        {
            title: "Resume Master",
            icon: FileText,

            progress: analysis
                ? Math.min(
                    Math.max(
                        analysis.resumeScore || 0,
                        0
                    ),
                    100
                )
                : 0
        },


        {
            title: "ATS Optimizer",
            icon: Target,

            progress: analysis
                ? Math.min(
                    Math.max(
                        analysis.atsScore || 0,
                        0
                    ),
                    100
                )
                : 0
        },


        {
            title: "Consistency",
            icon: Award,

            progress: Math.min(
                Math.max(
                    Math.round(xp || 0),
                    0
                ),
                100
            )
        },


        {
            title: "Interview Ready",
            icon: BriefcaseBusiness,

            progress: Math.min(
                Math.max(
                    placementReadiness || 0,
                    0
                ),
                100
            )
        }

    ];


    return (

        <div className="dashboard-card">

            <h2 className="card-title-with-icon">

                <Trophy
                    size={22}
                    strokeWidth={2}
                />

                Achievements

            </h2>


            <p className="coach-advice">
                Unlock achievements by improving your
                resume, ATS score, consistency, and
                placement readiness.
            </p>


            {achievements.map(
                (item, index) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={index}
                            className="achievement-item"
                        >

                            <div className="achievement-header">

                                <span className="achievement-title">

                                    <Icon
                                        size={18}
                                        strokeWidth={2}
                                    />

                                    {item.title}

                                </span>


                                <span>
                                    {item.progress}%
                                </span>

                            </div>


                            <div className="progress-bar">

                                <div
                                    className="progress-fill"
                                    style={{
                                        width:
                                            `${item.progress}%`
                                    }}
                                />

                            </div>

                        </div>

                    );

                }
            )}


            <hr />


            <h3>
                Completed Missions
            </h3>


            <p className="mission-count">
                {completedMissions.length} Completed
            </p>


            {completedMissions.length === 0 ? (

                <p className="coach-advice">
                    No missions completed yet.
                    Start today's mission to begin
                    building your consistency.
                </p>

            ) : (

                <ul className="completed-missions">

                    {completedMissions.map(
                        (mission, index) => (

                            <li key={index}>

                                <CheckCircle2
                                    size={17}
                                />

                                <span>
                                    {mission}
                                </span>

                            </li>

                        )
                    )}

                </ul>

            )}

        </div>

    );
}

export default Achievements;