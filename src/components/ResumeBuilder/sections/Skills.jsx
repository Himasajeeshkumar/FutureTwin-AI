function Skills({ resume, setResume }) {

    // Convert any AI format into a simple editable list
    const skills = Array.isArray(resume.skills)
        ? resume.skills.flatMap(skill => {

            if (typeof skill === "string") return skill;

            if (skill.items && Array.isArray(skill.items))
                return skill.items;

            return [];

        })
        : [];

    const updateSkill = (index, value) => {

        const updated = [...skills];

        updated[index] = value;

        setResume({
            ...resume,
            skills: updated
        });

    };

    const addSkill = () => {

        setResume({
            ...resume,
            skills: [...skills, ""]
        });

    };

    const deleteSkill = (index) => {

        const updated = skills.filter((_, i) => i !== index);

        setResume({
            ...resume,
            skills: updated
        });

    };

    return (

        <div className="section-card">

            <div className="section-content">

                {skills.map((skill, index) => (

                    <div
                        key={index}
                        className="dynamic-card"
                    >

                        <input
                            placeholder="Skill"
                            value={skill}
                            onChange={(e) =>
                                updateSkill(index, e.target.value)
                            }
                        />

                        <button
                            className="delete-btn"
                            onClick={() => deleteSkill(index)}
                        >
                            Delete
                        </button>

                    </div>

                ))}

                <button
                    className="add-btn"
                    onClick={addSkill}
                >
                    + Add Skill
                </button>

            </div>

        </div>

    );

}

export default Skills;