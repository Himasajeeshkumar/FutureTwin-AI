import { BarChart3 } from "lucide-react";
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

    // Make sure weeklyXP always contains 7 valid values
    const safeWeeklyXP =
        Array.isArray(weeklyXP) && weeklyXP.length === 7
            ? weeklyXP
            : [0, 0, 0, 0, 0, 0, 0];

    const maxXP = Math.max(
        ...safeWeeklyXP.map(value => Number(value) || 0),
        1
    );

    // Monday = 0 ... Sunday = 6
    const today = new Date().getDay();

    const todayIndex =
        today === 0
            ? 6
            : today - 1;

    const progress = days.map(
        (day, index) => {

            const dayXP =
                Number(safeWeeklyXP[index]) || 0;

            return {
                day,
                xp: dayXP,
                value: (dayXP / maxXP) * 100,
                isToday: index === todayIndex
            };

        }
    );

    const totalWeeklyXP =
        safeWeeklyXP.reduce(
            (sum, value) =>
                sum + (Number(value) || 0),
            0
        );

    return (
        <div className="dashboard-card">

            <h2 className="card-title-with-icon">

                <BarChart3
                    size={22}
                    strokeWidth={2}
                />

                Weekly Progress

            </h2>

            <p className="coach-advice">
                Track your XP and consistency
                throughout the week.
            </p>

            <div className="week-chart">

                {progress.map((item) => (

                    <div
                        key={item.day}
                        className={
                            item.isToday
                                ? "day-column today"
                                : "day-column"
                        }
                    >

                        <div className="bar-wrapper">

                            <div
                                className="bar"
                                style={{
                                    height: `${Math.max(
                                        item.value,
                                        4
                                    )}%`
                                }}
                                title={`${item.xp} XP`}
                            />

                        </div>

                        <div className="day-label">

                            <p>
                                {item.day}
                            </p>

                            <small>
                                {item.xp} XP
                            </small>

                        </div>

                    </div>

                ))}

            </div>

            <div className="weekly-total">

                <span>
                    Total Weekly XP
                </span>

                <strong>
                    {totalWeeklyXP} XP
                </strong>

            </div>

        </div>
    );
}

export default WeeklyProgress;