import { useResume } from "../../context/ResumeContext";
function WeeklyProgress() {

    const { weeklyXP } = useResume();

    const days = [

        "Mon",

        "Tue",

        "Wed",

        "Thu",

        "Fri",

        "Sat",

        "Sun"

    ];

    const maxXP = Math.max(...weeklyXP, 1);

    const progress = days.map((day, index) => ({

        day,

        xp: weeklyXP[index],

        value: (weeklyXP[index] / maxXP) * 100

    }));

    return (

        <div className="dashboard-card">

            <h2>📈 Weekly Progress</h2>

            <div className="week-chart">

                {progress.map((item) => (

                    <div
                        key={item.day}
                        className="day-column"
                    >

                        <div
                            className="bar"
                            style={{
                                height: `${item.value}%`
                            }}
                        ></div>

                        <div className="day-label">

                            <p>{item.day}</p>

                            <small>

                                {item.xp} XP

                            </small>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default WeeklyProgress;