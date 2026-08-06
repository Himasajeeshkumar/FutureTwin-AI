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
            icon: "📄",
            progress: analysis ? Math.min(analysis.resumeScore || 0, 100) : 0
        },

        {
            title: "ATS Optimizer",
            icon: "🎯",
            progress: analysis ? Math.min(analysis.atsScore || 0, 100) : 0
        },

        {
            title: "Consistency",
            icon: "🔥",
            progress: Math.min(xp, 100)
        },

        {
            title: "Interview Ready",
            icon: "💼",
            progress: placementReadiness
        }


    ];

    return (

        <div className="dashboard-card">

            <h2>🏆 Achievements</h2>

            {

                achievements.map((item,index)=>(

                    <div
                        key={index}
                        className="achievement-item"
                    >

                        <div className="achievement-header">

                            <span>

                                {item.icon} {item.title}

                            </span>

                            <span>

                                {item.progress}%

                            </span>

                        </div>

                        <div className="progress-bar">

                            <div
                                className="progress-fill"
                                style={{

                                    width:`${item.progress}%`

                                }}
                            ></div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default Achievements;