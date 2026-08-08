function PersonalInfo({ resume, setResume }) {

    const updateField = (field, value) => {

        setResume({
            ...resume,

            personal: {
                ...resume.personal,
                [field]: value
            }
        });

    };

    return (
        <div className="editor-card">

            <input
                type="text"
                placeholder="Full Name"
                value={resume.personal.name || ""}
                onChange={(e) =>
                    updateField("name", e.target.value)
                }
            />

            <input
                type="email"
                placeholder="Email"
                value={resume.personal.email || ""}
                onChange={(e) =>
                    updateField("email", e.target.value)
                }
            />

            <input
                type="tel"
                placeholder="Phone"
                value={resume.personal.phone || ""}
                onChange={(e) =>
                    updateField("phone", e.target.value)
                }
            />

            <input
                type="text"
                placeholder="Location"
                value={resume.personal.location || ""}
                onChange={(e) =>
                    updateField("location", e.target.value)
                }
            />

            <input
                type="url"
                placeholder="LinkedIn URL"
                value={resume.personal.linkedin || ""}
                onChange={(e) =>
                    updateField("linkedin", e.target.value)
                }
            />

            <input
                type="url"
                placeholder="GitHub URL"
                value={resume.personal.github || ""}
                onChange={(e) =>
                    updateField("github", e.target.value)
                }
            />

            <input
                type="url"
                placeholder="Portfolio URL"
                value={resume.personal.portfolio || ""}
                onChange={(e) =>
                    updateField("portfolio", e.target.value)
                }
            />

        </div>
    );
}

export default PersonalInfo;