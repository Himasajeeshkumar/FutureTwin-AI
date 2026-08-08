function Skills({ resume, setResume }) {

    const skills = Array.isArray(resume.skills)
        ? resume.skills.flatMap((skill) => {

            if (typeof skill === "string") {
                return skill;
            }

            if (
                skill.items &&
                Array.isArray(skill.items)
            ) {
                return skill.items;
            }

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
            skills: [
                ...skills,
                ""
            ]
        });

    };


    const deleteSkill = (index) => {

        const updated = skills.filter(
            (_, i) => i !== index
        );

        setResume({
            ...resume,
            skills: updated
        });

    };


    return (
        <div className="editor-card">

            {skills.map((skill, index) => (

                <div
                    key={index}
                    className="dynamic-card"
                >

                    <input
                        type="text"
                        placeholder="Skill"
                        value={skill}
                        onChange={(e) =>
                            updateSkill(
                                index,
                                e.target.value
                            )
                        }
                    />

                    <button
                        type="button"
                        className="delete-btn"
                        onClick={() =>
                            deleteSkill(index)
                        }
                    >
                        Delete
                    </button>

                </div>

            ))}


            <button
                type="button"
                className="add-btn"
                onClick={addSkill}
            >
                Add Skill
            </button>

        </div>
    );
}

export default Skills;