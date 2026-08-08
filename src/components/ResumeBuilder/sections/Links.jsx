function Links({ resume, setResume }) {

    const updateLink = (field, value) => {

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
                type="url"
                placeholder="LinkedIn URL"
                value={resume.personal.linkedin || ""}
                onChange={(e) =>
                    updateLink(
                        "linkedin",
                        e.target.value
                    )
                }
            />

            <input
                type="url"
                placeholder="GitHub URL"
                value={resume.personal.github || ""}
                onChange={(e) =>
                    updateLink(
                        "github",
                        e.target.value
                    )
                }
            />

            <input
                type="url"
                placeholder="Portfolio URL"
                value={resume.personal.portfolio || ""}
                onChange={(e) =>
                    updateLink(
                        "portfolio",
                        e.target.value
                    )
                }
            />

        </div>
    );
}

export default Links;