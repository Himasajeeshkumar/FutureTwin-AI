import { ChartNoAxesColumnIncreasing } from "lucide-react";

function SectionScores({ sectionScores }) {

    if (!sectionScores) return null;

    const maxScores = {
        education: 10,
        skills: 20,
        projects: 15,
        experience: 15,
        certifications: 10,
        summary: 10,
        links: 5,
        completeness: 10
    };

    return (
        <div className="analysis-card">

            <h3 className="analysis-card-title">
                <ChartNoAxesColumnIncreasing
                    size={22}
                    strokeWidth={2}
                />
                Section Scores
            </h3>

            {Object.entries(sectionScores).map(
                ([section, score]) => {

                    const max =
                        maxScores[section] || 10;

                    const percentage =
                        Math.min(
                            (score / max) * 100,
                            100
                        );

                    return (
                        <div
                            key={section}
                            className="score-row"
                        >

                            <div className="score-header">

                                <span className="score-title">
                                    {section
                                        .charAt(0)
                                        .toUpperCase() +
                                        section.slice(1)}
                                </span>

                                <span>
                                    {score} / {max}
                                </span>

                            </div>

                            <div className="progress-bar">

                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${percentage}%`
                                    }}
                                />

                            </div>

                        </div>
                    );
                }
            )}

        </div>
    );
}

export default SectionScores;