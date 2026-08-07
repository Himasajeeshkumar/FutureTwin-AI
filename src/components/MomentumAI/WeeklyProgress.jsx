import { useResume } from "../../context/ResumeContext";
function WeeklyProgress() {

    const { weeklyXP, 
        xp 
    } = useResume();

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

            <p className="coach-advice">
            Track how consistently you earn XP throughout the week.
            </p>

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

            <hr />

            <h3>Total Weekly XP</h3>

            <h2>

                {weeklyXP.reduce((sum, value) => sum + value, 0)} XP

            </h2>

        </div>

    );

}

export default WeeklyProgress;